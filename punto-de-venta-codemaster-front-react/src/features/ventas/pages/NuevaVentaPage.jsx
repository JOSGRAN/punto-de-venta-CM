import { Container, Typography } from '@mui/material';
import VentasForm from '../components/VentasForm';

const NuevaVentaPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Nueva Venta
      </Typography>
      <VentasForm />
    </Container>
  );
};
export default NuevaVentaPage;