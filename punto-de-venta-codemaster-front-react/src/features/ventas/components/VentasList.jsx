import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { useVentas } from '../context/VentasContext';

const VentasList = () => {
  const { ventas, loading } = useVentas();

  if (loading) return <CircularProgress />;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ventas.map((venta) => (
            <TableRow key={venta.id}>
              <TableCell>{venta.id}</TableCell>
              <TableCell>{venta.cliente}</TableCell>
              <TableCell>${venta.total}</TableCell>
              <TableCell>{new Date(venta.fecha).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VentasList;