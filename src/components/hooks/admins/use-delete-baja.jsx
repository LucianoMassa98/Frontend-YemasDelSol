import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";

const deletebaja = async (id) => {
  const response = await api.delete(`/bajas/${id}`);
  return response.data;
};

export const useDeletebaja = () => {
  const mutationFn = (id) => {
    return deletebaja(id);
  };

  return useMutation({
    mutationFn,
  });
};
