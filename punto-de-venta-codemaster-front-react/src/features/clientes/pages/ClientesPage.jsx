import { Container, Typography, Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react';
import ListaClientes from '../components/ListaClientes';

const ClientesPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Gestión de Clientes
      </Typography>
      
      <Tabs value={tabValue} onChange={handleChangeTab}>
        <Tab label="Todos los Clientes" />
        <Tab label="Personas Naturales" />
        <Tab label="Empresas" />
      </Tabs>
      
      <Box sx={{ mt: 3 }}>
        <ListaClientes tipo={tabValue === 1 ? 'persona' : tabValue === 2 ? 'empresa' : null} />
      </Box>
    </Container>
  );
};

export default ClientesPage;