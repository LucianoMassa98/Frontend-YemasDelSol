import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";

const deleteitemingreso = async (item) => {
  const response = await api.delete(`/remitosCompras/subItem/${item}`);
  return response.data;
};

export const useDeleteitemingreso = () => {
  const mutationFn = (obj) => {
    return deleteitemingreso(obj);
  };

  return useMutation({ mutationFn });
};
