import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Divider,
  Badge,
  Avatar,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  ShoppingCart as VentasIcon,
  Category as CategoriasIcon,
  Inventory as ProductosIcon,
  Home as InicioIcon,
  People as ClientesIcon,
  PointOfSale as PuntoVentaIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const navItems = [
    { path: '/', label: 'Inicio', icon: <InicioIcon /> },
    { path: '/productos', label: 'Productos', icon: <ProductosIcon /> },
    { path: '/categorias', label: 'Categorías', icon: <CategoriasIcon /> },
    { path: '/ventas', label: 'Ventas', icon: <VentasIcon />, badge: 3 },
    { path: '/clientes', label: 'Clientes', icon: <ClientesIcon /> }
  ];

  const userMenuItems = [
    { label: 'Perfil', icon: <AccountIcon />, action: () => console.log('Perfil') },
    { label: 'Configuración', icon: <SettingsIcon />, action: () => console.log('Configuración') },
    { divider: true },
    { label: 'Cerrar sesión', icon: <LogoutIcon />, action: () => console.log('Cerrar sesión') }
  ];

  return (
    <AppBar 
      position="sticky"
      sx={{ 
        background: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ 
        minHeight: '70px',
        padding: { xs: '0 10px', md: '0 24px' },
        justifyContent: 'space-between'
      }}>
        {/* Logo/Título y Menú Mobile */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          flexGrow: isMobile ? 1 : 0
        }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open menu"
              edge="start"
              onClick={handleMobileMenuOpen}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Box 
            component={Link}
            to="/"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              textDecoration: 'none',
              '&:hover': {
                transform: 'scale(1.02)'
              },
              transition: 'transform 0.2s'
            }}
          >
            <PuntoVentaIcon sx={{ 
              fontSize: '2rem',
              mr: 1,
              color: '#fff'
            }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 800,
                letterSpacing: '1.5px',
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
        </Box>

        {/* Menú principal - Desktop */}
        {!isMobile && (
          <Box sx={{ 
            display: 'flex', 
            flexGrow: 1,
            justifyContent: 'center',
            gap: '5px',
            mx: 2
          }}>
            {navItems.map((item) => (
              <Button 
                key={item.path}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  px: 2,
                  minWidth: 'auto',
                  backgroundColor: location.pathname === item.path ? 
                    'rgba(255, 255, 255, 0.2)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: location.pathname === item.path ? '80%' : '0',
                    height: '3px',
                    backgroundColor: '#fff',
                    borderRadius: '3px 3px 0 0',
                    transition: 'width 0.3s ease'
                  }
                }}
              >
                {item.badge ? (
                  <Badge badgeContent={item.badge} color="error" sx={{ mr: 1 }}>
                    {item.label}
                  </Badge>
                ) : item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Elementos del lado derecho */}
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <IconButton color="inherit" sx={{ p: 1 }}>
            <Badge badgeContent={5} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <Button
            startIcon={<Avatar sx={{ width: 28, height: 28 }}>U</Avatar>}
            endIcon={!isMobile && <AccountIcon />}
            onClick={handleMenuOpen}
            sx={{
              color: 'white',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            {!isMobile && 'Usuario Admin'}
          </Button>
        </Box>

        {/* Menú de usuario */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 200,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
        >
          <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
            <Avatar /> Perfil
          </MenuItem>
          <Divider />
          {userMenuItems.map((item, index) => (
            item.divider ? 
              <Divider key={`divider-${index}`} /> : 
              <MenuItem 
                key={item.label}
                onClick={() => {
                  item.action();
                  handleMenuClose();
                }}
                sx={{ py: 1.5 }}
              >
                <Box sx={{ mr: 1.5 }}>{item.icon}</Box>
                {item.label}
              </MenuItem>
          ))}
        </Menu>

        {/* Menú Mobile */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              width: '80%',
              maxWidth: 300,
              mt: 1.5,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
            },
          }}
        >
          {navItems.map((item) => (
            <MenuItem 
              key={item.path}
              component={Link}
              to={item.path}
              onClick={handleMenuClose}
              selected={location.pathname === item.path}
              sx={{
                py: 1.5,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.action.selected,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover
                  }
                }
              }}
            >
              <Box sx={{ mr: 1.5 }}>{item.icon}</Box>
              {item.badge ? (
                <Badge badgeContent={item.badge} color="error" sx={{ mr: 1 }}>
                  {item.label}
                </Badge>
              ) : item.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;