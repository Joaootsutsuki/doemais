const mysql = require("mysql2/promise");

class Database {
  constructor() {
    this.dbConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };
  }

  async executeQuery(sql, params) {
    let connection;
    try {
      connection = await mysql.createConnection(this.dbConfig);

      const [results] = await connection.execute(sql, params);
      console.log("Query executada com sucesso.");
      return results;
    } catch (err) {
      console.error("Erro na execução da query:", err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.end();
        } catch (closeErr) {
          console.error("Erro ao fechar a conexão:", closeErr);
        }
      }
    }
  }

  async beginTransaction() {
    let connection;
    try {
      connection = await mysql.createConnection(this.dbConfig);
      await connection.beginTransaction();
      console.log("Transação iniciada.");
      return connection;
    } catch (err) {
      console.error("Erro ao iniciar transação:", err);
      if (connection) await connection.end();
      throw err;
    }
  }

  async commitTransaction(connection) {
    try {
      await connection.commit();
      console.log("Transação confirmada (commit).");
    } catch (err) {
      console.error("Erro ao confirmar a transação:", err);
      throw err;
    } finally {
      await connection.end();
    }
  }

  async rollbackTransaction(connection) {
    try {
      await connection.rollback();
      console.log("Transação revertida (rollback).");
    } catch (err) {
      console.error("Erro ao reverter a transação:", err);
      throw err;
    } finally {
      await connection.end();
    }
  }
}

module.exports = new Database();
