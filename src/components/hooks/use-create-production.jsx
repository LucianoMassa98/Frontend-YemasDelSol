import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";

const newproduction = async (produccion) => {
  const response = await api.post("/remitosProduccion", produccion);
  return response.data;
};

export const useNewproduction = () => {
  const mutationFn = (produccion) => {
    let prod = { galponId: produccion, userId: 1 };
    return newproduction(prod);
  };

  return useMutation({ mutationFn });
};
