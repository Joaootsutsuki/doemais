function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acesso negado. Permissão insuficiente." });
    }
    next();
  };
}

module.exports = authorizeRole;
