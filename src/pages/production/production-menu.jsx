import { LinkCard } from "../../common/linkcard";
import ArticleIcon from "@mui/icons-material/Article";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import WarehouseIcon from "@mui/icons-material/Warehouse";
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
        </div>
      </div>
    </div>
  );
};
