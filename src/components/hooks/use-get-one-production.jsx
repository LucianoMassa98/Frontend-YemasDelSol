import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";

const oneproduction = async (prodid) => {
  const response = await api.get(`/remitosProduccion/${prodid}`);
  return response.data;
};

export const useOneproduction = () => {
  const mutationFn = (prodid) => {
    return oneproduction(prodid);
  };

  return useMutation({ mutationFn });
};
