const jwt = require('jsonwebtoken');
require('dotenv').config();

class TokenService {
  
  generateToken(user) {
    const payload = {
      id: user.id,
      role: user.role, //Mudar para ficar igual ao banco de dados
      name: user.name
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION_TIME 
    });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
  }
}

module.exports = new TokenService();