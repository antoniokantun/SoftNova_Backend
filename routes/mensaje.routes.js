// File: routes/mensaje.routes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/mensaje.controller');
const { verifyAuth } = require('../middlewares/auth.middleware');
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
 *               - recaptchaToken
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
 *               recaptchaToken:
 *                 type: string
 *                 description: Token devuelto por Google reCAPTCHA v2
 *     responses:
 *       201:
 *         description: Mensaje guardado exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/mensajes', controller.enviarMensaje);

/**
 * @swagger
 * /api/leads:
 *   get:
 *     summary: Obtener lista de leads (protegido)
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         description: Página de resultados
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         description: Número de resultados por página
 *     responses:
 *       200:
 *         description: Lista de leads
 *       401:
 *         description: No autorizado
 */

// Rutas protegidas del CRM
router.get('/leads', verifyAuth, controller.obtenerLeads);

/**
 * @swagger
 * /api/leads/{id}/estado:
 *   put:
 *     summary: Cambiar el estado de un lead (protegido)
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del lead
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [nuevo, contactado, descartado]
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       400:
 *         description: Estado no válido
 *       401:
 *         description: No autorizado
 */

router.put('/leads/:id/estado', verifyAuth, controller.cambiarEstado);

module.exports = router;
