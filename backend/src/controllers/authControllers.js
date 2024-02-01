const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const tables = require("../tables");

// todo : ajouter next pour le validator

const login = async (req, res) => {
  try {
    const user = await tables.user.getByMail(req.body.inputEmail);
    console.info("auth controllers", user);
    if (user == null) {
      res.status(200).send(user);
      return;
    }
    const verified = await argon2.verify(
      user.hashed_password,
      req.body.inputPassword
    );
    if (verified) {
      // Respond with the user in JSON format (but without the hashed password)
      delete user.hashed_password;

      const token = await jwt.sign(
        { sub: user.id, isAdmin: user.is_admin },
        process.env.APP_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).send({ token, user });
    } else {
      res.status(422).send("incorrect email or password");
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { login };
