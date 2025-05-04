const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Crear cliente
router.post('/', async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    const clienteGuardado = await nuevoCliente.save();
    res.status(201).json(clienteGuardado);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    if (err.code === 11000) { // Error por duplicado
      return res.status(400).json({ error: 'El DNI ya está registrado' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
