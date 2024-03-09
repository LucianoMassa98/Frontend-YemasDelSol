import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";

const setbajas = async (bajas) => {
  const response = await api.post("/bajas", bajas);
  return response.data;
};

export const useSetbajas = () => {
  const mutationFn = (bajas) => {
    return setbajas(bajas);
  };

  return useMutation({
    mutationFn,
  });
};
