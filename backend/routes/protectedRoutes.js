const express = require("express");
const authenticate = require("../middlewares/authenticate");
const authorizeRole = require("../middlewares/authorizeRole");
const admin = require("../config/firebaseAdmin");

const router = express.Router();
/*
router.get("/", authenticate, authorizeRole("admin", "tecnico", "doador", "instituicao"), (req, res) => {
  res.json({ message: "Welcome to the HOMEPAGE" });
});

router.get("/admin", authenticate, authorizeRole("admin"), (req, res) => {
  console.log("Welcome to the admin dashboard, ", req.user.name);
  res.json({ message: "Welcome to the admin dashboard" });
});

router.get("/tecnico", authenticate, authorizeRole("tecnico"), (req, res) => {
  res.json({ message: "Welcome to the technical area" });
});

router.get("/admin/cadastro", authenticate, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Cadastro administrativo" });
});

router.get("/cadastro", (req, res) => {
  res.json({ message: "Cadastro publico" });
});

router.get("/login", (req, res) => {
  res.json({ message: "Login geral" });
});
*/

router.post("/user-auth", authenticate);

module.exports = router;
