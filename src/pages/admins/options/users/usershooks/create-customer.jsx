import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../../services/api";

const createcustomer = async (customer) => {
  const response = await api.post("/customers/", customer);
  return response.data;
};

export const useCreatecustomer = () => {
  const mutationFn = (customer) => {
    return createcustomer(customer);
  };

  return useMutation({ mutationFn });
};
