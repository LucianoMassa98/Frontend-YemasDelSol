import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";

const deleteitem = async (egresoid, item) => {
  const response = await api.delete(
    `/remitosProduccion/subItem/${egresoid}/${item}`
  );
  return response.data;
};

export const useDeleteitem = () => {
  const mutationFn = (obj) => {
    return deleteitem(obj[0], obj[1]);
  };

  return useMutation({ mutationFn });
};
