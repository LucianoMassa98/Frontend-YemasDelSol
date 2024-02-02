import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";

const getgalpones = async () => {
  const response = await api.get("/galpones");
  return response.data;
};

export const useGalpones = () => {
  return useQuery({ queryKey: ["galpones"], queryFn: () => getgalpones() });
};
