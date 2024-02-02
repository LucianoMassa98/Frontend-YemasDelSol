import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";

const deleteproduct = async (id) => {
  const response = await api.delete(`/productos/${id}`);
  return response.data;
};

export const useDeleteproduct = () => {
  const queryClient = useQueryClient();
  const mutationFn = (id) => {
    return deleteproduct(id);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
};
