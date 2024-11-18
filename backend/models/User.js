const db = require("../database/connection");

class User {
  constructor(_idUser, _name, _uid, _role) {
    this.idUser = _idUser;
    this.name = _name;
    this.uid = _uid;
    this.role = _role;
  }

  async cadastrarUsuario(connection = null) {
    const queryUser = "INSERT INTO usuario (id_usuario, uid, nome, nivel_acesso) VALUES (?, ?, ?, ?)";

    try {
      if (connection) {
        await connection.execute(queryUser, [this.idUser, this.uid, this.name, this.role]);
      } else {
        await db.executeQuery(queryUser, [this.idUser, this.uid, this.name, this.role]);
      }
      console.log("Usuário cadastrado com sucesso!");
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
      throw err;
    }
  }
}

module.exports = User;
