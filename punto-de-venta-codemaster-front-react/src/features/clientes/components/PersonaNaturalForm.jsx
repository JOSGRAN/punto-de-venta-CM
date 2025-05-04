import React from 'react';
import { 
  TextField, 
  Grid, 
  Button, 
  Typography, 
  Paper, 
  Box,
  InputAdornment,
  Divider,

} from '@mui/material';
import {
  Person,
  Badge,
  Phone,
  LocationOn,
  Save,
  Clear
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const PersonaNaturalForm = ({ onSave, onCancel, initialValues }) => {
  const theme = useTheme();
  const [formData, setFormData] = React.useState({
    nombres: '',
    apellidos: '',
    dni: '',
    telefono: '',
    direccion: '',
    ...initialValues
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Person color="primary" sx={{ fontSize: 32, mr: 1.5 }} />
        <Typography variant="h6" color="primary">
          Información Personal
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Nombres"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="DNI"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              inputProps={{ maxLength: 8 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Badge color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dirección"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              multiline
              rows={3}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              gap: 2,
              mt: 2
            }}>
              {onCancel && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Clear />}
                  onClick={onCancel}
                  sx={{
                    px: 4,
                    borderRadius: '8px'
                  }}
                >
                  Cancelar
                </Button>
              )}
              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Save />}
                sx={{
                  px: 4,
                  borderRadius: '8px',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  '&:hover': {
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                Guardar Cliente
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default PersonaNaturalForm;