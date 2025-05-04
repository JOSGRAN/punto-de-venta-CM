import axios from '../../../api/axios';

export const getVentas = async () => {
  const response = await axios.get('/ventas');
  return response.data;
};

export const createVenta = async (ventaData) => {
  const response = await axios.post('/ventas', ventaData);
  return response.data;
};

export const deleteVenta = async (id) => {
  await axios.delete(`/ventas/${id}`);
};