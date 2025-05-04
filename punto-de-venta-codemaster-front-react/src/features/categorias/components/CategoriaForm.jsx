import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Stack, 
  Typography, 
  Paper,
  Box,
  Fade,
  Zoom
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Componente de título estilizado
const FormTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.5px',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: '50px',
    height: '3px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '3px'
  }
}));

// Botón personalizado
const CustomButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.5px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[3]
  }
}));

const CategoriaForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        descripcion: initialData.descripcion || ''
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Fade in timeout={300}>
      <Paper 
        sx={{ 
          p: 4,
          borderRadius: 2,
          boxShadow: (theme) => theme.shadows[4],
          background: (theme) => 
            `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
        }}
      >
        <FormTitle variant="h5">
          {initialData ? 'Editar Categoría' : 'Nueva Categoría'}
        </FormTitle>
        
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ mt: 2 }}
        >
          <Stack spacing={3}>
            <Zoom in timeout={500}>
              <TextField
                required
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& fieldset': {
                      borderColor: 'divider'
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.light'
                    }
                  }
                }}
                InputLabelProps={{
                  sx: {
                    color: 'text.secondary',
                    fontWeight: 500
                  }
                }}
              />
            </Zoom>
            
            <Zoom in timeout={600}>
              <TextField
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& textarea': {
                      minHeight: '80px'
                    }
                  }
                }}
              />
            </Zoom>
            
            <Zoom in timeout={700}>
              <Stack 
                direction="row" 
                spacing={2} 
                justifyContent="flex-end"
                sx={{ mt: 3 }}
              >
                {onCancel && (
                  <CustomButton 
                    variant="outlined" 
                    onClick={onCancel}
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
                  </CustomButton>
                )}
                <CustomButton 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  sx={{
                    px: 4,
                    background: (theme) => 
                      `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    '&:hover': {
                      boxShadow: (theme) => theme.shadows[6]
                    }
                  }}
                >
                  {initialData ? 'Actualizar Categoría' : 'Crear Categoría'}
                </CustomButton>
              </Stack>
            </Zoom>
          </Stack>
        </Box>
      </Paper>
    </Fade>
  );
};

export default CategoriaForm;