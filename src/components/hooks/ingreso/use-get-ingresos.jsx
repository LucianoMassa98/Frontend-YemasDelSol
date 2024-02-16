import { useQuery } from "@tanstack/react-query";
import { api } from "../../../services/api";

const getallingresos = async () => {
  const response = await api.get("/remitosCompras");
  return response.data;
};

export const useIngresos = () => {
  return useQuery({
    queryKey: ["getingresos"],
    queryFn: () => getallingresos(),
  });
};
