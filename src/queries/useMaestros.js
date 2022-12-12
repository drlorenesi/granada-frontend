import { useQuery } from 'react-query';
import api from '../api/granada-api';

// 1. Get Productos
export const useGetProductos = (enabled = true, tipo, estatus) => {
  return useQuery(
    'productos',
    () => api.get(`/maestros/productos?tipo=${tipo}&estatus=${estatus}`),
    {
      enabled,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};
