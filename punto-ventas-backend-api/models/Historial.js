const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const historialSchema = new Schema({
  cliente_id: { type: Types.ObjectId, ref: 'clientes', required: true },
  productos: [
    {
      producto_id: { type: Types.ObjectId, ref: 'productos', required: true },
      cantidad: { type: Number, required: true },
      precio_unitario: { type: Number, required: true },
      total: { type: Number, required: true } // cantidad * precio_unitario
    }
  ],
  total_venta: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('historial', historialSchema);
