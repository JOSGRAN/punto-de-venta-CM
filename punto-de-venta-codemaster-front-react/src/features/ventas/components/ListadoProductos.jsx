import { useState } from 'react';
import { 
  Grid, 
  TextField, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Box,
  Chip,
  Avatar
} from '@mui/material';
import { Search, AddShoppingCart, LocalGroceryStore, LocalBar, LocalDrink, Kitchen } from '@mui/icons-material';

// Datos de ejemplo con imágenes (puedes reemplazar con tus propias URLs)
const productosEjemplo = [
    // Frutas Premium
    { 
      id: 1, 
      nombre: 'Manzana Royal Gala', 
      precio: 4.20, 
      stock: 25, 
      categoria: 'frutas',
      descripcion: 'Manzanas crujientes importadas de Chile',
      imagen: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      marca: 'Dole'
    },
    { 
      id: 2, 
      nombre: 'Plátano Cavendish', 
      precio: 3.20, 
      stock: 18, 
      categoria: 'frutas',
      descripcion: 'Plátanos de primera calidad',
      imagen: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      marca: 'Chiquita'
    },
    
    // Verduras Premium
    { 
      id: 3, 
      nombre: 'Zanahoria Baby', 
      precio: 5.80, 
      stock: 30, 
      categoria: 'verduras',
      descripcion: 'Zanahorias tiernas y dulces',
      imagen: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      marca: 'Grimmway Farms'
    },
    { 
      id: 4, 
      nombre: 'Tomate Cherry', 
      precio: 7.50, 
      stock: 15, 
      categoria: 'verduras',
      descripcion: 'Tomates cherry dulces y jugosos',
      imagen: 'https://images.unsplash.com/photo-1594282418426-62d45b5e50c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      marca: 'NatureSweet'
    },
    
    // Lácteos de marca
    { 
      id: 5, 
      nombre: 'Leche Gloria Entera', 
      precio: 6.20, 
      stock: 12, 
      categoria: 'lacteos',
      descripcion: 'Leche entera en caja 1L',
      imagen: 'https://www.gloria.com.pe/wp-content/uploads/2022/03/Leche-Gloria-Entera-1L.png',
      marca: 'Gloria'
    },
    { 
      id: 6, 
      nombre: 'Queso Laive Parmesano', 
      precio: 12.80, 
      stock: 8, 
      categoria: 'lacteos',
      descripcion: 'Queso parmesano en cuña 200g',
      imagen: 'https://laive.com.pe/wp-content/uploads/2021/05/parmesano.png',
      marca: 'Laive'
    },
    
    // Bebidas de marca reconocida
    { 
      id: 7, 
      nombre: 'Agua San Luis', 
      precio: 2.50, 
      stock: 40, 
      categoria: 'bebidas',
      descripcion: 'Agua mineral sin gas 625ml',
      imagen: 'https://www.agua.sanluis.com.pe/sites/default/files/styles/productos_destacados/public/2022-01/San-Luis-Sin-Gas-625ml.png',
      marca: 'San Luis'
    },
    { 
      id: 8, 
      nombre: 'Coca-Cola Original', 
      precio: 4.50, 
      stock: 10, 
      categoria: 'bebidas',
      descripcion: 'Refresco de cola 500ml',
      imagen: 'https://www.coca-cola.com/content/dam/onexp/pe/es/brands/coca-cola/pe-brand-coca-cola-original-500ml-desc-top.png',
      marca: 'Coca-Cola'
    },
    { 
      id: 9, 
      nombre: 'Inka Kola', 
      precio: 4.00, 
      stock: 15, 
      categoria: 'bebidas',
      descripcion: 'Refresco sabor a hierba luisa 500ml',
      imagen: 'https://jumbo.vtexassets.com/arquivos/ids/218171/Inka-Kola-500-ml-1-10122.jpg',
      marca: 'Inka Kola'
    },
    { 
      id: 10, 
      nombre: 'Yogurt Gloria Light', 
      precio: 3.80, 
      stock: 20, 
      categoria: 'lacteos',
      descripcion: 'Yogurt light sabor a fresa 1kg',
      imagen: 'https://www.gloria.com.pe/wp-content/uploads/2022/03/Yogurt-Light-Frutilla-1K.png',
      marca: 'Gloria'
    }
  ];

// Íconos para categorías
const categorias = [
  { id: 'todos', nombre: 'Todos', icono: <LocalGroceryStore /> },
  { id: 'frutas', nombre: 'Frutas', icono: <Kitchen /> },
  { id: 'verduras', nombre: 'Verduras', icono: <Kitchen /> },
  { id: 'lacteos', nombre: 'Lácteos', icono: <LocalDrink /> },
  { id: 'bebidas', nombre: 'Bebidas', icono: <LocalBar /> }
];

export const ListadoProductos = ({ onAddProducto }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');

  const productosFiltrados = productosEjemplo.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoriaSeleccionada === 'todos' || producto.categoria === categoriaSeleccionada)
  );

  return (
    <Box>
      {/* Barra de búsqueda */}
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Buscar productos..."
        InputProps={{
          startAdornment: <Search color="action" />,
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      
      {/* Filtros por categoría */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3, overflowX: 'auto', py: 1 }}>
        {categorias.map((categoria) => (
          <Chip
            key={categoria.id}
            icon={categoria.icono}
            label={categoria.nombre}
            onClick={() => setCategoriaSeleccionada(categoria.id)}
            color={categoriaSeleccionada === categoria.id ? 'primary' : 'default'}
            variant={categoriaSeleccionada === categoria.id ? 'filled' : 'outlined'}
            sx={{ 
              px: 1,
              '& .MuiChip-icon': { 
                color: categoriaSeleccionada === categoria.id ? 'white' : 'inherit' 
              }
            }}
          />
        ))}
      </Box>

      {/* Listado de productos */}
      <Grid container spacing={2}>
        {productosFiltrados.map((producto) => (
          <Grid item xs={6} sm={4} md={3} key={producto.id}>
            <Card 
              variant="outlined"
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 2
                }
              }}
            >
              <Box 
                sx={{ 
                  height: 120,
                  backgroundImage: `url(${producto.imagen})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
              >
                <Chip
                  label={`Stock: ${producto.stock}`}
                  size="small"
                  sx={{ 
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white'
                  }}
                />
              </Box>
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="subtitle1" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {producto.nombre}
                </Typography>
                
                <Typography 
                  variant="h6" 
                  color="primary" 
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  S/. {producto.precio.toFixed(2)}
                </Typography>
              </CardContent>
              
              <Box sx={{ p: 1 }}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddShoppingCart />}
                  onClick={() => onAddProducto(producto)}
                  disabled={producto.stock <= 0}
                  fullWidth
                  sx={{ 
                    borderRadius: 1,
                    textTransform: 'none'
                  }}
                >
                  Agregar al carrito
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {productosFiltrados.length === 0 && (
        <Typography 
          variant="body1" 
          color="textSecondary"
          sx={{ 
            textAlign: 'center',
            py: 4,
            fontStyle: 'italic'
          }}
        >
          No se encontraron productos
        </Typography>
      )}
    </Box>
  );
};