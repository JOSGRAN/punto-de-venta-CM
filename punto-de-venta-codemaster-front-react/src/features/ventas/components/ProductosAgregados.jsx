import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box } from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';

export const ProductosAgregados = ({ productos, onRemoveProducto, onUpdateCantidad, total }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Productos en la Venta
      </Typography>
      
      {productos.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No hay productos agregados
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell align="right">Precio</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productos.map((producto) => (
                  <TableRow key={producto.id}>
                    <TableCell>{producto.nombre}</TableCell>
                    <TableCell align="right">S/.{producto.precio.toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => onUpdateCantidad(producto.id, producto.cantidad - 1)}>
                        <Remove fontSize="small" />
                      </IconButton>
                      {producto.cantidad}
                      <IconButton size="small" onClick={() => onUpdateCantidad(producto.id, producto.cantidad + 1)}>
                        <Add fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      S/.{(producto.precio * producto.cantidad).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => onRemoveProducto(producto.id)}>
                        <Delete fontSize="small" color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Typography variant="h6">
              Total: <strong>${total.toFixed(2)}</strong>
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};