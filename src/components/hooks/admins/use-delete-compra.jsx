import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";

const deletecompra = async (id) => {
  const response = await api.delete(`/remitosCompras/${id}`);
  return response.data;
};

export const useDeletecompa = () => {
  const mutationFn = (id) => {
    return deletecompra(id);
  };

  return useMutation({
    mutationFn,
  });
};
