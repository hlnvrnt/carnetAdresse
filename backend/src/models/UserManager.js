const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    console.info("Creating", user);
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, email, hashed_password) values (?, ?, ?)`,
      [user.name, user.email, user.hashedPassword]
    );
    return result;
  }

  // on cherche le user par son adresse e-mail pour renvoyer toutes ses infos (pour ensuite vérifier le mdp et si ok renvoyer les infos users vers le front)
  async getByMail(email) {
    const [result] = await this.database.query(
      `SELECT * from ${this.table} WHERE email = ?`,
      [email]
    );
    return result[0];
  }

  async readOneUser(newUser) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE name = ? OR email = ? OR id=?`,
      [newUser.name, newUser.email, newUser.id]
    );
    return result[0];
  }

  async getById(id) {
    const [result] = await this.database.query(
      `SELECT u.id as id, u.name, u.email, u.hashed_password
      FROM ${this.table} u
      WHERE u.id = ?`,
      [id]
    );
    return result[0];
  }
}

module.exports = UserManager;
