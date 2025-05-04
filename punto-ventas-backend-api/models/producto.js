const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria_id: { type: mongoose.Schema.Types.ObjectId, ref: 'categorias', required: true },
    stock: { type: Number, default: 0 },
    caracteristicas: { type: mongoose.Schema.Types.Mixed, default: {} },
    descripcion: { type: String },
    descuento: { type: Number, default: 0 },
    peso: { type: Number },
    fecha_vencimiento: { type: Date },
    imagen: { type: String } // Solo ruta
  },
  {
    timestamps: { createdAt: 'date_created', updatedAt: false }
  }
);

module.exports = mongoose.model("productos", productSchema);
