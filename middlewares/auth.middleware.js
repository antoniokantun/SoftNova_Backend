// middlewares/auth.middleware.js

const jwt = require('../utils/jwt');

exports.verifyAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });

  try {
    const decoded = jwt.verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ mensaje: 'Token inválido' });
  }
};
