import { Button } from "@mui/material";
import { Menuheader } from "../../../../components/menuheader";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import "./adm-galpones.css";

export const Admgalponespage = () => {
  return (
    <div id="admgalponescontainer">
      <Menuheader />
      <div id="admgalponescontent">
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          sx={{ display: "flex", flexDirection: "row", justifySelf: "left" }}
          onClick={() => (window.location.href = "/adminmenu")}
        >
          Volver
        </Button>
        <h1>Galpones</h1>
      </div>
    </div>
  );
};
