import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/granada-api';

// 1. Obtener Productos
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

// 2. Obtener Producto
export const useGetProducto = (id) => {
  let navigate = useNavigate();
  return useQuery(
    ['producto', id],
    () => api.get(`/maestros/productos/${id}`),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      onError: (error) => {
        if (
          error?.response?.status === 400 ||
          error?.response?.status === 404
        ) {
          navigate('/no-existe', { replace: true });
        } else {
          toast.error('No fue posible actualizar al usuario.');
        }
      },
    }
  );
};

// 3. Actualizar Producto
export const usePutProducto = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, data }) => api.put(`/maestros/productos/${id}`, data),
    {
      // Tradicional
      onSuccess: (data) => {
        queryClient.invalidateQueries(['producto', `${data.data._id}`]);
        toast.success('Usuario actualizado.');
      },
      onError: (error) => {
        toast.error('No fue posible actualizar al usuario.');
      },
    }
  );
};
