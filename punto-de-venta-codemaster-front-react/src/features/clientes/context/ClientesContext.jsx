import { createContext, useContext, useState, useMemo } from 'react';

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [tipoCliente, setTipoCliente] = useState('persona'); // 'persona' o 'empresa'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const agregarCliente = (cliente) => {
    try {
      setLoading(true);
      // Simulamos una pequeña demora para operación asíncrona
      setTimeout(() => {
        setClientes(prev => [...prev, { ...cliente, tipo: tipoCliente, id: Date.now() }]);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const value = useMemo(() => ({
    clientes,
    tipoCliente,
    setTipoCliente,
    agregarCliente,
    loading,
    error
  }), [clientes, tipoCliente, loading, error]);

  return (
    <ClientesContext.Provider value={value}>
      {children}
    </ClientesContext.Provider>
  );
};

export const useClientes = () => {
  const context = useContext(ClientesContext);
  if (!context) {
    throw new Error('useClientes debe usarse dentro de ClientesProvider');
  }
  return context;
};