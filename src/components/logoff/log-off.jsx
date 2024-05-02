import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Logoff = () => {

  const navigate= useNavigate()
 navigate("/login");
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
