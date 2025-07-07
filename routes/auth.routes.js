// File: routes/auth.routes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 */
router.post('/login', authController.login);

module.exports = router;
