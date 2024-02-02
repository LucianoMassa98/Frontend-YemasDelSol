import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";

const editproduct = async (cantidad) => {
  let producto = { cnt: cantidad[1] };
  const response = await api.patch(`/productos/${cantidad[0]}`, producto);
  return response.data;
};

export const useEditproduct = () => {
  const queryClient = useQueryClient();
  const mutationFn = (cantidad) => {
    return editproduct(cantidad);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
};
