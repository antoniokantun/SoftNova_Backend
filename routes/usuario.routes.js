// File: routes/usuario.routes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario.controller');
const { verifyAuth } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios del CRM
 */

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               rol:
 *                 type: string
 *                 enum: [admin, usuario]
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno
 */
router.post('/usuarios', verifyAuth, controller.crearUsuario);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error interno
 */
router.get('/usuarios', verifyAuth, controller.listarUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del usuario
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/usuarios/:id', verifyAuth, controller.obtenerUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               rol:
 *                 type: string
 *                 enum: [admin, usuario]
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Nada que actualizar
 *       500:
 *         description: Error interno
 */
router.put('/usuarios/:id', verifyAuth, controller.actualizarUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       500:
 *         description: Error interno
 */
router.delete('/usuarios/:id', verifyAuth, controller.eliminarUsuario);

module.exports = router;
