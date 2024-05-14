import "./menuheader.css";
import React, { useEffect } from "react"; // Importa useEffect de React
import { useState } from "react";
import { useStore } from "../store/use-store";
import { Link } from "react-router-dom";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Loader } from "../pages/login/loader";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export const Menuheader = () => {
  const logout = useStore((state) => state.doLogout);
  const loggedUser = useStore((state) => state.user);

  useEffect(() => {
    if (loggedUser) {
      if (loggedUser.roleId === "1") {
        Loader("admin");
      } else if (loggedUser.roleId === "2") {
        Loader("production");
      }
    }
  }, [loggedUser]);

  return (
    <>
      {loggedUser && loggedUser.roleId === 1 && (
        <>
          <div className="menu-horizontal">
            <div className="no">
              <h2>
                {" "}
                Hola {loggedUser?.userName}!
                <AccountCircleOutlinedIcon />
              </h2>
              <p className="subtitulo-2">administracion</p>
            </div>
          </div>

          <div className="menu-desplegable">
            <div className="menu-container-main">
              <div className="contenedor-img">
                <img src="/yemaslogo.jpeg" className="img-logo" />
              </div>

              <div className="burgeroptions">
                <p className="burgeroption">
                  <SettingsOutlinedIcon />
                </p>
                <p className="burgeroption">
                  <SupportAgentOutlinedIcon />
                </p>
                <p className="burgeroption-2" onClick={logout}>
                  <LogoutOutlinedIcon />
                </p>
              </div>
            </div>

            <div></div>
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
      {/* <h2>adwadwdaw</h2> */}
    </>
  );
};
