import { Container, Typography } from '@mui/material';
import VentasList from '../components/VentasList';

const VentasPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Historial de Ventas
      </Typography>
      <VentasList />
    </Container>
  );
};
export default VentasPage;