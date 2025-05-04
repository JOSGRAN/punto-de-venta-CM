import { useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { ProductosAgregados } from './ProductosAgregados';
import { ListadoProductos } from './ListadoProductos';
import { TecladoNumerico } from './TecladoNumerico';
import { ClienteForm } from './ClienteForm';
import { useVentas } from '../context/VentasContext';

export const VentasForm = () => {
  const [activeTab, setActiveTab] = useState('productos');
  const [cliente, setCliente] = useState('');
  const { addVenta } = useVentas();

  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const handleFinalizarVenta = () => {
    addVenta({
      cliente,
      productos: productosSeleccionados,
      total: calcularTotal(),
      fecha: new Date().toISOString()
    });
    // Resetear el estado después de la venta
    setProductosSeleccionados([]);
    setCliente('');
  };

  const calcularTotal = () => {
    return productosSeleccionados.reduce(
      (total, producto) => total + producto.precio * producto.cantidad, 0
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Punto de Venta
      </Typography>

      <Grid container spacing={3}>
        {/* Columna izquierda - Cliente y productos agregados */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <ClienteForm 
              cliente={cliente} 
              setCliente={setCliente} 
              onAddCliente={(nuevoCliente) => setCliente(nuevoCliente)}
            />
          </Paper>

          <Paper elevation={3} sx={{ p: 2 }}>
            <ProductosAgregados 
              productos={productosSeleccionados}
              onRemoveProducto={(id) => 
                setProductosSeleccionados(productos => productos.filter(p => p.id !== id))
              }
              onUpdateCantidad={(id, cantidad) => 
                setProductosSeleccionados(productos => 
                  productos.map(p => p.id === id ? {...p, cantidad} : p)
                )
              }
              total={calcularTotal()}
            />
          </Paper>
        </Grid>

        {/* Columna derecha - Listado de productos y teclado */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <ListadoProductos 
              onAddProducto={(producto) => {
                const existente = productosSeleccionados.find(p => p.id === producto.id);
                if (existente) {
                  setProductosSeleccionados(productos => 
                    productos.map(p => 
                      p.id === producto.id ? {...p, cantidad: p.cantidad + 1} : p
                    )
                  );
                } else {
                  setProductosSeleccionados([...productosSeleccionados, {...producto, cantidad: 1}]);
                }
              }}
            />
          </Paper>

          <Paper elevation={3} sx={{ p: 2 }}>
            <TecladoNumerico 
              onAddToCurrent={(value) => {
                // Lógica para manejar entrada numérica
                console.log('Valor ingresado:', value);
              }}
              onFinalizarVenta={handleFinalizarVenta}
              disabled={productosSeleccionados.length === 0}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VentasForm;