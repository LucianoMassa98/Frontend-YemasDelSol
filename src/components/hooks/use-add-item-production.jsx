import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";

const additem = async (item) => {
  const response = await api.post("/remitosProduccion/addItem", item);
  return response.data;
};

export const useAdditem = () => {
  const mutationFn = (item) => {
    return additem(item);
  };

  return useMutation({ mutationFn });
};
