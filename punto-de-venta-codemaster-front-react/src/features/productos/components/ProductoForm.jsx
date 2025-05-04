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
  ExpandLess
} from '@mui/icons-material';
import { useCategorias } from '../../categorias/context/CategoriaContext';
import { styled } from '@mui/material/styles';

// Componente de título estilizado
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

// Botón personalizado
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
    caracteristicas: {}
  });
  const [expanded, setExpanded] = useState(false);
  const [newFeature, setNewFeature] = useState({ key: '', value: '' });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        precio: initialData.precio || 0,
        categoria_id: initialData.categoria_id || '',
        stock: initialData.stock || 0,
        caracteristicas: initialData.caracteristicas || {}
      });
      if (Object.keys(initialData.caracteristicas || {}).length > 0) {
        setExpanded(true);
      }
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
    onSubmit(formData);
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
            {/* Información Básica */}
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
                InputProps={{
                  sx: { borderRadius: '8px' }
                }}
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
                  inputProps: { step: "0.01", min: "0" },
                  sx: { borderRadius: '8px' }
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
                InputProps={{
                  sx: { borderRadius: '8px' }
                }}
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
                  inputProps: { min: "0" },
                  sx: { borderRadius: '8px' }
                }}
              />
            </Grid>

            {/* Características */}
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '8px',
                  p: 2,
                  mb: 2
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => setExpanded(!expanded)}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Características
                  </Typography>
                  {expanded ? <ExpandLess /> : <ExpandMore />}
                </Box>

                <Collapse in={expanded}>
                  <Divider sx={{ my: 2 }} />
                  
                  {/* Características existentes */}
                  {Object.entries(formData.caracteristicas).map(([key, value]) => (
                    <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Chip 
                        label={`${key}: ${value}`}
                        sx={{ 
                          mr: 1,
                          flex: 1,
                          justifyContent: 'space-between',
                          borderRadius: '6px'
                        }}
                      />
                      <Tooltip title="Eliminar característica">
                        <IconButton 
                          size="small" 
                          onClick={() => handleRemoveFeature(key)}
                          color="error"
                        >
                          <RemoveCircle fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  ))}

                  {/* Agregar nueva característica */}
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
                    <Tooltip title="Agregar característica">
                      <IconButton 
                        color="primary"
                        onClick={handleAddFeature}
                        disabled={!newFeature.key || !newFeature.value}
                      >
                        <AddCircle />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Collapse>
              </Box>

              {/* Características comunes */}
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Marca"
                    name="marca"
                    value={formData.caracteristicas.marca || ''}
                    onChange={handleCaracteristicaChange}
                    fullWidth
                    sx={{ mb: 1 }}
                    InputProps={{
                      sx: { borderRadius: '8px' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Color"
                    name="color"
                    value={formData.caracteristicas.color || ''}
                    onChange={handleCaracteristicaChange}
                    fullWidth
                    sx={{ mb: 1 }}
                    InputProps={{
                      sx: { borderRadius: '8px' }
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Acciones */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: 2,
            mt: 4,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}>
            {onCancel && (
              <ActionButton
                variant="outlined"
                onClick={onCancel}
                startIcon={<Cancel />}
                sx={{
                  color: 'text.secondary',
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'primary.light',
                    color: 'primary.main'
                  }
                }}
              >
                Cancelar
              </ActionButton>
            )}
            <ActionButton
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<Save />}
              sx={{
                px: 4,
                background: (theme) => 
                  `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                '&:hover': {
                  boxShadow: (theme) => theme.shadows[6]
                }
              }}
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