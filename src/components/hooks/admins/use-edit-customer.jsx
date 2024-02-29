import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../services/api";

const editcustomer = async (id, user) => {
  const response = await api.patch(`/customers/${id}`, user);
  return response.data;
};

export const useEditcustomer = () => {
  const queryClient = useQueryClient();

  const mutationFn = (user) => {
    let id = user[0];
    let objeto = user[1];
    return editcustomer(id, objeto);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getusers"] }),
  });
};
