const express = require('express')
const empleadoRouter = express.Router()

//declaramos un objeto de nuestro modelo
let Empleado = require('../models/Empleado')

//agregar un nuevo empleado 
empleadoRouter.route('/agregar').post((req, res) => {
    Empleado.create(req.body)
        .then((data) => {
            console.log('Se agrego un empleado correctamente')
            res.send(data)
        })
        .catch((error) => {
            console.error(error)
            res.status(500).send(error) // Es importante enviar una respuesta al cliente
        })
})

//obtenemos todos los empleado
empleadoRouter.route('/empleados').get((req, res) => {
    Empleado.find()
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            console.error(error)
            res.status(500).send(error)
        })
})

//obtenemos un solo empleado con su ID correspondiente
empleadoRouter.route('/empleado/:id').get((req, res) => {
    Empleado.findById(req.params.id) // Corregido: req.parms.id -> req.params.id
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            console.error(error)
            res.status(500).send(error)
        })
})

//actualizar un empleado
empleadoRouter.route('/actualizar/:id').put((req, res) => {
    Empleado.findByIdAndUpdate(req.params.id, { // Corregido: paréntesis mal colocados
        $set: req.body
    }, { new: true }) // {new: true} para devolver el documento actualizado
        .then((data) => {
            console.log('el empleado se actualizo correctamente')
            res.send(data)
        })
        .catch((error) => {
            console.error(error)
            res.status(500).send(error)
        })
})

//eliminar un empleado
empleadoRouter.route('/eliminar/:id').delete((req, res) => {
    Empleado.findByIdAndDelete(req.params.id)
        .then((data) => {
            console.log('el empleado se elimino correctamente')
            res.send(data)
        })
        .catch((error) => {
            console.error(error)
            res.status(500).send(error)
        })
})

module.exports = empleadoRouter;