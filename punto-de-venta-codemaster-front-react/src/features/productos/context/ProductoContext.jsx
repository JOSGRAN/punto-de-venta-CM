import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getProductos, 
  createProducto, 
  updateProducto, 
  deleteProducto 
} from '../services/productoService';

const ProductoContext = createContext();

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const data = await getProductos();
      setProductos(data);
      setError(null);
    } catch (err) {
      setError(err.error || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const addProducto = async (producto) => {
    try {
      const newProducto = await createProducto(producto);
      setProductos([...productos, newProducto]);
      return newProducto;
    } catch (err) {
      throw err;
    }
  };

const editProducto = async (id, producto) => {
  try {
    // Convertir a FormData si hay imagen
    let productoData;
    if (producto.imagen && typeof producto.imagen !== 'string') {
      productoData = new FormData();
      Object.keys(producto).forEach(key => {
        if (key === 'caracteristicas') {
          productoData.append(key, JSON.stringify(producto[key]));
        } else if (key !== 'imagenPreview') {
          productoData.append(key, producto[key]);
        }
      });
      if (producto.imagen) {
        productoData.append('imagen', producto.imagen);
      }
    } else {
      productoData = producto;
    }

    const updatedProducto = await updateProducto(id, productoData);
    setProductos(prev => prev.map(p => p._id === id ? updatedProducto : p));
    return updatedProducto;
  } catch (err) {
    console.error('Error en editProducto:', err);
    setError(err.message || 'Error al actualizar producto');
    throw err;
  }
};

  const removeProducto = async (id) => {
    try {
      await deleteProducto(id);
      setProductos(productos.filter(prod => prod._id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <ProductoContext.Provider
      value={{
        productos,
        loading,
        error,
        addProducto,
        editProducto,
        removeProducto,
        fetchProductos
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};

export const useProductos = () => useContext(ProductoContext);