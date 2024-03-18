import { useStore } from "../../store/use-store";

export const Loader = (usertype) => {
  const islogged = useStore((state) => state.isLoggedIn);
  const logoff = useStore((state) => state.doLogout);
  const user = useStore((state) => state.user);
  let usertypes = ["error", "admin", "production"];

  if (!islogged || usertype != usertypes[user.roleId]) {
    logoff();
    window.location.href = "/login";
  }
};
