const express = require("express");
const authenticate = require("../middlewares/authenticate");
const authorizeRole = require("../middlewares/authorizeRole");
const admin = require("../config/firebaseAdmin");
const UserController = require("../controllers/userController");
const InstituicaoController = require("../controllers/InstituicaoController");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/user-auth", authenticate);

router.post("/create-donor", (req, res) => UserController.createUser(req, res));

router.post("/pending-institutions", (req, res) => {
  InstituicaoController.createInstituicaoDatabase(req, res);
});

router.put("/instituicoes/reject", authorizeRole("admin"), (req, res) => {
  InstituicaoController.rejeitarInstituicaoDatabase(req, res);
});

router.put("/instituicoes/approved", authorizeRole("admin"), (req, res) => {
  InstituicaoController.createUserInstituicao(req, res);
});

router.post("/agendar-horario", (req, res) => {
  userController.agendarHorario(req, res);
});

router.post("/solicitar-bolsa", (req, res) => {
  InstituicaoController.solicitarBolsas(req, res);
});

router.get("/minha-agenda", (req, res) => {
  userController.listarMinhaAgenda(req, res);
});

router.get("/listar-solicitacoes", (req, res) => {
  InstituicaoController.listarSolicitacoes(req, res);
});

router.get("/instituicoes/pendentes", authorizeRole("admin"), (req, res) => {
  InstituicaoController.listarInstituicoesPendentes(req, res);
});

module.exports = router;
