// File: models/db.js

const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timeout: 60000
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    console.error('Host:', process.env.DB_HOST);
    console.error('Usuario:', process.env.DB_USER);
    console.error('Base de datos:', process.env.DB_NAME);
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;
