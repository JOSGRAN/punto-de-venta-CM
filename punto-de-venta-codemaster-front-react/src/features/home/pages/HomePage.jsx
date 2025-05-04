import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Stack, 
  Button,
  useTheme
} from '@mui/material';
import {
  PointOfSale,
  Inventory,
  Category,
  People,
  History,
  Assessment
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const theme = useTheme();

  const metrics = [
    { value: '0', label: 'Ventas hoy', icon: <PointOfSale fontSize="large" />, color: 'primary' },
    { value: '0', label: 'Productos', icon: <Inventory fontSize="large" />, color: 'secondary' },
    { value: '0', label: 'Categorías', icon: <Category fontSize="large" />, color: 'success' },
    { value: '0', label: 'Clientes', icon: <People fontSize="large" />, color: 'info' }
  ];

  const quickActions = [
    { label: 'Nueva Venta', icon: <PointOfSale />, path: '/ventas/nueva', color: 'primary' },
    { label: 'Agregar Producto', icon: <Inventory />, path: '/productos', color: 'secondary' },
    { label: 'Registrar Cliente', icon: <People />, path: '/clientes/nuevo', color: 'success' },
    { label: 'Ver Reportes', icon: <Assessment />, path: '/reportes', color: 'info' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Encabezado */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenido al Sistema de Punto de Ventas
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Gestión completa de ventas, inventario y clientes
        </Typography>
      </Box>

      {/* Métricas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              sx={{ 
                p: 3, 
                borderRadius: 2,
                borderLeft: `4px solid ${theme.palette[metric.color].main}`
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ 
                  color: theme.palette[metric.color].main,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {metric.icon}
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={600}>
                    {metric.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {metric.label}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Acciones Rápidas */}
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Acciones Rápidas
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {quickActions.map((action, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Button
              component={Link}
              to={action.path}
              variant="contained"
              color={action.color}
              startIcon={action.icon}
              fullWidth
              sx={{ 
                py: 2,
                borderRadius: 2,
                textAlign: 'left',
                justifyContent: 'flex-start',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[4]
                },
                transition: 'all 0.3s ease'
              }}
            >
              {action.label}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Sección de Gráficos (placeholder) */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Resumen de Ventas
        </Typography>
        <Box sx={{ 
          height: 300, 
          backgroundColor: theme.palette.grey[100],
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography color="text.secondary">
            Gráfico de ventas semanales (integrate con Chart.js o similar)
          </Typography>
        </Box>
      </Paper>

      {/* Últimas Ventas */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6">Últimas Ventas</Typography>
          <Button 
            component={Link} 
            to="/ventas" 
            size="small" 
            endIcon={<History />}
          >
            Ver Historial
          </Button>
        </Stack>
        <Box sx={{ 
          minHeight: 200, 
          backgroundColor: theme.palette.grey[100],
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography color="text.secondary">
            Tabla de últimas ventas registradas
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default HomePage;