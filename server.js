const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const createError = require('http-errors'); // <- agregado

// Conexión con la BD
mongoose
  //.connect('mongodb://127.0.0.1:27017/empleados')
  .connect('mongodb+srv://ulisesvhti22:bwg0AiDEjyeFrkVX@cluster0.fizmxcl.mongodb.net/empleados?retryWrites=true&w=majority&appName=Cluster0')
  .then((x) => {
    console.log(`Conectado exitosamente a la BD: "${x.connections[0].name}"`);
  })
  .catch((error) => {
    console.log('Error al conectarse a MongoDB:', error.reason);
  });

// Configurar el servidor web
const empleadRutas = require('./routes/empleado.routes');
const app = express(); // <- corregido aquí

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());

app.use('/api', empleadRutas);

// Habilitamos el puerto
const port = process.env.port || 4000;

const server = app.listen(port, () => {
  console.log('Servidor escuchando en el puerto ' + port);
});

// Marcador de error 404
app.use((req, res, next) => {
  next(createError(404));
});

// Manejador de errores
app.use(function (err, req, res, next) {
  console.log(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
