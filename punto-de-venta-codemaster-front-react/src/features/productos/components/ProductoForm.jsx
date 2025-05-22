import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Paper,
  MenuItem,
  Box,
  Grid,
  Divider,
  Chip,
  IconButton,
  Tooltip,
  Collapse,
  Fade
} from '@mui/material';
import { 
  AddCircle, 
  RemoveCircle, 
  Cancel, 
  Save,
  ExpandMore,
  ExpandLess,
  Image
} from '@mui/icons-material';
import { useCategorias } from '../../categorias/context/CategoriaContext';
import { styled } from '@mui/material/styles';

const FormTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.5px',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '&:after': {
    content: '""',
    flex: 1,
    marginLeft: theme.spacing(2),
    height: '1px',
    backgroundColor: theme.palette.divider
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.5px',
  padding: theme.spacing(1.5, 3),
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[3]
  }
}));

const ProductoForm = ({ initialData, onSubmit, onCancel }) => {
  const { categorias } = useCategorias();
  const [formData, setFormData] = useState({
    nombre: '',
    precio: 0,
    categoria_id: '',
    stock: 0,
    caracteristicas: {},
    imagen: null,
    imagenPreview: null
  });
  const [expanded, setExpanded] = useState(false);
  const [newFeature, setNewFeature] = useState({ key: '', value: '' });

  useEffect(() => {
    if (initialData) {
      const caracteristicas = typeof initialData.caracteristicas === 'object' && 
                            !Array.isArray(initialData.caracteristicas) ?
                            initialData.caracteristicas : {};
      
      setFormData({
        nombre: initialData.nombre || '',
        precio: initialData.precio || 0,
        categoria_id: initialData.categoria_id || '',
        stock: initialData.stock || 0,
        caracteristicas: caracteristicas,
        imagen: null,
        imagenPreview: initialData.imagen || null
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCaracteristicaChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      caracteristicas: {
        ...prev.caracteristicas,
        [name]: value
      }
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert('Por favor, selecciona solo archivos de imagen (JPEG, PNG)');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe exceder los 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imagen: file,
          imagenPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      imagen: null,
      imagenPreview: null
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.key && newFeature.value) {
      setFormData(prev => ({
        ...prev,
        caracteristicas: {
          ...prev.caracteristicas,
          [newFeature.key]: newFeature.value
        }
      }));
      setNewFeature({ key: '', value: '' });
    }
  };

  const handleRemoveFeature = (key) => {
    const newFeatures = { ...formData.caracteristicas };
    delete newFeatures[key];
    setFormData(prev => ({
      ...prev,
      caracteristicas: newFeatures
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (key === 'caracteristicas') {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else if (key !== 'imagenPreview' && formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });
    
    if (formData.imagen) {
      formDataToSend.append('imagen', formData.imagen);
      formDataToSend.append('categoria', formData.categoria_id);
    }
    
    onSubmit(formDataToSend);
  };

  return (
    <Fade in timeout={300}>
      <Paper sx={{ 
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        background: (theme) => theme.palette.background.paper
      }}>
        <FormTitle variant="h5">
          {initialData ? 'Editar Producto' : 'Nuevo Producto'}
        </FormTitle>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Nombre del Producto"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              
              <TextField
                required
                label="Precio"
                name="precio"
                type="number"
                value={formData.precio}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                  inputProps: { step: "0.01", min: "0" }
                }}
              />
              
              <TextField
                required
                select
                label="Categoría"
                name="categoria_id"
                value={formData.categoria_id}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              >
                {categorias.map((categoria) => (
                  <MenuItem key={categoria._id} value={categoria._id}>
                    {categoria.nombre}
                  </MenuItem>
                ))}
              </TextField>
              
              <TextField
                label="Stock Disponible"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  inputProps: { min: "0" }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3, p: 2, border: '1px dashed', borderRadius: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Imagen del Producto
                </Typography>
                
                {formData.imagenPreview ? (
                  <Box sx={{ position: 'relative', mb: 2 }}>
                    <img 
                      src={formData.imagenPreview} 
                      alt="Preview" 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '200px',
                        borderRadius: '8px',
                        display: 'block',
                        margin: '0 auto'
                      }} 
                    />
                    <IconButton
                      onClick={handleRemoveImage}
                      sx={{ 
                        position: 'absolute', 
                        top: 8, 
                        right: 8,
                        backgroundColor: 'rgba(255,255,255,0.8)'
                      }}
                      color="error"
                    >
                      <RemoveCircle />
                    </IconButton>
                  </Box>
                ) : (
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: 100,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1,
                    mb: 2
                  }}>
                    <Image color="disabled" sx={{ fontSize: 48 }} />
                  </Box>
                )}
                
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<AddCircle />}
                >
                  {formData.imagenPreview ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
                
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                  Formatos: JPEG, PNG (Máx. 5MB)
                </Typography>
              </Box>

              <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Características
                  </Typography>
                  <IconButton onClick={() => setExpanded(!expanded)}>
                    {expanded ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>

                <Collapse in={expanded}>
                  <Divider sx={{ my: 2 }} />
                  
                  {Object.entries(formData.caracteristicas).map(([key, value]) => (
                    <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Chip 
                        label={`${key}: ${value}`}
                        sx={{ flex: 1, justifyContent: 'space-between' }}
                      />
                      <IconButton onClick={() => handleRemoveFeature(key)} size="small" color="error">
                        <RemoveCircle fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}

                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <TextField
                      size="small"
                      placeholder="Nombre"
                      value={newFeature.key}
                      onChange={(e) => setNewFeature({...newFeature, key: e.target.value})}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      size="small"
                      placeholder="Valor"
                      value={newFeature.value}
                      onChange={(e) => setNewFeature({...newFeature, value: e.target.value})}
                      sx={{ flex: 1 }}
                    />
                    <IconButton 
                      onClick={handleAddFeature}
                      disabled={!newFeature.key || !newFeature.value}
                      color="primary"
                    >
                      <AddCircle />
                    </IconButton>
                  </Box>
                </Collapse>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            <ActionButton
              variant="outlined"
              onClick={onCancel}
              startIcon={<Cancel />}
            >
              Cancelar
            </ActionButton>
            <ActionButton
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<Save />}
            >
              {initialData ? 'Actualizar Producto' : 'Guardar Producto'}
            </ActionButton>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default ProductoForm;