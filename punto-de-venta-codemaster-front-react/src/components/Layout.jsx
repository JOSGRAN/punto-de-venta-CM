import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Container, Box, useTheme } from '@mui/material';

const Layout = () => {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.palette.grey[50] }}>
      <Navbar />
      <Container 
        maxWidth="lg"
        component="main"
        sx={{ 
          pt: 4,
          pb: 8,
          minHeight: 'calc(100vh - 64px)' // Ajusta según altura de tu Navbar
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;