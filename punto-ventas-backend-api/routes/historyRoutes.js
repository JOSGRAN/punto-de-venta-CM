const express = require('express');
const router = express.Router();
const Historial = require('../models/Historial');
const Cliente = require('../models/Cliente');
const Producto = require('../models/Producto');

// Registrar una nueva venta
router.post('/', async (req, res) => {
  try {
    const { cliente_id, productos } = req.body;

    let total_venta = 0;

    const productosProcesados = await Promise.all(productos.map(async item => {
      const producto = await Producto.findById(item.producto_id);
      if (!producto) throw new Error('Producto no encontrado');

      const precio_unitario = producto.precio;
      const total = precio_unitario * item.cantidad;

      total_venta += total;

      return {
        producto_id: item.producto_id,
        cantidad: item.cantidad,
        precio_unitario,
        total
      };
    }));

    const venta = new Historial({
      cliente_id,
      productos: productosProcesados,
      total_venta
    });

    await venta.save();
    res.status(201).json(venta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todas las ventas con detalles
router.get('/', async (req, res) => {
  try {
    const ventas = await Historial.find()
      .populate('cliente_id', 'tipo_documento dni nombre telefono')
      .populate('productos.producto_id', 'nombre precio');

    res.json(ventas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
