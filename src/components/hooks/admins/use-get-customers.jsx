import { useQuery } from "@tanstack/react-query";
import { api } from "../../../services/api";

const getallcustomers = async () => {
  const response = await api.get("/customers");
  return response.data;
};

export const useGetallcustomers = () => {
  return useQuery({
    queryKey: ["getcustomers"],
    queryFn: () => getallcustomers(),
  });
};
