import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";

const deleteitemingreso = async (ingresoid, item) => {
  const response = await api.delete(
    `/remitosCompras/subItem/${ingresoid}/${item}`
  );
  return response.data;
};

export const useDeleteitemingreso = () => {
  const mutationFn = (obj) => {
    return deleteitemingreso(obj[0], obj[1]);
  };

  return useMutation({ mutationFn });
};
