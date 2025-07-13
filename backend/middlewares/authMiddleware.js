const jwt = require("jsonwebtoken");
const SECRET = "secreto123";

// Middleware para autenticar o token JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Token não fornecido" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Token inválido" });
    }
}

const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Autenticação necessária.' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado. Requer privilégios de administrador.' });
  }

  next();
};

module.exports = {
    authenticateToken,
    isAdmin,
};