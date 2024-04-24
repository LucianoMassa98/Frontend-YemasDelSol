import { IconButton } from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import "./menuheader.css";
import { useState } from "react";
import { RightDrawer } from "./drawers/right-drawer";
import { useStore } from "../store/use-store";





export const Menuheader = () => {
  const [isopen, setIsopen] = useState(false);
  const logout = useStore((state) => state.doLogout);
  const loggeduser = useStore((state) => state.user);

  const handleOpening = () => {
    if (isopen) {
      setIsopen(false);
    } else {
      setIsopen(true);
    }
  };

  const onClose = () => {
    setIsopen(false);
  };

  return (
    <div className="menu-header">
      <p  onClick={handleOpening} className="button-menu">
        <DehazeIcon sx={{ fontSize: "inherit"}}  />
      </p>
      <RightDrawer
        PaperProps={{
          sx: { backgroundColor: "orange", height: 200, borderRadius: 8, textDecoration: 'none' },
        }}
        anchor="left"
        open={isopen}
        onClose={onClose}
      >
        <div className="burgercontent">
          <img src="/yemaslogo.jpeg" width="70px" height="70px"></img>
          {/*<EggIcon sx={{ fontSize: 40, zIndex: 1201 }} />*/}
         
     
        </div>
        
        <div className="burgeroptions">
          <p className="burgeroption" onClick={() => logout()}>
            Cerrar sesión
          </p>
          <div className="border-line"></div>

          <p className="burgeroption">Soporte</p>
          <div className="border-line"></div>
        </div>
      </RightDrawer>
    </div>
  );
};
