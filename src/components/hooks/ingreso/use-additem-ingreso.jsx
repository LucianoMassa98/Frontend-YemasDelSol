import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";

const additemingreso = async (item) => {
  const response = await api.post("/remitosCompras/addItem", item);
  return response.data;
};

export const useAdditemingreso = () => {
  const mutationFn = (item) => {
    return additemingreso(item);
  };

  return useMutation({ mutationFn });
};
