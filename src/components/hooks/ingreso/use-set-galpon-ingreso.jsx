import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";

const newingrgalpon = async (galponid, egresoid) => {
  const response = await api.patch(`/remitosCompras/${egresoid}`, galponid);
  return response.data;
};

export const useSetgalponingreso = () => {
  const mutationFn = (data) => {
    let galpon = { galponId: data[0] };
    return newingrgalpon(galpon, data[1]);
  };

  return useMutation({
    mutationFn,
  });
};
