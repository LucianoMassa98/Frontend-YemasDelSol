import { useQuery } from "@tanstack/react-query";
import { api } from "../../../services/api";

const getallusers = async () => {
  const response = await api.get("/usuarios");
  return response.data;
};

export const useGetallusers = () => {
  return useQuery({
    queryKey: ["getusers"],
    queryFn: () => getallusers(),
  });
};
