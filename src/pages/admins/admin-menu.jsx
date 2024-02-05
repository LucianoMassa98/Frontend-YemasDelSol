import { LinkCard } from "../../common/linkcard";
import GroupIcon from "@mui/icons-material/Group";
import HardwareIcon from "@mui/icons-material/Hardware";
import "./admin-menu.css";
import { Menuheader } from "../../components/menuheader";

export const Adminmenu = () => {
  return (
    <div className="amenucontainer">
      <Menuheader />
      <div>
        <h1>Administracion</h1>
        <h2>hola -nombre de usuario-</h2>
        <div className="a-menu-lc">
          <LinkCard
            icon={<HardwareIcon sx={{ fontSize: "inherit" }} />}
            title="Producción"
            href="/adminmenu/production"
          >
            En este modulo podras monitorear las operaciones que ocurren dentro
            del area de producción.
          </LinkCard>
          <LinkCard
            icon={<GroupIcon sx={{ fontSize: "inherit" }} />}
            title="Usuarios"
          >
            Lorem ipsum dolor sit amet Consectetur adipiscing elit Ut et.
          </LinkCard>
        </div>
      </div>
    </div>
  );
};
