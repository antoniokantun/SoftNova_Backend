// File: models/db.js

const mysql = require('mysql2');
require('dotenv').config();

// Crear pool de conexiones en lugar de una sola conexión
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  idleTimeout: 300000,
  multipleStatements: false
});

// Probar la conexión
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    console.error('Host:', process.env.DB_HOST);
    console.error('Usuario:', process.env.DB_USER);
    console.error('Base de datos:', process.env.DB_NAME);
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
  connection.release(); // Liberar la conexión de vuelta al pool
});

module.exports = pool;
