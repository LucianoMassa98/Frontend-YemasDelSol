import { Button } from "@mui/material";
import { Menuheader } from "../../../../components/menuheader";
import "./adm-production.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Productlist } from "../../../../components/productlist/product-list";

export const AdmProduction = () => {
  return (
    <div className="admprodcontainer">
      <Menuheader />
      <div className="a-p-content">
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          sx={{ display: "flex", flexDirection: "row", justifySelf: "left" }}
          onClick={() => (window.location.href = "/adminmenu")}
        >
          Volver
        </Button>
        <h1>Producción</h1>
        <hr></hr>
        <div className="listadeprod">
          <Productlist />
        </div>
      </div>
      <Button
        variant="contained"
        onClick={() => (window.location.href = "/adminmenu/production/details")}
      >
        Ver detalle
      </Button>
    </div>
  );
};
