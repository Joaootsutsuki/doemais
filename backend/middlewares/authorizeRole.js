function authorizeRole(...allowedRoles) {
    return (req, res, next) => {
      if (!allowedRoles.includes("admin")) {
        return res.status(403).json({ message: 'Acesso negado. Permissão insuficiente.' });
      }
      next();
    };
  }
  
module.exports = authorizeRole;