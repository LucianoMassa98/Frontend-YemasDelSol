import { LinkCard } from "../../common/linkcard";
import ArticleIcon from "@mui/icons-material/Article";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import TodayIcon from "@mui/icons-material/Today";
import "./production-menu.css";
import { Menuheader } from "../../components/menuheader";

export const Productionmenu = () => {
  return (
    <div className="pmenucontainer">
      <Menuheader />
      <div>
        <h1>Producción</h1>
        <h2>hola -nombre de usuario-</h2>
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
              <WarehouseIcon sx={{ fontSize: "inherit", color: "inherit" }} />
            }
            title="Galpones"
          >
            En este modulo podras gestionar los galpones.
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
