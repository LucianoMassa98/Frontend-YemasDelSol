import { CircularProgress } from "@mui/material";
import { useEffect } from "react";

export const Logoff = () => {
  useEffect(() => {
    const tiempoEspera = 3000;

    const timeoutId = setTimeout(() => {
      window.location.href = "/login";
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
