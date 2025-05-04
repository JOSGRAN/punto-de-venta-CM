import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Typography,
  Box,
  Skeleton,
  Chip,
  Tooltip,
  useTheme
} from '@mui/material';
import { Edit, Delete, AddCircle } from '@mui/icons-material';
import { useCategorias } from '../context/CategoriaContext';
import { styled } from '@mui/material/styles';

// Componente de título estilizado
const TableTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.5px',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1)
}));

// Estilos personalizados para la tabla
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    transform: 'scale(1.01)',
    transition: 'all 0.2s ease-in-out'
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 500,
  '&.MuiTableCell-head': {
    fontWeight: 600,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  }
}));

const CategoriaList = ({ onEdit, onDelete, onAdd }) => {
  const { categorias, loading, error } = useCategorias();
  const theme = useTheme();

  if (error) return (
    <Box sx={{ 
      p: 3, 
      backgroundColor: theme.palette.error.light, 
      borderRadius: 1,
      color: theme.palette.error.contrastText
    }}>
      <Typography variant="body1">{error}</Typography>
    </Box>
  );

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TableTitle variant="h5">
          Listado de Categorías
          {categorias.length > 0 && (
            <Chip 
              label={`${categorias.length} ${categorias.length === 1 ? 'categoría' : 'categorías'}`} 
              size="small" 
              color="primary"
              variant="outlined"
            />
          )}
        </TableTitle>
        
        <Tooltip title="Agregar nueva categoría">
          <IconButton 
            color="primary" 
            onClick={onAdd}
            sx={{ 
              backgroundColor: theme.palette.primary.light,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            <AddCircle fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de categorías">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Descripción</StyledTableCell>
              <StyledTableCell>Fecha Creación</StyledTableCell>
              <StyledTableCell align="center">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              [...Array(5)].map((_, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell><Skeleton animation="wave" /></StyledTableCell>
                  <StyledTableCell><Skeleton animation="wave" /></StyledTableCell>
                  <StyledTableCell><Skeleton animation="wave" width="60%" /></StyledTableCell>
                  <StyledTableCell><Skeleton animation="wave" width="80%" /></StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              categorias.map((categoria) => (
                <StyledTableRow key={categoria._id} hover>
                  <StyledTableCell sx={{ fontWeight: 600 }}>
                    {categoria.nombre}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {categoria.descripcion || 'Sin descripción'}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Chip 
                      label={new Date(categoria.date_created).toLocaleDateString()} 
                      size="small" 
                      variant="outlined"
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Tooltip title="Editar categoría">
                        <IconButton 
                          onClick={() => onEdit(categoria)}
                          sx={{ 
                            color: theme.palette.info.main,
                            '&:hover': {
                              backgroundColor: theme.palette.info.light
                            }
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar categoría">
                        <IconButton 
                          onClick={() => onDelete(categoria._id)}
                          sx={{ 
                            color: theme.palette.error.main,
                            '&:hover': {
                              backgroundColor: theme.palette.error.light
                            }
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!loading && categorias.length === 0 && (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="textSecondary">
            No se encontraron categorías. Crea una nueva para comenzar.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default CategoriaList;