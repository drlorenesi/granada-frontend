import { useQuery } from 'react-query';
import api from '../api/granada-api';

// 1. Get Sugerido PT
const getSugeridoPT = (stock, produccion, bodegas) => {
  return api.get(
    `/reportes/produccion/sugerido-pt?stock=${stock}&produccion=${produccion}&bodegas=${bodegas}`
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

// 2. Get Sugerido MA
const getSugeridoMA = (tipo, stock, entrega, bodegas) => {
  return api.get(
    `/reportes/produccion/sugerido-ma?tipo=${tipo}&stock=${stock}&entrega=${entrega}&bodegas=${bodegas}`
  );
};

export const useGetSugeridoMA = (
  enabled = true,
  tipo,
  stock,
  entrega,
  bodegas,
  onSuccess = null,
  onError = null
) => {
  return useQuery(
    'sugeridoMA',
    () => getSugeridoMA(tipo, stock, entrega, bodegas),
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
