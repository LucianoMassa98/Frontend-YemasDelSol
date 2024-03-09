import { Alert, Button, CircularProgress } from "@mui/material";
import "./p-dailydetails.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DeleteIcon from "@mui/icons-material/Delete";
import { Productlist } from "../../../../components/productlist/product-list";
import dayjs from "dayjs";
import { useRef } from "react";
import { useGetinforme } from "../../../../components/hooks/admins/use-get-informe";
import { useEffect } from "react";
import { Menuheader } from "../../../../components/menuheader";
//import { useProductions } from "../../../../components/hooks/use-get-productions";
//import { useIngresos } from "../../../../components/hooks/ingreso/use-get-ingresos";

export const Dailydetails = () => {
  const informemutation = useGetinforme();
  //const egresosf = useProductions();
  //const ingresosf = useIngresos();
  const now = dayjs();
  const today = dayjs(now.subtract(3, "hour"));
  const tomorrow = today.add(1, "day");
  let desderef = useRef(today);
  let hastaref = useRef(tomorrow.subtract(3, "hour"));

  useEffect(() => {
    handleBuscar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBuscar = () => {
    let fechasdata = [
      desderef.current.format("MM-DD-YYYY"),
      hastaref.current.format("MM-DD-YYYY"),
    ];
    console.log(fechasdata, "fechitas");
    informemutation.mutate(fechasdata);
  };

  return (
    <div className="admprodcontainer">
      <Menuheader />
      <div className="a-p-content">
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          sx={{ display: "flex", flexDirection: "row", justifySelf: "left" }}
          onClick={() => (window.location.href = "/productionmenu")}
        >
          Volver
        </Button>
        <h1>Producción</h1>
        <h4>Fecha: {now.format("DD/MM/YYYY")}</h4>
        <hr></hr>
        <div>
          {informemutation.isSuccess ? (
            <div>
              <div className="listadeprod">
                <label className="listlabel">Ingresos</label>
                <Productlist
                  datos={informemutation.data.ingresos}
                  estado="ingreso"
                />
              </div>
              <div className="listadeprod">
                <label className="listlabel">Egresos</label>
                <Productlist
                  datos={informemutation.data.egresos}
                  estado="egreso"
                />
              </div>
              <div className="listadeprod">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <DeleteIcon />{" "}
                  <label className="listlabel">
                    Desechos: {informemutation.data.desechos}
                  </label>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <LocalHospitalIcon />{" "}
                  <label className="listlabel">
                    Bajas: {informemutation.data.bajas}
                  </label>
                </div>
              </div>
            </div>
          ) : informemutation.isPending ? (
            <div>
              <Alert severity="info">Cargando datos...</Alert>
              <CircularProgress />
            </div>
          ) : informemutation.isError ? (
            <Alert severity="error">{informemutation.error.message}</Alert>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
