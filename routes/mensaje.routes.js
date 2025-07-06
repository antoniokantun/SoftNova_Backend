const express = require('express');
const router = express.Router();
const controller = require('../controllers/mensaje.controller');

/**
 * @swagger
 * /api/mensajes:
 *   post:
 *     summary: Enviar un mensaje desde el formulario
 *     tags: [Mensajes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre_completo
 *               - correo
 *               - servicio_id
 *             properties:
 *               nombre_completo:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *               servicio_id:
 *                 type: integer
 *               mensaje:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mensaje guardado exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/mensajes', controller.enviarMensaje);

module.exports = router;
