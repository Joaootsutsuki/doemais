const User = require("./User");
const db = require("../database/connection");

class Doador extends User {
  constructor(
    _idUser,
    _name,
    _uid,
    _role,
    _idDoador,
    _cpf,
    _tipo_sanguineo,
    _fator_rh,
    _endereco,
    _telefone,
    _nascimento,
    _genero
  ) {
    super(_idUser, _name, _uid, _role);

    this.idDoador = _idDoador;
    this.cpf = _cpf;
    this.tipoSanguineo = _tipo_sanguineo;
    this.fatorRh = _fator_rh;
    this.endereco = _endereco;
    this.telefone = _telefone;
    this.nascimento = _nascimento;
    this.genero = _genero;
  }

  instanciarComUid(_uid) {
    this.uid = _uid;
    return this;
  }

  async cadastrarDoador() {
    let connection;
    try {
      connection = await db.beginTransaction();

      // Cadastrar usuário relacionado
      await this.cadastrarUsuario(connection);

      const queryDoador = `
        INSERT INTO doador 
        (id_doador, id_usuario, cpf, tipo_sanguineo, fator_rh, telefone, endereco, nascimento, genero)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await connection.execute(queryDoador, [
        this.idDoador,
        this.idUser,
        this.cpf,
        this.tipoSanguineo,
        this.fatorRh,
        this.telefone,
        this.endereco,
        this.nascimento,
        this.genero,
      ]);

      // Commit da transação
      await db.commitTransaction(connection);

      console.log("Doador cadastrado com sucesso!");
    } catch (err) {
      if (connection) await db.rollbackTransaction(connection);
      console.error("Erro ao cadastrar doador:", err);
      throw err;
    }
  }

  async criarAgendamentoHorario(datas) {
    const query = `
      INSERT INTO agendamentos (id_agendamento, id_doador, data_doacao, horario_doacao, local_doacao, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    try {
      const { id_doador, data_doacao, horario_doacao, local_doacao, status, id_agendamento } = datas;

      const result = await db.executeQuery(query, [
        id_agendamento,
        id_doador,
        data_doacao,
        horario_doacao,
        local_doacao,
        status || "pendente",
      ]);

      console.log("Agendamento criado com sucesso!", result);
      return result;
    } catch (err) {
      console.error("Erro ao criar agendamento:", err);
      throw err;
    }
  }

  async findIdByUid() {
    try {
      const query = `
  SELECT d.id_doador
  FROM doador d
  JOIN usuario u ON d.id_usuario = u.id_usuario
  WHERE u.uid = ?;
`;

      const results = await db.executeQuery(query, [this.uid]);

      if (results.length === 0) {
        return { success: false, message: "Doador não encontrada." };
      }

      return { success: true, data: results[0], message: "Doador encontrada com sucesso." };
    } catch (err) {
      console.error("Erro ao encontrar doador:", err);
      return { success: false, message: "Erro ao encontrar doador. Tente novamente." };
    }
  }

  async listarAgendamentos(req, res) {
    try {
      let { page = 1, limit = 10 } = req.query;

      const offset = (page - 1) * limit;

      const query = `SELECT * 
      FROM agendamentos 
      WHERE id_doador = "${this.idDoador}"
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}`;

      const agenda = await db.executeQuery(query);

      const countQuery = `SELECT COUNT(*) as total FROM agendamentos WHERE id_doador = "${this.idDoador}";`;
      const countResult = await db.executeQuery(countQuery);
      const total = countResult[0].total;

      res.status(200).json({
        data: agenda,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (err) {
      console.error("Erro ao listar minha agenda:", err);
      res.status(500).json({ error: "Erro ao listar minha agenda." });
    }
  }
}

module.exports = { Doador };
