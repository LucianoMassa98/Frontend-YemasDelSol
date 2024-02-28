import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";

const edituser = async (id, user) => {
  const response = await api.patch(`/usuarios/${id}`, user);
  return response.data;
};

export const useEdituser = () => {
  const mutationFn = (user) => {
    let id = user[0];
    let objeto = user[1];
    return edituser(id, objeto);
  };

  return useMutation({
    mutationFn,
  });
};
