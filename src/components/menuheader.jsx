import { IconButton } from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import "./menuheader.css";
import { useState } from "react";
import { RightDrawer } from "./drawers/right-drawer";
import { useStore } from "../store/use-store";
export const Menuheader = () => {
  const [isopen, setIsopen] = useState(false);
  const logout = useStore((state) => state.doLogout);

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
      <IconButton sx={{ fontSize: "inherit" }} onClick={handleOpening}>
        <DehazeIcon sx={{ fontSize: "inherit" }} />
      </IconButton>
      <RightDrawer
        PaperProps={{
          sx: { backgroundColor: "orange", height: 200, borderRadius: 6 },
        }}
        anchor="left"
        open={isopen}
        onClose={onClose}
      >
        <div className="burgercontent">
          <img src="/yemaslogo.jpeg" width="110px" height="110px"></img>
          {/*<EggIcon sx={{ fontSize: 40, zIndex: 1201 }} />*/}
        </div>
        <div className="burgeroptions">
          <button className="burgeroption" onClick={() => logout()}>
            Cerrar sesion
          </button>
          <button className="burgeroption">Soporte</button>
        </div>
      </RightDrawer>
    </div>
  );
};
