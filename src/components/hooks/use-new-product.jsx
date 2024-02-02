import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";

const newproduct = async (producto) => {
  const response = await api.post("/productos", producto);
  return response.data;
};

export const useNewproduct = () => {
  const mutationFn = (product) => {
    return newproduct(product);
  };

  return useMutation({ mutationFn });
};
