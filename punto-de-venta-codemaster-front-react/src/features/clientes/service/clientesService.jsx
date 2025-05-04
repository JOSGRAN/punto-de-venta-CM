import axios from '../../../api/axios';

export const obtenerClientes = async (tipo = null) => {
  const params = tipo ? { tipo } : {};
  const response = await axios.get('/clientes', { params });
  return response.data;
};

export const crearCliente = async (clienteData) => {
  const response = await axios.post('/clientes', clienteData);
  return response.data;
};

export const actualizarCliente = async (id, clienteData) => {
  const response = await axios.put(`/clientes/${id}`, clienteData);
  return response.data;
};