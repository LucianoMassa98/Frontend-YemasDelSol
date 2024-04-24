import "./menuheader.css";
import { useState } from "react";
import { useStore } from "../store/use-store";
import { Link } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import HardwareIcon from "@mui/icons-material/Hardware";
import WarehouseIcon from "@mui/icons-material/Warehouse";



export const Menuheader = () => {



  const logout = useStore((state) => state.doLogout);
  const loggedUser = useStore((state) => state.user);

  const [menuVisible, setMenuVisible] = useState(false);


  
  return (
    <>
      <div className="home">
        <div className="menu-hamburguer"
          onClick={() => setMenuVisible(!menuVisible)}
        >
          &#9776;
        </div>
        
        <div className="menu-img">
          <img src="../public/yemaslogo.jpeg"  className="img-logo"/>
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
            <div>
              {loggedUser && loggedUser.roleId === 2 && (
                <>
                  <div className="menu-container-main">
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
