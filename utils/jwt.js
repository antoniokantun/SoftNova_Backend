// File: utils/jwt.js

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.generateToken = (payload) => jwt.sign(payload, secret, { expiresIn: '1d' });

exports.verifyToken = (token) => jwt.verify(token, secret);
