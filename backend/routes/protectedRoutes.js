const express = require('express');
const authenticate = require('../middlewares/authenticate');
const authorizeRole = require('../middlewares/authorizeRole');

const router = express.Router();

router.get('/', authenticate, authorizeRole('admin', 'tecnico' ,'doador', 'instituicao'), (req, res) => {
  res.json({ message: 'Welcome to the HOMEPAGE' });
});

router.get('/admin', authenticate, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

router.get('/tecnico', authenticate, authorizeRole('tecnico'), (req, res) => {
  res.json({ message: 'Welcome to the technical area' });
});

router.get('/admin/cadastro', authenticate, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Cadastro administrativo' });
});

router.get('/cadastro', authenticate, authorizeRole('admin', 'tecnico' ,'doador', 'instituicao'), (req, res) => {
  res.json({ message: 'Cadastro publico' });
});

router.get('/login', authenticate, authorizeRole('admin', 'tecnico' ,'doador', 'instituicao'), (req, res) => {
  res.json({ message: 'Login geral' });
});


module.exports = router;
    