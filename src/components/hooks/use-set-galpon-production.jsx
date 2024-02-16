import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";

const newprodgalpon = async (galponid, egresoid) => {
  const response = await api.patch(`/remitosProduccion/${egresoid}`, galponid);
  return response.data;
};

export const useSetgalponproduction = () => {
  const mutationFn = (data) => {
    let galpon = { galponId: data[0] };
    return newprodgalpon(galpon, data[1]);
  };

  return useMutation({
    mutationFn,
  });
};
