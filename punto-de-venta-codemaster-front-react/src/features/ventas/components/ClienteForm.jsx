import { useState } from 'react';
import { Autocomplete, TextField, Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Add, PersonSearch } from '@mui/icons-material';

// Datos de ejemplo - reemplazar con tu fuente real de datos
const clientesEjemplo = [
  { id: 1, nombre: 'Cliente 1', documento: '12345678' },
  { id: 2, nombre: 'Cliente 2', documento: '87654321' },
  // ... más clientes
];

export const ClienteForm = ({ cliente, setCliente, onAddCliente }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    documento: ''
  });

  const handleAddCliente = () => {
    const cliente = {
      ...nuevoCliente,
      id: Date.now() // ID temporal
    };
    onAddCliente(cliente);
    setOpenDialog(false);
    setNuevoCliente({ nombre: '', documento: '' });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Cliente
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Autocomplete
          options={clientesEjemplo}
          getOptionLabel={(option) => `${option.nombre} (${option.documento})`}
          fullWidth
          value={cliente ? clientesEjemplo.find(c => c.id === cliente.id) || null : null}
          onChange={(_, newValue) => setCliente(newValue)}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="Buscar cliente" 
              InputProps={{
                ...params.InputProps,
                startAdornment: <PersonSearch color="action" />,
              }}
            />
          )}
        />
        
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Nuevo
        </Button>
      </Box>

      {/* Dialog para agregar nuevo cliente */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Agregar Nuevo Cliente</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Nombre completo"
              value={nuevoCliente.nombre}
              onChange={(e) => setNuevoCliente({...nuevoCliente, nombre: e.target.value})}
              fullWidth
            />
            <TextField
              label="Documento"
              value={nuevoCliente.documento}
              onChange={(e) => setNuevoCliente({...nuevoCliente, documento: e.target.value})}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button 
            onClick={handleAddCliente}
            disabled={!nuevoCliente.nombre || !nuevoCliente.documento}
            variant="contained"
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};