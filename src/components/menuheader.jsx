import "./menuheader.css";
import { useState } from "react";
import { useStore } from "../store/use-store";
import { Link } from "react-router-dom";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Loader } from "../pages/login/loader";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


export const Menuheader = () => {



  const logout = useStore((state) => state.doLogout);
  const loggedUser = useStore((state) => state.user);

  return (
    <>
      <div className="menu-horizontal">
        <div className="no">
          <h2>    Hola {loggedUser?.userName}!
            < AccountCircleOutlinedIcon  />
          </h2>
          {loggedUser && (
            <>
              {loggedUser.roleId === 1 ? (
                <p className="subtitulo-2">administracion</p>
              ) : loggedUser.roleId === 2 ? (
                <p className="subtitulo-2">Producción</p>
              ) : null}
            </>
          )}
        </div>

      </div>


      <div className="menu-desplegable">
        {loggedUser && (loggedUser.roleId === 1 || loggedUser.roleId === 2) && (
          <>
            <div className="menu-container-main">
              <div className="contenedor-img">
                <img src="../public/yemaslogo.jpeg" className="img-logo" />
              </div>

              <div className="burgeroptions">
                <p className="burgeroption">
                  <SettingsOutlinedIcon />
                </p>
                <p className="burgeroption">
                  <SupportAgentOutlinedIcon />
                </p>
                <p className="burgeroption-2" onClick={() => logout()}>
                  <LogoutOutlinedIcon />
                </p>

              </div>


            </div>

          </>
        )}
        <div>

        </div>

      </div>

    </>
  );
};
