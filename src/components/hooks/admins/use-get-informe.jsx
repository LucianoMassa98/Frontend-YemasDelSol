import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";

const getinforme = async (desde, hasta) => {
  const response = await api.get(
    `/informes/?fechaDesde=${desde}&fechaHasta=${hasta}`
  );
  return response.data;
};

export const useGetinforme = () => {
  const mutationFn = (fechas) => {
    let desde = fechas[0];
    let hasta = fechas[1];
    return getinforme(desde, hasta);
  };

  return useMutation({
    mutationFn,
  });
};
