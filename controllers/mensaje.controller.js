const db = require('../models/db');
const axios = require('axios');
const Joi = require('joi');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// Configurar SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Esquema Joi para validar y sanitizar los datos del lead
const mensajeSchema = Joi.object({
  nombre_completo: Joi.string().min(3).max(100).trim().required(),
  correo: Joi.string().email().trim().required(),
  telefono: Joi.string().min(7).max(20).trim().allow('', null),
  servicio_id: Joi.number().integer().min(1).required(),
  mensaje: Joi.string().max(1000).trim().allow('', null),
  recaptchaToken: Joi.string().required()
});

// ✅ Envío de correo al administrador con datos del lead
async function notificarNuevoLead(datos) {
  const msg = {
    to: process.env.SENDGRID_TO,
    from: process.env.SENDGRID_FROM, // debe estar verificado
    subject: '📥 Nuevo lead recibido',
    text: `
📨 Nuevo Lead Recibido:

👤 Nombre: ${datos.nombre_completo}
📧 Correo: ${datos.correo}
📞 Teléfono: ${datos.telefono || 'No proporcionado'}
💼 Servicio de interés: ${datos.servicio_nombre}
📝 Mensaje:
${datos.mensaje || 'Sin mensaje'}

Enviado desde el formulario de contacto.
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('📤 Correo enviado al administrador.');
  } catch (err) {
    console.error('❌ Error al enviar email:', err.response?.body || err.message);
  }
}

// ✅ Crear lead
exports.enviarMensaje = async (req, res) => {
  try {
    // Validar y sanitizar entrada
    const { error, value } = mensajeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ mensaje: 'Datos inválidos', detalles: error.details });
    }

    const { nombre_completo, correo, telefono, servicio_id, mensaje, recaptchaToken } = value;

    // Verificar reCAPTCHA v2
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
    const response = await axios.post(verificationURL);

    if (!response.data.success) {
      return res.status(403).json({ mensaje: 'Error en la verificación de reCAPTCHA' });
    }

    // Insertar en base de datos
    const query = `INSERT INTO mensajes (nombre_completo, correo, telefono, servicio_id, mensaje)
                   VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [nombre_completo, correo, telefono, servicio_id, mensaje], async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensaje: 'Error al guardar el mensaje' });
      }

      // Obtener nombre del servicio
      db.query('SELECT nombre FROM servicios WHERE id = ?', [servicio_id], async (err2, result2) => {
        const servicio_nombre = result2?.[0]?.nombre || `ID ${servicio_id}`;

        // Enviar correo con nombre del servicio
        await notificarNuevoLead({ nombre_completo, correo, telefono, servicio_id, servicio_nombre, mensaje });
        
        // Responder solo una vez, después del correo
        res.status(201).json({ mensaje: 'Mensaje guardado y correo enviado', id: result.insertId });
      });
    });

  } catch (err) {
    console.error('Error interno:', err);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// ✅ Obtener leads con paginación
exports.obtenerLeads = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  db.query(`SELECT m.*, s.nombre AS servicio FROM mensajes m
            JOIN servicios s ON s.id = m.servicio_id
            ORDER BY fecha_envio DESC LIMIT ? OFFSET ?`,
    [parseInt(limit), parseInt(offset)],
    (err, results) => {
      if (err) return res.status(500).json({ mensaje: 'Error al obtener leads' });
      res.json(results);
    });
};

// ✅ Cambiar estado de un lead (nuevo, contactado, descartado)
exports.cambiarEstado = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const estadosValidos = ['nuevo', 'contactado', 'descartado'];
  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ mensaje: 'Estado no válido' });
  }

  db.query('UPDATE mensajes SET estado = ? WHERE id = ?', [estado, id], (err, result) => {
    if (err) return res.status(500).json({ mensaje: 'Error al actualizar el estado' });
    res.json({ mensaje: 'Estado actualizado correctamente' });
  });
};
