import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";

const getinformedetalles = async (desde, hasta) => {
  const response = await api.get(
    `/informes/detalles?fechaDesde=${desde}&fechaHasta=${hasta}`
  );
  return response.data;
};

export const useGetinformedetalles = () => {
  const mutationFn = (fechas) => {
    let desde = fechas[0];
    let hasta = fechas[1];
    return getinformedetalles(desde, hasta);
  };

  return useMutation({
    mutationFn,
  });
};
