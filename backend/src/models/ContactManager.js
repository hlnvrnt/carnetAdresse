const AbstractManager = require("./AbstractManager");

class ContactManager extends AbstractManager {
  constructor() {
    super({ table: "contact" });
  }

  async readAll() {
    const [allContacts] = await this.database.query(
      `select * from ${this.table}`
    );
    // Return the array of items
    return allContacts;
  }

  async read(id) {
    console.info(id);
    const [oneContact] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return oneContact[0];
  }

  async create(name, email, phoneNumber, address, birthday, image) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, email, phone_number, address, birthday, image) values (?, ?, ?, ?, ?, ?)`,
      [name, email, phoneNumber, address, birthday, image]
    );
    return result;
  }

  async readOneContact(newContact) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE name = ? OR email = ? OR id=?`,
      [newContact.name, newContact.email, newContact.id]
    );
    return result[0];
  }

  async editName(id, newContact) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ? WHERE id = ?`,
      [newContact.name, id]
    );

    return result;
  }

  async editEmail(id, newContact) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET email = ? WHERE id = ?`,
      [newContact.email, id]
    );

    return result;
  }

  async editAddress(id, newContact) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET address = ? WHERE id = ?`,
      [newContact.address, id]
    );

    return result;
  }

  async editPhone(id, newContact) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET phone_number = ? WHERE id = ?`,
      [newContact.phoneNumber, id]
    );

    return result;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = ContactManager;
