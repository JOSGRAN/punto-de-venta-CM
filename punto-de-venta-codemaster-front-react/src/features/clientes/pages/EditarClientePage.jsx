import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import ClienteForm from '../components/ClienteForm';

const EditarClientePage = () => {
  const { id } = useParams();
  
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Editar Cliente #{id}
      </Typography>
      <ClienteForm esEdicion={true} idCliente={id} />
    </Container>
  );
};

export default EditarClientePage;