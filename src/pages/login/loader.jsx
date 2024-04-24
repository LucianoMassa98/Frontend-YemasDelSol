import { useStore } from "../../store/use-store";
import { useNavigate } from 'react-router-dom';

export const Loader = (usertype) => {
  const islogged = useStore((state) => state.isLoggedIn);
  const logoff = useStore((state) => state.doLogout);
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  let usertypes = ["error", "admin", "production"];

  if (!islogged || usertype != usertypes[user.roleId]) {
    logoff();
    navigate('/login');
  }
};
