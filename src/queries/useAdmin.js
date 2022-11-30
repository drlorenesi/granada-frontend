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
export const useGetUsuario = (id) => {
  return useQuery(['usuario', id], () => api.get(`/admin/usuarios/${id}`), {
    refetchOnWindowFocus: false,
    retry: false,
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
