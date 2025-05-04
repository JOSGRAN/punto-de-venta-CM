import { Container, Typography } from '@mui/material';
import ClienteForm from '../components/ClienteForm';

const NuevoClientePage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Nuevo Cliente
      </Typography>
      <ClienteForm />
    </Container>
  );
};

export default NuevoClientePage;