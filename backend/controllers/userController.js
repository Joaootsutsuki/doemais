const admin = require("../config/firebaseAdmin");
const { Doador } = require("../models/Doador");
const { nanoid } = require("nanoid");

class UserController {
  async createUser(req, res) {
    try {
      const user = req.body;

      if (
        !user.nome ||
        !user.email ||
        !user.senha ||
        !user.role ||
        !user.cpf ||
        !user.tipo_sanguineo ||
        !user.fator ||
        !user.endereco ||
        !user.telefone ||
        !user.nascimento ||
        !user.genero
      ) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }

      const { uid } = await admin.auth().createUser({
        displayName: user.nome,
        email: user.email,
        password: user.senha,
      });

      await admin.auth().setCustomUserClaims(uid, { role: user.role });

      await this.createUserDatabase({ uid, ...user });

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
      res.status(500).json({
        message: "Erro ao criar usuário e doador.",
        error: err.message,
      });
    }
  }

  async createUserDatabase(userData) {
    try {
      const idUser = nanoid(12);
      const idDoador = nanoid(12);

      const doador = new Doador(
        idUser,
        userData.nome,
        userData.uid,
        userData.role,
        idDoador,
        userData.cpf,
        userData.tipo_sanguineo,
        userData.fator,
        userData.endereco,
        userData.telefone,
        userData.nascimento,
        userData.genero
      );

      await doador.cadastrarDoador();

      console.log("Usuário e doador salvos no banco de dados.");
    } catch (e) {
      if (userData.uid) {
        await admin
          .auth()
          .deleteUser(uid)
          .catch((deleteErr) => {
            console.error("Erro ao excluir usuário do Firebase:", deleteErr);
          });
      }
      console.error("Erro ao salvar no banco de dados:", e);
      throw e;
    }
  }

  async agendarHorario(req, res) {
    try {
      const { doador_uid, data_doacao, horario_doacao, local_doacao, status } = req.body;

      const doadorModel = new Doador().instanciarComUid(doador_uid);

      const resultFindId = await doadorModel.findIdByUid();
      const id_doador = resultFindId.data.id_doador;

      if (!id_doador || !data_doacao || !horario_doacao || !local_doacao) {
        return res.status(400).json({
          error: "Os campos id_doador, data_doacao, horario_doacao e local_doacao são obrigatórios.",
        });
      }

      await doadorModel.criarAgendamentoHorario({
        id_agendamento: nanoid(12),
        id_doador,
        data_doacao,
        horario_doacao,
        local_doacao,
        status,
      });

      res.status(201).json({
        message: "Agendamento criado com sucesso!",
      });
    } catch (err) {
      console.error("Erro ao criar agendamento:", err);

      res.status(500).json({
        error: "Ocorreu um erro ao criar o agendamento. Por favor, tente novamente.",
        details: err.message,
      });
    }
  }

  async listarMinhaAgenda(req, res) {
    try {
      const doadorModel = new Doador().instanciarComUid(req.query.uid);

      const result = await doadorModel.findIdByUid();
      doadorModel.idDoador = result.data.id_doador;

      await doadorModel.listarAgendamentos(req, res);
    } catch (err) {
      console.error("Erro ao listar agendamentos:", err);
      res.status(500).json({ error: "Erro ao listar agendamentos." });
    }
  }
}

module.exports = new UserController();
