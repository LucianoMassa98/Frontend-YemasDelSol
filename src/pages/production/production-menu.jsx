import { LinkCard } from "../../common-produccion/linkcard-produccion";
import LoginIcon from '@mui/icons-material/Login';
import AllInboxIcon from "@mui/icons-material/AllInbox";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import TodayIcon from "@mui/icons-material/Today";
import "./production-menu.css";
import { Menuheader } from "../../components/menuheader";
import { useStore } from "../../store/use-store";
import { Loader } from "../login/loader";

export const Productionmenu = () => {
  const loggeduser = useStore((state) => state.user);


  Loader("production");

  return (
    <div className="pmenucontainer">
      <Menuheader />
      <div>
        <div className="p-menu-lc">
          <LinkCard
            icon={<LoginIcon sx={{ fontSize: "inherit" }} />}
            title="Ingreso"
            href="/productionmenu/ingreso"
            className="linkCard-produccion"
          >
            En este modulo podras ingresar los cartones vacíos.
          </LinkCard>
          <LinkCard
            icon={<AllInboxIcon sx={{ fontSize: "inherit" }} />}
            title="Producción"
            href="/productionmenu/egreso"
          >
            En este modulo podras registrar el egreso de cartones producidos.
          </LinkCard>
          <LinkCard
            icon={
              <LocalHospitalIcon
                sx={{ fontSize: "inherit", color: "inherit" }}
              />
            }
            title="Bajas"
            href="/productionmenu/bajas"
          >
            En este modulo podras gestionar las bajas en galpones.
          </LinkCard>
          <LinkCard
            icon={<DeleteIcon sx={{ fontSize: "inherit", color: "inherit" }} />}
            title="Desechos"
            href="/productionmenu/desechos"
          >
            En este modulo podras gestionar los desechos.
          </LinkCard>
          <LinkCard
            icon={<TodayIcon sx={{ fontSize: "inherit", color: "inherit" }} />}
            title="Detalles"
            type="button"
            href="/productionmenu/verdetallesdeldia"
          >
            En este modulo podras gestionar los detalles del dia.
          </LinkCard>
        </div>
      </div>
    </div>
  );
};
