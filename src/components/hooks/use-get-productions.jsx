import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";

const getallproductions = async () => {
  const response = await api.get("/remitosProduccion");
  return response.data;
};

export const useProductions = () => {
  return useQuery({
    queryKey: ["getproductions"],
    queryFn: () => getallproductions(),
  });
};
