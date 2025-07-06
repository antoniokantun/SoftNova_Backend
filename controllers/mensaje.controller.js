const db = require('../models/db');
const axios = require('axios');
const Joi = require('joi');
require('dotenv').config();

// Esquema Joi para validar y sanitizar los datos
const mensajeSchema = Joi.object({
  nombre_completo: Joi.string().min(3).max(100).trim().required(),
  correo: Joi.string().email().trim().required(),
  telefono: Joi.string().min(7).max(20).trim().allow('', null),
  servicio_id: Joi.number().integer().min(1).required(),
  mensaje: Joi.string().max(1000).trim().allow('', null),
  recaptchaToken: Joi.string().required()
});

exports.enviarMensaje = async (req, res) => {
  try {
    // Validación y sanitización
    const { error, value } = mensajeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ mensaje: 'Datos inválidos', detalles: error.details });
    }

    const { nombre_completo, correo, telefono, servicio_id, mensaje, recaptchaToken } = value;

    // Verificar token reCAPTCHA v2
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;

    const response = await axios.post(verificationURL);

    if (!response.data.success) {
      return res.status(403).json({ mensaje: 'Error en la verificación de reCAPTCHA' });
    }

    // Insertar en la base de datos
    const query = `INSERT INTO mensajes (nombre_completo, correo, telefono, servicio_id, mensaje)
                   VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [nombre_completo, correo, telefono, servicio_id, mensaje], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensaje: 'Error al guardar el mensaje' });
      }
      res.status(201).json({ mensaje: 'Mensaje guardado correctamente', id: result.insertId });
    });

  } catch (err) {
    console.error('Error interno:', err);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};
