import "./menuheader.css";
import { useState } from "react";
import { RightDrawer } from "./drawers/right-drawer";
import { useStore } from "../store/use-store";
import { Loader } from "../pages/login/loader";
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { LinkCard } from "../common/linkcard";
import GroupIcon from "@mui/icons-material/Group";
import HardwareIcon from "@mui/icons-material/Hardware";
import WarehouseIcon from "@mui/icons-material/Warehouse";



export const Menuheader = () => {
  const [isopen, setIsopen] = useState(false);


  const logout = useStore((state) => state.doLogout);
  const loggeduser = useStore((state) => state.user);
  const loggedUser = useStore((state) => state.user);

  const [menuVisible, setMenuVisible] = useState(false);


  Loader("admin");
  return (
    <>
      <div className="home">
        <div className="menu-hamburguer"
          onClick={() => setMenuVisible(!menuVisible)}
        >
          &#9776;
        </div>

        <div className="menu-img">
          <img src="yemaslogo.jpeg" width={56} height={56} />
        </div>
      </div>
      <div>
        {menuVisible &&
          <div className="menu-desplegable">

            <p>  <div>
              {loggedUser && loggedUser.roleId === 1 && (
                <>
                  <div className="menu-link-desplegable">
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
                </>
              )}
            </div>
            </p>
            </div>}
      </div>
    </>
  );
};
