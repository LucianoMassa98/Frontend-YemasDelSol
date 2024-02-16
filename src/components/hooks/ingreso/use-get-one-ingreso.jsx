import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";

const oneingreso = async (ingrId) => {
  const response = await api.get(`/remitosCompras/${ingrId}`);
  return response.data;
};

export const useOneingreso = () => {
  const mutationFn = (ingrId) => {
    return oneingreso(ingrId);
  };

  return useMutation({ mutationFn });
};
