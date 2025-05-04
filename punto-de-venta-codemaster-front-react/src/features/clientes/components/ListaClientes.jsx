import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip,
  Typography,
  Box,
  IconButton,
  Tooltip,
  useTheme,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  Person as PersonIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { useClientes } from '../context/ClientesContext';

const ListaClientes = ({ tipo }) => {
  const theme = useTheme();
  
  // 1. Manejo seguro del contexto con valores por defecto
  const { clientes = [], loading = false, error = null } = useClientes() || {};

  // 2. Estados de carga y error
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error al cargar clientes: {error.message}
      </Alert>
    );
  }

  // 3. Filtrado seguro de clientes
  const clientesFiltrados = tipo 
    ? clientes.filter(cliente => cliente.tipo === tipo)
    : clientes;

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="lista de clientes">
          <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Documento</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Contacto</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((cliente) => (
                <TableRow 
                  key={cliente.id || Math.random().toString(36).substr(2, 9)} // 4. Key fallback
                  hover
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: theme.palette.action.hover }
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {cliente.tipo === 'persona' ? (
                        <PersonIcon color="primary" />
                      ) : (
                        <BusinessIcon color="secondary" />
                      )}
                      <Typography variant="body1">
                        {cliente.tipo === 'persona' 
                          ? `${cliente.nombres || ''} ${cliente.apellidos || ''}`.trim()
                          : cliente.razonSocial || ''}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={cliente.tipo === 'persona' ? 'Persona Natural' : 'Empresa'}
                      color={cliente.tipo === 'persona' ? 'primary' : 'secondary'}
                      variant="outlined"
                      sx={{ 
                        fontWeight: 'medium',
                        borderRadius: 1
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                      {cliente.tipo === 'persona' ? cliente.dni || '' : cliente.ruc || ''}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon fontSize="small" color="action" />
                      <Typography variant="body2" sx={{ mr: 2 }}>
                        {cliente.telefono || 'N/A'}
                      </Typography>
                      {cliente.email && (
                        <>
                          <EmailIcon fontSize="small" color="action" />
                          <Typography variant="body2">
                            {cliente.email}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Más opciones">
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="textSecondary">
                    {clientes.length === 0 ? 'No hay clientes registrados' : 'No se encontraron clientes con este filtro'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ListaClientes;