const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  tipo_documento: { type: String, required: true },
  dni: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\d{8}$/.test(v); // Valida que tenga 8 dígitos numéricos
      },
      message: props => `${props.value} no es un DNI válido (debe tener 8 dígitos)`
    }
  },
  nombre: { type: String, required: true },
  telefono: { type: String }
}, {
  timestamps: { createdAt: 'date_created', updatedAt: false }
});

module.exports = mongoose.model('clientes', clienteSchema);
