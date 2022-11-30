import { useQuery } from 'react-query';
import api from '../api/granada-api';

// 1. Get Sugerido PT
const getSugeridoPT = (produccion, stock, bodegas) => {
  return api.get(
    `/reportes/produccion/sugerido-pt?produccion=${produccion}&stock=${stock}&bodegas=${bodegas}`
  );
};

export const useGetSugeridoPT = (
  enabled = true,
  produccion,
  stock,
  bodegas,
  onSuccess = null,
  onError = null
) => {
  return useQuery(
    'sugeridoPT',
    () => getSugeridoPT(produccion, stock, bodegas),
    {
      enabled,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess,
      onError,
      retry: false,
    }
  );
};
