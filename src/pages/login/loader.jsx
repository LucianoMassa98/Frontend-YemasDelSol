import { useStore } from "../../store/use-store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const Loader = () => {
  const islogged = useStore((state) => state.isLoggedIn);
  const logoff = useStore((state) => state.doLogout);
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  const roles = ["admin , 1", "prod , 2", "centas, 4"];

  const rutasProduction = [
    "/productionmenu",
    "/productionmenu/ingreso",
    "/productionmenu/egreso",
    "/productionmenu/desechos",
    "/productionmenu/bajas",
    "/productionmenu/verdetallesdeldia",
  ];
  const rutasAdmin = [
    "/adminmenu",
    "/adminmenu/production",
    "/adminmenu/production/details",
    "/adminmenu/users",
    "/adminmenu/users/newuser",
    "/adminmenu/galpones",
  ];
  const rutasVentas = "/vendedor";
  useEffect(() => {
    let band = false;
    if (!islogged || islogged === null || user.roleId === null) {
      logoff();
      navigate("/login");
    }
    if (user && user.roleId === 1) {
      let i = 0;
      let max = rutasAdmin.length;
      while (i < max) {
        if (location.pathname == rutasAdmin[i]) {
          band = true;
        }
        i++;
      }
    }

    if (user && user.roleId === 2) {
      let i = 0;
      let max = rutasProduction.length;
      while (i < max) {
        if (location.pathname == rutasProduction[i]) {
          band = true;
        }
        i++;
      }
    }
    if (user && user.roleId === 3) {
      if (location.pathname == rutasVentas) {
        band = true;
      }
    }

    if (!band) {
      logoff();
      navigate("/login");
    }
  }, [user]);

  return <></>;
};
