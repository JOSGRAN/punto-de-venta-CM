import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import {
  ShoppingCart as VentasIcon,
  Category as CategoriasIcon,
  Inventory as ProductosIcon,
  Home as InicioIcon,
  People as ClientesIcon,
  PointOfSale as PuntoVentaIcon
} from '@mui/icons-material';

const Navbar = () => {
  return (
    <AppBar 
      position="sticky"
      sx={{ 
        background: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 6px 25px rgba(0, 0, 0, 0.3)'
        }
      }}
    >
      <Toolbar sx={{ 
        minHeight: '70px',
        padding: { xs: '0 10px', md: '0 24px' }
      }}>
        {/* Logo/Título */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          mr: 3,
          '&:hover': {
            transform: 'scale(1.02)'
          },
          transition: 'transform 0.2s'
        }}>
          <PuntoVentaIcon sx={{ 
            fontSize: '2rem',
            mr: 1,
            color: '#fff'
          }} />
          <Typography 
            variant="h6" 
            component={Link}
            to="/"
            sx={{ 
              fontWeight: 800,
              letterSpacing: '1.5px',
              textDecoration: 'none',
              color: 'white',
              display: { xs: 'none', sm: 'block' },
              fontFamily: '"Segoe UI", Roboto, sans-serif',
              textTransform: 'uppercase',
              background: 'linear-gradient(to right, #ffffff, #e0f7fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Punto de Venta
          </Typography>
        </Box>

        {/* Menú principal */}
        <Box sx={{ 
          display: 'flex', 
          flexGrow: 1,
          justifyContent: 'center',
          gap: { xs: '2px', sm: '10px' }
        }}>
          <Button 
            component={Link}
            to="/"
            startIcon={<InicioIcon />}
            sx={{
              color: 'white',
              fontWeight: 600,
              fontSize: { xs: '0.7rem', sm: '0.875rem' },
              px: { xs: 1, sm: 2 },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Inicio
          </Button>
          
          <Button 
            component={Link}
            to="/productos"
            startIcon={<ProductosIcon />}
            sx={{
              color: 'white',
              fontWeight: 600,
              fontSize: { xs: '0.7rem', sm: '0.875rem' },
              px: { xs: 1, sm: 2 },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Productos
          </Button>
          
          <Button 
            component={Link}
            to="/categorias"
            startIcon={<CategoriasIcon />}
            sx={{
              color: 'white',
              fontWeight: 600,
              fontSize: { xs: '0.7rem', sm: '0.875rem' },
              px: { xs: 1, sm: 2 },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Categorías
          </Button>
          
          <Button 
            component={Link}
            to="/ventas"
            startIcon={<VentasIcon />}
            sx={{
              color: 'white',
              fontWeight: 600,
              fontSize: { xs: '0.7rem', sm: '0.875rem' },
              px: { xs: 1, sm: 2 },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Ventas
          </Button>
          
          <Button 
            component={Link}
            to="/clientes"
            startIcon={<ClientesIcon />}
            sx={{
              color: 'white',
              fontWeight: 600,
              fontSize: { xs: '0.7rem', sm: '0.875rem' },
              px: { xs: 1, sm: 2 },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
            
          >
            Clientes
          </Button>
        </Box>

        {/* Espacio para elementos del lado derecho (como usuario) */}
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          ml: 2
        }}>
          {/* Aquí podrías añadir un selector de tema, icono de usuario, etc. */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;