const express = require('express');
const router = express.Router();
const Product = require('../models/Producto');
const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const categoria = req.body.categoria || 'otros'; // Asume que el campo 'categoria' viene en el body
    cb(null, path.join(__dirname, '..', 'uploads', categoria)); // Crea una carpeta para cada categoría
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Crear productos
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    const producto = new Product({
      nombre: req.body.nombre,
      precio: req.body.precio,
      categoria_id: req.body.categoria_id,
      stock: req.body.stock,
      caracteristicas: req.body.caracteristicas,
      descripcion: req.body.descripcion,
      descuento: req.body.descuento,
      peso: req.body.peso,
      fecha_vencimiento: req.body.fecha_vencimiento,
      imagen: req.file ? `/uploads/${req.body.categoria}/${req.file.filename}` : null
    });
    await producto.save();
    res.status(201).json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const lista = await Product.find().populate('categoria_id');
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// productRoutes.js
router.put('/:id', upload.single('imagen'), async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar que el ID sea válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID de producto no válido' });
    }

    const updates = {
      ...req.body,
      updatedAt: Date.now()
    };

    // Manejo de imagen si se subió una nueva
    if (req.file) {
      const categoria = req.body.categoria_id || 'otros';
      updates.imagen = `/uploads/productos/${categoria}/${req.file.filename}`;
      
      // Eliminar imagen anterior si existe
      const producto = await Product.findById(id);
      if (producto?.imagen) {
        const oldImagePath = path.join(__dirname, '..', 'public', producto.imagen);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
    }

    const productoActualizado = await Product.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate('categoria_id');

    if (!productoActualizado) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({
      success: true,
      data: productoActualizado
    });
  } catch (err) {
    console.error('Error al actualizar producto:', err);
    
    if (req.file) fs.unlinkSync(req.file.path);
    
    res.status(500).json({ 
      error: 'Error al actualizar producto',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});
module.exports = router;
