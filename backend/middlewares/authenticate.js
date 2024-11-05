const admin = require("../config/firebaseAdmin");

async function authenticate(req, res, next) {
  const idToken = req.body.token;

  if (!idToken) {
    return res.status(401).json({ message: "Acesso Negado. Nenhum token fornecido." });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, role, name } = decodedToken;

    req.user = { uid, email, role, name };
    res.status(200).json({ message: "Autenticado com sucesso", user: req.user });
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado", error });
  }
}

module.exports = authenticate;
