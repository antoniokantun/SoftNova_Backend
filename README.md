# SoftNova_Backend

Este repositorio contiene el backend del formulario de contacto de SoftNova, desarrollado con **Express.js** y **MySQL**, e integrado con **Swagger** para documentación automática de la API.

## 🧾 Descripción

La API permite almacenar los datos enviados desde un formulario web, incluyendo:

- Nombre completo
- Correo electrónico
- Teléfono
- Servicio de interés (select con 9 opciones)
- Mensaje del usuario

Los datos se almacenan en una base de datos MySQL con validación y estructura relacional.

## 🛠️ Tecnologías utilizadas

- Node.js
- Express.js
- MySQL2
- Dotenv
- Swagger UI Express
- Swagger JSDoc

## 📁 Estructura del proyecto

```
SoftNova_Backend/
├── src/
│   ├── controllers/         # Lógica de negocio
│   ├── routes/              # Rutas de la API
│   ├── models/              # Conexión a la base de datos
│   ├── docs/                # Configuración de Swagger
│   └── app.js               # Punto de entrada principal
├── .env                     # Variables de entorno (no subir al repo)
├── .gitignore               # Archivos ignorados por Git
├── package.json             # Configuración de npm
└── README.md                # Este archivo
```

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/SoftNova_Backend.git
cd SoftNova_Backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura el archivo `.env`:

```env
DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_password_mysql
DB_NAME=formulario_contacto
PORT=3000
```

4. Ejecuta el servidor:

```bash
npm run dev
```

## 📄 Documentación de la API

Una vez iniciado el servidor, visita:

```
http://localhost:3000/api-docs
```

Allí podrás probar los endpoints directamente con Swagger UI.

## 🧪 Endpoints disponibles

| Método | Ruta            | Descripción                         |
|--------|------------------|-------------------------------------|
| POST   | `/api/mensajes` | Guarda un mensaje del formulario   |

## 🛡️ Notas de seguridad

- Las variables sensibles están gestionadas con `.env`.
- El acceso a la base de datos está protegido mediante prepared statements (evita inyecciones SQL).
- La API puede expandirse con validaciones, autenticación y sanitización.

## 🧑‍💻 Autor

Antonio Emmanuel Kantun Cahum  
Estudiante de Desarrollo de Software  
[LinkedIn](https://www.linkedin.com/) | [GitHub](https://github.com/antoniokantun)
