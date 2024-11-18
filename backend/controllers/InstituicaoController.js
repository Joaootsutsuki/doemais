const Instituicao = require("../models/Instituicao");
const admin = require("../config/firebaseAdmin");

const { nanoid } = require("nanoid");

class InstituicaoController {
  async createInstituicaoDatabase(req, res) {
    try {
      const idInstituicao = nanoid(12);
      const userData = req.body;

      const instituicao = new Instituicao(
        idInstituicao,
        userData.cnpj,
        userData.tipo,
        userData.telefone,
        userData.nome,
        userData.responsavel,
        userData.senha,
        userData.role,
        userData.email
      );

      const result = await instituicao.cadastrarInstituicao();

      if (result.success) {
        return res.status(200).json({ success: true, message: result.message });
      } else {
        return res.status(400).json({ success: false, message: result.message });
      }
    } catch (err) {
      console.error("Erro ao salvar instituição no banco de dados:", err);
      return res.status(500).json({ success: false, message: "Erro interno do servidor. Tente novamente." });
    }
  }

  async listarInstituicoesPendentes(req, res) {
    try {
      const instituicaoModel = new Instituicao();

      await instituicaoModel.listarPendentes(req, res);
    } catch (err) {
      console.error("Erro ao listar instituições pendentes:", err);
      res.status(500).json({ error: "Erro ao listar instituições pendentes." });
    }
  }

  async rejeitarInstituicaoDatabase(req, res) {
    try {
      const instituicaoModel = new Instituicao(req.body.id);

      const result = await instituicaoModel.rejeitarInstituicao();

      if (result.success) {
        return res.status(200).json({ success: true, message: result.message });
      } else {
        return res.status(400).json({ success: false, message: result.message });
      }
    } catch (err) {
      console.error("Erro ao listar instituições pendentes:", err);
      res.status(500).json({ error: "Erro ao listar instituições pendentes." });
    }
  }

  async createUserInstituicao(req, res) {
    let uid;
    try {
      const instituicaoModel = new Instituicao(req.body.id);
      const instituicaoDatas = await instituicaoModel.findById();

      const { uid: generatedUid } = await admin.auth().createUser({
        displayName: instituicaoDatas.data.responsavel,
        email: instituicaoDatas.data.email,
        password: instituicaoDatas.data.senha,
      });
      uid = generatedUid;

      await admin.auth().setCustomUserClaims(uid, { role: "instituicao" });

      instituicaoModel.idUser = nanoid(12);
      instituicaoModel.name = instituicaoDatas.data.responsavel;
      instituicaoModel.uid = uid;
      instituicaoModel.role = "instituicao";

      await instituicaoModel.cadastrarUsuario();

      await instituicaoModel.aprovarInstituicao();

      res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (err) {
      if (uid) {
        await admin
          .auth()
          .deleteUser(uid)
          .catch((deleteErr) => {
            console.error("Erro ao excluir usuário do Firebase:", deleteErr);
          });
      }
      console.error("Erro ao criar usuário e instituição:", err);
      res.status(500).json({
        message: "Erro ao criar usuário e instituição.",
        error: err.message,
      });
    }
  }

  async solicitarBolsas(req, res) {
    try {
      const { instituicao_uid, nome, tipo_sanguineo, quantidade, fator, status } = req.body;

      const instituicaoModel = new Instituicao().instanciarComUid(instituicao_uid);

      const resultFindId = await instituicaoModel.findIdByUid();
      console.log(resultFindId);
      const id_instituicao = resultFindId.data.id_instituicao;

      if (!id_instituicao || !tipo_sanguineo || !quantidade || !fator) {
        return res.status(400).json({
          error: "Os campos id_instituicao, tipo_sanguineo, quantidade e fator são obrigatórios.",
        });
      }

      await instituicaoModel.criarSolicitacaoBolsa({
        id_solicitacao: nanoid(12),
        id_instituicao,
        nome,
        tipo_sanguineo,
        quantidade,
        fator,
        status,
      });

      res.status(201).json({
        message: "Solicitação criada com sucesso!",
      });
    } catch (err) {
      console.error("Erro ao criar solicitação:", err);

      res.status(500).json({
        error: "Ocorreu um erro ao criar a solicitação. Por favor, tente novamente.",
        details: err.message,
      });
    }
  }

  async listarSolicitacoes(req, res) {
    try {
      const instituicaoModel = new Instituicao().instanciarComUid(req.query.uid);

      const result = await instituicaoModel.findIdByUid();
      instituicaoModel.idInstituicao = result.data.id_instituicao;

      await instituicaoModel.listarSolicitacoes(req, res);
    } catch (err) {
      console.error("Erro ao listar agendamentos:", err);
      res.status(500).json({ error: "Erro ao listar agendamentos." });
    }
  }
}

module.exports = new InstituicaoController();
