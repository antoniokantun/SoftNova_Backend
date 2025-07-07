//auth.controller.js

const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

    const token = jwt.generateToken({ id: user.id, rol: user.rol });
    res.json({ token, user: { id: user.id, nombre: user.nombre, rol: user.rol } });
  });
};
