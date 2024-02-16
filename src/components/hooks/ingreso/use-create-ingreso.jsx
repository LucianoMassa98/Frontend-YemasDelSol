import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";

const newingreso = async (userid) => {
  const response = await api.post("/remitosCompras", userid);
  return response.data;
};

export const useNewingreso = () => {
  const mutationFn = (userid) => {
    return newingreso(userid);
  };

  return useMutation({
    mutationFn,
  });
};
