import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Stack, 
  Button,
  useTheme,
  Avatar,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  PointOfSale,
  Inventory,
  Category,
  People,
  History,
  Assessment,
  AddShoppingCart,
  Receipt,
  LocalOffer,
  TrendingUp
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const theme = useTheme();

  // Datos de ejemplo (deberías reemplazarlos con datos reales)
  const metrics = [
    { 
      value: '2,450', 
      label: 'Ventas hoy', 
      icon: <PointOfSale fontSize="large" />, 
      color: 'primary',
      progress: 65,
      change: '+12%',
      changePositive: true
    },
    { 
      value: '1,234', 
      label: 'Productos', 
      icon: <Inventory fontSize="large" />, 
      color: 'secondary',
      progress: 45,
      change: '+5%',
      changePositive: true
    },
    { 
      value: '24', 
      label: 'Categorías', 
      icon: <Category fontSize="large" />, 
      color: 'success',
      progress: 80,
      change: '0%',
      changePositive: null
    },
    { 
      value: '345', 
      label: 'Clientes', 
      icon: <People fontSize="large" />, 
      color: 'info',
      progress: 30,
      change: '-2%',
      changePositive: false
    }
  ];

  const quickActions = [
    { label: 'Nueva Venta', icon: <AddShoppingCart />, path: '/ventas/nueva', color: 'primary' },
    { label: 'Agregar Producto', icon: <Inventory />, path: '/productos', color: 'secondary' },
    { label: 'Registrar Cliente', icon: <People />, path: '/clientes/nuevo', color: 'success' },
    { label: 'Ver Reportes', icon: <Assessment />, path: '/reportes', color: 'info' }
  ];

  const recentSales = [
    { id: '#00123', customer: 'Juan Pérez', amount: '$1,250', date: 'Hoy, 10:45 AM', status: 'completed' },
    { id: '#00122', customer: 'María Gómez', amount: '$890', date: 'Hoy, 09:30 AM', status: 'completed' },
    { id: '#00121', customer: 'Empresa XYZ', amount: '$3,450', date: 'Ayer, 4:20 PM', status: 'completed' },
    { id: '#00120', customer: 'Roberto Sánchez', amount: '$1,750', date: 'Ayer, 2:15 PM', status: 'completed' },
    { id: '#00119', customer: 'Ana Martínez', amount: '$520', date: 'Ayer, 11:30 AM', status: 'completed' }
  ];

  const topProducts = [
    { name: 'Laptop HP EliteBook', sales: 45, stock: 12 },
    { name: 'Mouse Inalámbrico Logitech', sales: 38, stock: 24 },
    { name: 'Teclado Mecánico RGB', sales: 32, stock: 8 },
    { name: 'Monitor 24" Samsung', sales: 28, stock: 5 },
    { name: 'Disco SSD 1TB', sales: 25, stock: 15 }
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.grey[50], minHeight: '100vh' }}>
      {/* Encabezado */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
          Panel de Control
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="subtitle1" color="text.secondary">
            Resumen general del negocio
          </Typography>
          <Chip 
            label="Hoy" 
            size="small" 
            color="primary" 
            variant="outlined"
            sx={{ 
              borderRadius: 1,
              fontWeight: 500
            }}
          />
        </Stack>
      </Box>

      {/* Métricas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              elevation={2}
              sx={{ 
                p: 3, 
                borderRadius: 3,
                borderLeft: `4px solid ${theme.palette[metric.color].main}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[6]
                }
              }}
            >
              <Stack direction="row" alignItems="flex-start" spacing={2}>
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette[metric.color].light,
                    color: theme.palette[metric.color].dark,
                    width: 48, 
                    height: 48
                  }}
                >
                  {metric.icon}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {metric.label}
                  </Typography>
                  <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5 }}>
                    {metric.value}
                  </Typography>
                  
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                    {metric.changePositive !== null && (
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: metric.changePositive ? 
                            theme.palette.success.main : 
                            theme.palette.error.main,
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {metric.changePositive ? <TrendingUp fontSize="inherit" /> : ''}
                        {metric.change}
                      </Typography>
                    )}
                    <LinearProgress 
                      variant="determinate" 
                      value={metric.progress} 
                      sx={{ 
                        flex: 1,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: theme.palette.grey[200],
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: theme.palette[metric.color].main,
                          borderRadius: 3
                        }
                      }} 
                    />
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Acciones Rápidas */}
      <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
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
                py: 2.5,
                borderRadius: 2,
                textAlign: 'left',
                justifyContent: 'flex-start',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: theme.shadows[6]
                },
                transition: 'all 0.3s ease',
                boxShadow: theme.shadows[2]
              }}
            >
              <Box sx={{ pl: 1 }}>
                <Typography fontWeight={600}>{action.label}</Typography>
              </Box>
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Sección de Gráficos y Datos */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Gráfico de Ventas */}
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={2}
            sx={{ 
              p: 3, 
              borderRadius: 3,
              height: '100%'
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>Resumen de Ventas</Typography>
              <Button 
                variant="outlined" 
                size="small" 
                endIcon={<Assessment />}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2
                }}
              >
                Ver Detalles
              </Button>
            </Stack>
            <Box sx={{ 
              height: 300, 
              backgroundColor: theme.palette.grey[100],
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px dashed ${theme.palette.grey[400]}`
            }}>
              <Stack alignItems="center" spacing={1}>
                <LocalOffer sx={{ fontSize: 48, color: theme.palette.grey[400] }} />
                <Typography color="text.secondary" variant="body2">
                  Gráfico de ventas semanales
                </Typography>
              </Stack>
            </Box>
          </Paper>
        </Grid>
        
        {/* Productos más vendidos */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2}
            sx={{ 
              p: 3, 
              borderRadius: 3,
              height: '100%'
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Productos Destacados
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              {topProducts.map((product, index) => (
                <Stack 
                  key={index} 
                  direction="row" 
                  alignItems="center" 
                  spacing={2}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: theme.palette.grey[50],
                    '&:hover': {
                      backgroundColor: theme.palette.grey[100]
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.primary.light,
                      color: theme.palette.primary.dark,
                      width: 40, 
                      height: 40
                    }}
                  >
                    {index + 1}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={500}>{product.name}</Typography>
                    <Stack direction="row" spacing={2}>
                      <Typography variant="caption" color="text.secondary">
                        Ventas: {product.sales}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Stock: {product.stock}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Últimas Ventas */}
      <Paper 
        elevation={2}
        sx={{ 
          p: 3, 
          borderRadius: 3
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600}>Últimas Ventas</Typography>
          <Button 
            component={Link} 
            to="/ventas" 
            variant="outlined" 
            size="small" 
            endIcon={<History />}
            sx={{
              textTransform: 'none',
              borderRadius: 2
            }}
          >
            Ver Historial Completo
          </Button>
        </Stack>
        
        <Box sx={{ 
          borderRadius: 2,
          overflow: 'hidden'
        }}>
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 2
          }}>
            {recentSales.map((sale, index) => (
              <Paper 
                key={index} 
                elevation={0}
                sx={{ 
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: theme.palette.grey[50],
                  borderLeft: `3px solid ${theme.palette.success.main}`
                }}
              >
                <Stack spacing={1}>
                  <Typography variant="subtitle2" fontWeight={600}>{sale.id}</Typography>
                  <Typography variant="body2">{sale.customer}</Typography>
                  <Typography variant="body1" fontWeight={600} color="primary">
                    {sale.amount}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {sale.date}
                  </Typography>
                </Stack>
              </Paper>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default HomePage;