import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";

const getproducts = async () => {
  const response = await api.get("/productos");
  return response.data;
};

export const useProducts = () => {
  return useQuery({ queryKey: ["products"], queryFn: () => getproducts() });
};
