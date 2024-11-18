const db = require("../database/connection");
const User = require("./User");

class Instituicao extends User {
  constructor(
    _idInstituicao,
    _cnpj,
    _tipo,
    _telefone,
    _nome,
    _responsavel,
    _senha,
    _idUsuario,
    _email,
    _uid,
    _role
  ) {
    super(_idUsuario, _nome, _uid, _role);
    this.idInstituicao = _idInstituicao;
    this.cnpj = _cnpj;
    this.tipo = _tipo;
    this.telefone = _telefone;
    this.responsavel = _responsavel;
    this.senha = _senha;
    this.status = "pending";
    this.email = _email;
  }

  instanciarComUid(_uid) {
    this.uid = _uid;
    return this;
  }

  async aprovarInstituicao() {
    try {
      const query = `
        UPDATE instituicoes
        SET id_usuario = ?, status = 'approved'
        WHERE id_instituicao = ?
      `;

      console.log(this.idUser, this.idInstituicao);

      await db.executeQuery(query, [this.idUser, this.idInstituicao]);

      return { success: true, message: "Instituição aprovada com sucesso." };
    } catch (err) {
      console.error("Erro ao aprovar instituição:", err);
      return { success: false, message: "Erro ao aprovar instituição. Tente novamente." };
    }
  }

  async rejeitarInstituicao() {
    try {
      const query = `
        UPDATE instituicoes
        SET status = 'rejected'
        WHERE id_instituicao = ?
      `;

      await db.executeQuery(query, [this.idInstituicao]);

      return { success: true, message: "Instituição rejeitada com sucesso." };
    } catch (err) {
      return { success: false, message: "Erro ao rejeitar instituição. Tente novamente." };
    }
  }

  async cadastrarInstituicao() {
    try {
      const query = `
        INSERT INTO instituicoes (
          id_instituicao, cnpj, tipo, telefone, nome, responsavel, senha, status, id_usuario, email
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await db.executeQuery(query, [
        this.idInstituicao,
        this.cnpj,
        this.tipo,
        this.telefone,
        this.name,
        this.responsavel,
        this.senha,
        this.status,
        null,
        this.email,
      ]);

      console.log("Instituição cadastrada com sucesso.");
      return { success: true, message: "Instituição cadastrada com sucesso." };
    } catch (err) {
      console.error("Erro ao cadastrar instituição:", err);
      return { success: false, message: "Erro ao cadastrar instituição. Tente novamente." };
    }
  }

  async listarPendentes(req, res) {
    try {
      let { page = 1, limit = 10 } = req.query;

      const offset = (page - 1) * limit;

      const query = `SELECT * 
      FROM instituicoes 
      WHERE status = 'pending' 
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}`;

      const instituicoes = await db.executeQuery(query);

      const countQuery = `SELECT COUNT(*) as total FROM instituicoes WHERE status = 'pending';`;
      const countResult = await db.executeQuery(countQuery);
      const total = countResult[0].total;

      res.status(200).json({
        data: instituicoes,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (err) {
      console.error("Erro ao listar instituições pendentes:", err);
      res.status(500).json({ error: "Erro ao listar instituições pendentes" });
    }
  }

  async findById() {
    try {
      const query = `
        SELECT * FROM instituicoes WHERE id_instituicao = ?
      `;

      const results = await db.executeQuery(query, [this.idInstituicao]);

      if (results.length === 0) {
        return { success: false, message: "Instituição não encontrada." };
      }

      return { success: true, data: results[0], message: "Instituição encontrada com sucesso." };
    } catch (err) {
      console.error("Erro ao encontrar instituição:", err);
      return { success: false, message: "Erro ao encontrar instituição. Tente novamente." };
    }
  }

  async findIdByUid() {
    try {
      const query = `
   SELECT i.id_instituicao
  FROM instituicoes i
  JOIN usuario u ON i.id_usuario = u.id_usuario
  WHERE u.uid = ?;
`;
      console.log(this.uid);
      const results = await db.executeQuery(query, [this.uid]);

      if (results.length === 0) {
        return { success: false, message: "Instituição não encontrada." };
      }

      return { success: true, data: results[0], message: "Instituição encontrada com sucesso." };
    } catch (err) {
      console.error("Erro ao encontrar doador:", err);
      return { success: false, message: "Erro ao encontrar instituição. Tente novamente." };
    }
  }

  async criarSolicitacaoBolsa(datas) {
    const query = `
      INSERT INTO solicitacoes (id_solicitacao, id_instituicao, nome_responsavel, tipo_sanguineo, fator_rh, quantidade_bolsas, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    try {
      const { id_solicitacao, id_instituicao, nome, tipo_sanguineo, quantidade, fator, status } = datas;

      const result = await db.executeQuery(query, [
        id_solicitacao,
        id_instituicao,
        nome,
        tipo_sanguineo,
        fator,
        quantidade,
        status || "pendente",
      ]);

      console.log("Solicitação de bolsa de sangue criada com sucesso!", result);
      return result;
    } catch (err) {
      console.error("Erro ao criar solicitação de bolsa de sangue:", err);
      throw err;
    }
  }

  async listarSolicitacoes(req, res) {
    try {
      let { page = 1, limit = 10 } = req.query;

      const offset = (page - 1) * limit;

      const query = `SELECT * 
      FROM solicitacoes 
      WHERE id_instituicao = "${this.idInstituicao}"
      ORDER BY data_solicitacao DESC 
      LIMIT ${limit} OFFSET ${offset}`;

      const solicitacoes = await db.executeQuery(query);

      const countQuery = `SELECT COUNT(*) as total FROM solicitacoes WHERE id_instituicao = "${this.idInstituicao}";`;
      const countResult = await db.executeQuery(countQuery);
      const total = countResult[0].total;

      res.status(200).json({
        data: solicitacoes,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (err) {
      console.error("Erro ao listar solicitações:", err);
      res.status(500).json({ error: "Erro ao listar solicitações." });
    }
  }
}

module.exports = Instituicao;
