const tokenService = require('../config/tokenService');

function authenticate(req, res, next) {

    const token = req.headers.authorization?.split('.')[1];

    if(!token){
        return res.status(401).json({message: "Acesso negado. Nenhum token fornecido."});
    }

    try{

        const decoded = tokenService.verifyToken(token);
        req.user = decoded;
        next();

    }catch(err){
        return res.status(400).json({message: "Token inválido ou expirado", err})
    }
}

module.exports = authenticate;