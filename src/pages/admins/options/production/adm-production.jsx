import { Alert, Button, CircularProgress, Stack } from "@mui/material";
import { Menuheader } from "../../../../components/menuheader";
import "./adm-production.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import SearchIcon from "@mui/icons-material/Search";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DeleteIcon from "@mui/icons-material/Delete";
import { Productlist } from "../../../../components/productlist/product-list";
import dayjs from "dayjs";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRef, useState } from "react";
import { useGetinforme } from "../../../../components/hooks/admins/use-get-informe";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const AdmProduction = () => {
  const informemutation = useGetinforme();
  const now = dayjs();
  const today = dayjs(now.format("YYYY-MM-DD"));
  const tomorrow = today.add(1, "day");
  const [desde, setDesde] = useState(today);
  const [hasta, setHasta] = useState(tomorrow);
  let desderef = useRef(today);
  let hastaref = useRef(tomorrow);


  const navigate = useNavigate();

  useEffect(() => {
    handleBuscar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 

  

  const handleChange = (date, time) => {
    if (time === "Desde") {
      desderef.current = date;
      setDesde(date);
    } else {
      hastaref.current = date;
      setHasta(date);
    }
  };

  const handleBuscar = () => {
    let fechasdata = [
      desderef.current.format("MM-DD-YYYY"),
      hastaref.current.format("MM-DD-YYYY"),
    ];
    console.log(fechasdata, "fechistasadm");
    informemutation.mutate(fechasdata);
  };

  const handleVerdetalle = () => {
    let fechasdata = [
      desderef.current.format("MM-DD-YYYY"),
      hastaref.current.format("MM-DD-YYYY"),
    ];
    localStorage.setItem("fechas", JSON.stringify(fechasdata));
    navigate("/adminmenu/production/details");
  };

  if (informemutation.isSuccess) {
    console.log(informemutation.data, "datos recibidos");
  }

  

  return (
    <div className="admprodcontainer">
      <Menuheader />
      <div className="a-p-content">
    
        <div>   
        <div className="header-segundo-produccion">
        <h1>Producción</h1>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "2vw",
              }}
            >
              <MobileDatePicker
                label="Desde"
                value={desde}
                onChange={(newValue) => handleChange(newValue, "Desde")}
                views={["day", "month", "year"]}
                format="DD/MM/YYYY"
              />
              <MobileDatePicker
                label="Hasta"
                value={hasta}
                onChange={(newValue) => handleChange(newValue, "Hasta")}
                views={["day", "month", "year"]}
                format="DD/MM/YYYY"
              />
            </Stack>
          </LocalizationProvider>
          <Button startIcon={<SearchIcon />} onClick={handleBuscar}>
            Buscar
          </Button>
          <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          sx={{ display: "flex", flexDirection: "row", justifySelf: "left" }}
          onClick={() => navigate("/adminmenu")}
        >
          Volver
        </Button>
        </div>
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
          ) : (
            <div>
              <Alert severity="info">Cargando datos...</Alert>
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
      <Button variant="contained" onClick={() => handleVerdetalle()}>
        Ver detalle
      </Button>
    </div>
  );
};
