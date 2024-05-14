import { WindowSharp } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logoff = () => {


  // const navigate = useNavigate()
  // navigate("/login");
  useEffect(() => {
    const tiempoEspera = 3000;

    const timeoutId = setTimeout(() => {

      window.location.href = "/login"
    }, tiempoEspera);


    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignContent: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
};
