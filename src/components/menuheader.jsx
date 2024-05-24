import "./menuheader.css";
import React, { useEffect, useState } from "react"; // Importa useEffect de React
import { useStore } from "../store/use-store";
import { useNavigate } from "react-router-dom";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Loader } from "../pages/login/loader";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useLocation } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';




export const Menuheader = () => {
  const logout = useStore((state) => state.doLogout);
  const loggedUser = useStore((state) => state.user);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  
  useEffect(() => {
    if (loggedUser === null) {
      navigate("/login");
    }
  }, []);



  //Para el menuheader dinamico
  const location = useLocation();
  const isAdminPage = location.pathname === "/adminmenu";

  return (
    <>
      <Loader />
      {loggedUser && loggedUser.roleId === 1 && (
        <>
          <div className="menu-horizontal">
            <div className="menu-horizontal-no">
              <h2 className="menuheader-h2">
                {" "}
                Hola {loggedUser?.userName}!
                <AccountCircleOutlinedIcon />
              </h2>
              <p className="subtitulo-2">administracion</p>
            </div>
          </div>

          <div className="menu-desplegable">
          <div className={isAdminPage ? "menu-container-main" : "menu-horizontal-2"}>
                
              <div className={isAdminPage ? "contenedor-img" : "contenedor-img-2"}>
                <img src="/yemaslogo.jpeg" className="img-logo"/>
              </div>
              <div className={`${isAdminPage ? "burgeroptions" : "burgeroptions-2"} `}>
                <p className="burgeroption">
                  <SettingsOutlinedIcon />
                </p>
                <p className="burgeroption">
                  <SupportAgentOutlinedIcon />
                </p>
                <p className="burgeroption" onClick={logout}>
                  <LogoutOutlinedIcon />
                </p>
              </div>
            {/*Para el menu hambuerguesa*/}
           
            </div>
          </div>
        </>
      )}
      {loggedUser && loggedUser.roleId === 2 && (
        <>
          <div className="menu-produccion">
            <div className="logo-produccion">
              <img src="/yemaslogo.jpeg" className="img-logo" />
            </div>
            <div className="menu-iconos">
              <p className="burgeroption-produccion">
                <SettingsOutlinedIcon style={{ fontSize: 28 }} />
              </p>
              <p className="burgeroption-produccion">
                <SupportAgentOutlinedIcon style={{ fontSize: 28 }} />
              </p>
              <p className="burgeroption-produccion" onClick={logout}>
                <LogoutOutlinedIcon style={{ fontSize: 28 }} />
              </p>
            </div>
          </div>
        </>
      )}
      {loggedUser && loggedUser.roleId === 3 && (
      <>
      <div></div>
      <div className="home-ventas">
        <div className="texto-ventas">
          <img src="./yemaslogo.jpeg" width={70} height={70} className="logo-ventas" />
          <div className="texto-ventas-2">
            <p className="h1-ventas">Hola {loggedUser?.userName}</p>
          </div>
        </div>
        
          <div className="burgeroptions-ventas">
            <p className="burgeroption-ventas">
              <SettingsOutlinedIcon fontSize="large" />
            </p>
            <p className="burgeroption-ventas">
              <SupportAgentOutlinedIcon fontSize="large" />
            </p>
            <p className="burgeroption-ventas-2" onClick={logout}>
              <LogoutOutlinedIcon fontSize="large"  />
            </p>
          </div>
       
      </div>

      </>
      )}
    </>
  );
};
