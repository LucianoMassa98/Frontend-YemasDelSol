import "./menuheader.css";
import { useState } from "react";
import { RightDrawer } from "./drawers/right-drawer";
import { useStore } from "../store/use-store";
import { Loader } from "../pages/login/loader";
import { Link } from "react-router-dom";
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

            <div>
              {loggedUser && loggedUser.roleId === 1 && (
                <>
                  <div className="menu-container-main">
                    <div className="menu-container">
                      <Link to="/adminmenu/production" color="inherit" underline="none">
                        <h4>  <HardwareIcon />Produccion</h4>

                      </Link>
                    </div>

                    <div className="menu-container">
                      <Link to="/adminmenu/users" color="inherit" underline="none">
                        <h4 > <GroupIcon />Usuarios</h4>

                      </Link>
                    </div>
                  
                    <div className="menu-container">
                      <Link to="/adminmenu/galpones" color="inherit" underline="none">
                        <h4 ><WarehouseIcon />Galpones</h4>

                      </Link>
                    </div>
                    <div className="burgeroptions">
                      <p className="burgeroption" onClick={() => logout()}>
                        Cerrar sesión
                      </p>
                      <div className="border-line"></div>

                      <p className="burgeroption">Soporte</p>
                      <div className="border-line"></div>
                    </div>

                  </div>

                </>
              )}
            </div>
      
          </div>}
      </div>
    </>
  );
};
