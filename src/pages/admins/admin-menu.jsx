import { LinkCard } from "../../common/linkcard";
import GroupIcon from "@mui/icons-material/Group";
import HardwareIcon from "@mui/icons-material/Hardware";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import "./admin-menu.css";
import { Menuheader } from "../../components/menuheader";
import { useStore } from "../../store/use-store";
import { Loader } from "../login/loader";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Adminmenu = () => {

  Loader("admin")

  return (
    <div className="amenucontainer">
      <Menuheader />
      <div>
       
        <div className="a-menu-lc">
          <LinkCard
            icon={<HardwareIcon sx={{ fontSize: "inherit" }} />}
            title="Producción"
            href="/adminmenu/production"
          >
            En este moódulo podras monitorear las operaciones que ocurren dentro
            del area de producción.
          </LinkCard>
          <LinkCard
            icon={<AccountCircleIcon  sx={{ fontSize: "inherit" }} />}
            title="Usuarios"
            href="/adminmenu/users"
          >
            Lorem ipsum dolor sit amet Consectetur adipiscing elit Ut et.
          </LinkCard>
          <LinkCard
            icon={<WarehouseIcon sx={{ fontSize: "inherit" }} />}
            title="Galpones"
            href="/adminmenu/galpones"
          >
            Lorem ipsum dolor sit amet Consectetur adipiscing elit Ut et.
          </LinkCard>
        </div>
      </div>
    </div>
  );
};
