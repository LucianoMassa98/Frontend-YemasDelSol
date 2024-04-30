import { LinkCard } from "../../common/linkcard";
import ArticleIcon from "@mui/icons-material/Article";
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
  console.log(loggeduser, "usuarioobtenido");

  Loader("production")

  return (
    <div className="pmenucontainer">
      <Menuheader />
      <div>
        <h1>Producción</h1>
        <h2>Bienvenido, {loggeduser?.userName}!</h2>
        <div className="p-menu-lc">
          <LinkCard
            icon={<ArticleIcon sx={{ fontSize: "inherit" }} />}
            title="Ingreso"
            href="/productionmenu/ingreso"
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
            href="/productionmenu/verdetallesdeldia"
          >
            En este modulo podras gestionar los detalles del dia.
          </LinkCard>
        </div>
      </div>
    </div>
  );
};
