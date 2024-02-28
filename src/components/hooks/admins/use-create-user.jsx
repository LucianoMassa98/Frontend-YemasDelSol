import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";

const createuser = async (user) => {
  const response = await api.post("/usuarios", user);
  return response.data;
};

export const useCreateuser = () => {
  const mutationFn = (user) => {
    return createuser(user);
  };

  return useMutation({
    mutationFn,
  });
};
