import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";

const deletedesecho = async (id) => {
  const response = await api.delete(`/desechos/${id}`);
  return response.data;
};

export const useDeletedesecho = () => {
  const mutationFn = (id) => {
    return deletedesecho(id);
  };

  return useMutation({
    mutationFn,
  });
};
