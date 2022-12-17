import { useQuery, useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import api from '../api/granada-api';

// X. Obtener Usuarios
export const useGetUsuarios = () => {
  return useQuery('usuarios', () => api.get('/admin/usuarios'), {
    refetchOnWindowFocus: false,
    retry: false,
  });
};

// X. Obtener Usuario
export const useGetUsuario = (enabled = true, id, onError = null) => {
  return useQuery(['usuario', id], () => api.get(`/admin/usuarios/${id}`), {
    enabled,
    refetchOnWindowFocus: false,
    retry: false,
    onError,
  });
};

// X. Actualziar Usuario
export const usePutUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }) => api.put(`/admin/usuarios/${id}`, data), {
    // Tradicional
    onSuccess: (data) => {
      queryClient.invalidateQueries(['usuario', `${data.data._id}`]);
      toast.success('Usuario actualizado.');
    },
    onError: (error) => {
      toast.error('No fue posible actualizar al usuario.');
    },
  });
};

// X. Suspender Usuario
export const useSuspender = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => api.post(`/admin/suspender/${id}`), {
    // Tradicional
    onSuccess: (data) => {
      queryClient.invalidateQueries('usuarios');
      toast.success('Usuario suspendido.');
    },
    onError: (error) => {
      toast.error('No fue posible suspender al usuario.');
    },
  });
};

// X. Restablecer Usuario
export const useRestablecer = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => api.post(`/admin/restablecer/${id}`), {
    // Tradicional
    onSuccess: (data) => {
      queryClient.invalidateQueries('usuarios');
      toast.success('Usuario restablecido.');
    },
    onError: (error) => {
      toast.error('No fue posible restablecer al usuario.');
    },
  });
};

// X. Obtener Sesiones
export const useGetSesiones = (enabled = true) => {
  return useQuery('sesiones', () => api.get('/admin/sesiones'), {
    enabled,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

// X. Eliminar Sesión
export const useEliminar = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => api.delete(`/admin/sesiones/${id}`), {
    // Tradicional
    onSuccess: (data) => {
      queryClient.invalidateQueries('sesiones');
      toast.success('Sesión eliminada.');
    },
    onError: (error) => {
      toast.error('No fue posible eliminar la sesión.');
    },
  });
};
