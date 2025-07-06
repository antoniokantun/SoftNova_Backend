const db = require('../models/db');

exports.enviarMensaje = (req, res) => {
  const { nombre_completo, correo, telefono, servicio_id, mensaje } = req.body;

  const query = `INSERT INTO mensajes (nombre_completo, correo, telefono, servicio_id, mensaje)
                 VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [nombre_completo, correo, telefono, servicio_id, mensaje], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al guardar el mensaje' });
    }
    res.status(201).json({ mensaje: 'Mensaje guardado correctamente', id: result.insertId });
  });
};
