// File: controllers/usuario.controller.js

const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

// Crear usuario
exports.crearUsuario = async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.query('INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)', 
    [nombre, email, hashed, rol || 'usuario'], 
    (err, result) => {
      if (err) return res.status(500).json({ mensaje: 'Error al crear usuario', error: err });
      res.status(201).json({ mensaje: 'Usuario creado', id: result.insertId });
    });
};

// Obtener todos
exports.listarUsuarios = (req, res) => {
  db.query('SELECT id, nombre, email, rol FROM usuarios', (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    res.json(results);
  });
};

// Obtener por ID
exports.obtenerUsuario = (req, res) => {
  db.query('SELECT id, nombre, email, rol FROM usuarios WHERE id = ?', [req.params.id], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(results[0]);
  });
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const hashed = password ? await bcrypt.hash(password, 10) : null;

  const fields = [];
  const values = [];

  if (nombre) { fields.push('nombre = ?'); values.push(nombre); }
  if (email) { fields.push('email = ?'); values.push(email); }
  if (rol) { fields.push('rol = ?'); values.push(rol); }
  if (hashed) { fields.push('password = ?'); values.push(hashed); }

  if (fields.length === 0) return res.status(400).json({ mensaje: 'Nada que actualizar' });

  values.push(req.params.id);
  db.query(`UPDATE usuarios SET ${fields.join(', ')} WHERE id = ?`, values, (err) => {
    if (err) return res.status(500).json({ mensaje: 'Error al actualizar usuario' });
    res.json({ mensaje: 'Usuario actualizado' });
  });
};

// Eliminar
exports.eliminarUsuario = (req, res) => {
  db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ mensaje: 'Error al eliminar usuario' });
    res.json({ mensaje: 'Usuario eliminado' });
  });
};
