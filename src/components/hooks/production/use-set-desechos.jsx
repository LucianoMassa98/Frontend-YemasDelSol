import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";

const setdesechos = async (desechos) => {
  const response = await api.post("/desechos", desechos);
  return response.data;
};

export const useSetdesechos = () => {
  const mutationFn = (desechos) => {
    return setdesechos(desechos);
  };

  return useMutation({
    mutationFn,
  });
};
