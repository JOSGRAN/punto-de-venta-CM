import { createContext, useContext, useState, useEffect } from 'react';
import { getVentas, createVenta, deleteVenta } from '../services/ventasService';

const VentasContext = createContext();

export const VentasProvider = ({ children }) => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadVentas = async () => {
    try {
      setLoading(true);
      const data = await getVentas();
      setVentas(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las ventas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addVenta = async (ventaData) => {
    try {
      const newVenta = await createVenta(ventaData);
      setVentas([...ventas, newVenta]);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Error al crear venta' };
    }
  };

  const removeVenta = async (id) => {
    try {
      await deleteVenta(id);
      setVentas(ventas.filter(v => v.id !== id));
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Error al eliminar venta' };
    }
  };

  useEffect(() => {
    loadVentas();
  }, []);

  return (
    <VentasContext.Provider value={{ 
      ventas, 
      loading, 
      error,
      addVenta, 
      removeVenta,
      refreshVentas: loadVentas
    }}>
      {children}
    </VentasContext.Provider>
  );
};

// Hook personalizado con verificación
export const useVentas = () => {
  const context = useContext(VentasContext);
  if (!context) {
    throw new Error('useVentas debe usarse dentro de un VentasProvider');
  }
  return context;
};