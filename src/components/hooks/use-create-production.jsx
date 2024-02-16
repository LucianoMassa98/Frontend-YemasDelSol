import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";

const newproduction = async (userid) => {
  const response = await api.post("/remitosProduccion", userid);
  return response.data;
};

export const useNewproduction = () => {
  const mutationFn = (userid) => {
    return newproduction(userid);
  };

  return useMutation({
    mutationFn,
  });
};
