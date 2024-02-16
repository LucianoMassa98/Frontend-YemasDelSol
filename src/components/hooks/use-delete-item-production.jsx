import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";

const deleteitem = async (item) => {
  const response = await api.delete(`/remitosProduccion/subItem/${item}`);
  return response.data;
};

export const useDeleteitem = () => {
  const mutationFn = (obj) => {
    return deleteitem(obj);
  };

  return useMutation({ mutationFn });
};
