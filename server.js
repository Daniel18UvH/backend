const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const createError = require('http-errors');

// Conexión con la BD
mongoose.connect('mongodb+srv://ulisesvhti22:bwg0AiDEjyeFrkVX@cluster0.fizmxcl.mongodb.net/empleados?retryWrites=true&w=majority&appName=Cluster0')
  .then((x) => {
    console.log(`Conectado exitosamente a la BD: "${x.connections[0].name}"`);
  })
  .catch((error) => {
    console.log('Error al conectarse a MongoDB:', error.reason);
  });

const empleadRutas = require('./routes/empleado.routes');
const app = express();

// Configuración de middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Logger para ver las peticiones entrantes (útil para debug)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    status: 'success',
    message: 'API de Empleados funcionando',
    timestamp: new Date()
  });
});

// Rutas API
app.use('/api', empleadRutas);

// Manejador 404 (debe ir después de todas las rutas)
app.use((req, res, next) => {
  console.log(`Ruta no encontrada: ${req.method} ${req.path}`);
  next(createError(404, 'Endpoint no encontrado'));
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message,
    timestamp: new Date()
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});