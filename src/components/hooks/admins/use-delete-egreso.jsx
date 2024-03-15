import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";

const deleteegreso = async (id) => {
  const response = await api.delete(`/remitosProduccion/${id}`);
  return response.data;
};

export const useDeleteegreso = () => {
  const mutationFn = (id) => {
    return deleteegreso(id);
  };

  return useMutation({
    mutationFn,
  });
};
