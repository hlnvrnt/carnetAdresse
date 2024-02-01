// Import access to database tables
const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const contacts = await tables.contact.readAll();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, address, birthday } = req.body;
    const image = `/images/${req.file.filename}`;
    console.info(req.body);
    console.info(image);
    const existingUser = await tables.contact.readOneContact(name, email);
    if (existingUser) {
      return res.status((400).json({ error: "Cet utilsateur existe déjà." }));
    }
    const insertId = await tables.contact.create(
      name,
      email,
      phoneNumber,
      address,
      birthday,
      image
    );
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
  return null;
};

const read = async (req, res, next) => {
  try {
    console.info(req.body);
    const item = await tables.contact.read(req.params.id);
    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const newContact = req.body;

  console.info("reçu controller:");
  console.info(newContact);

  console.info(newContact.name);

  try {
    const existingContact = await tables.contact.readOneContact(newContact);

    console.info("existing", existingContact);

    if (existingContact && existingContact.name !== newContact.name) {
      const modifyId = await tables.contact.editName(req.params.id, newContact);
      res.status(201).json({ modifyId });
    } else if (existingContact && existingContact.email !== newContact.email) {
      const modifyId = await tables.contact.editEmail(
        req.params.id,
        newContact
      );
      res.status(201).json({ modifyId });
    } else if (
      existingContact &&
      existingContact.address !== newContact.address
    ) {
      const modifyId = await tables.contact.editAddress(
        req.params.id,
        newContact
      );
      res.status(201).json({ modifyId });
    } else if (
      existingContact &&
      existingContact.phone_number !== newContact.phone_number
    ) {
      const modifyId = await tables.contact.editPhone(
        req.params.id,
        newContact
      );
      res.status(201).json({ modifyId });
    }
  } catch (err) {
    next(err);
    res.status(404).send("Erreur de modification du user");
  }
};

const destroy = async (req, res, next) => {
  try {
    console.info(req.params.id);
    // const { name, email } = req.body;
    // console.info("User deleted", req.body);
    // const deleteContact = await tables.contact.destroy(name, email);
    const deleteId = await tables.contact.delete(req.params.id);
    res.status(200).json({ deleteId });
    if (!deleteId) {
      return res.status((404).json({ error: "Cet utilsateur n'existe pas." }));
    }
  } catch (err) {
    next(err);
  }
  return null;
};

module.exports = {
  browse,
  add,
  read,
  update,
  destroy,
};
