const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Enviar notificación de nuevo lead al administrador
 * @param {Object} data
 * @param {string} data.nombre_completo
 * @param {string} data.correo
 * @param {string} data.telefono
 * @param {string} data.servicio_interes
 * @param {string} data.mensaje
 */
async function notificarNuevoLead(data) {
  const msg = {
    to: process.env.SENDGRID_TO,
    from: process.env.SENDGRID_FROM,
    subject: '📥 Nuevo lead recibido',
    text: `
📨 Nuevo Lead Recibido:

👤 Nombre: ${data.nombre_completo}
📧 Correo: ${data.correo}
📞 Teléfono: ${data.telefono}
💼 Servicio de interés: ${data.servicio_interes}
📝 Mensaje:
${data.mensaje}

Saludos,
Equipo de SoftNova
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('📤 Correo enviado al administrador.');
  } catch (err) {
    console.error('❌ Error al enviar correo:', err.response?.body || err.message);
  }
}

module.exports = {
  notificarNuevoLead,
};
