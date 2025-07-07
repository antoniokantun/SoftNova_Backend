//index.js

const express = require('express');
const cors = require('cors');
const app = express();
const mensajeRoutes = require('./routes/mensaje.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const authRoutes = require('./routes/auth.routes');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

require('dotenv').config();

app.use(cors());
app.use(express.json());

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    mensaje: '🚀 API SoftNova Backend está funcionando!',
    version: '1.0.0',
    endpoints: {
      documentacion: '/api-docs',
      mensajes: '/api/mensajes',
      usuarios: '/api/usuarios',
      auth: '/api/auth'
    }
  });
});

app.use('/api', mensajeRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', authRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Swagger disponible en http://localhost:${PORT}/api-docs`);
});
