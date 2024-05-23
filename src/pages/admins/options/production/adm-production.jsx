import { Alert, Button, CircularProgress, Stack } from "@mui/material";
import { Menuheader } from "../../../../components/menuheader";
import "./adm-production.css";
import SearchIcon from "@mui/icons-material/Search";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRef, useState } from "react";
import { useGetinforme } from "../../../../components/hooks/admins/use-get-informe";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableProduction from "./table/Table-production";
import FastRewindIcon from '@mui/icons-material/FastRewind';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';




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
    <>
      <Menuheader />

      <div className="header-segundo-produccion">
        <h1 className="titulo-produccion-adm">Producción</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "2vw",
              height: '3px !important'
             
            }}
          >
            <p className="desde-hasta-produccion">Desde</p>
            <MobileDatePicker

              value={desde}
              onChange={(newValue) => handleChange(newValue, "Desde")}
              views={["day", "month", "year"]}
              format="DD/MM/YYYY"
           
            />

            <p className="desde-hasta-produccion">Hasta</p>
            <MobileDatePicker
              value={hasta}
              onChange={(newValue) => handleChange(newValue, "Hasta")}
              views={["day", "month", "year"]}
              format="DD/MM/YYYY"
              
            >
             
            </MobileDatePicker>
          
          </Stack>
        </LocalizationProvider>
        <div className="boton-buscar-produccion">
          <SearchIcon />
          <button onClick={handleBuscar}>
            Buscar
          </button>
         

        </div>
        <FastRewindIcon onClick={() => navigate("/adminmenu")} sx={{ fontSize: "28px", fontWeight: "bold", padding: "10px", cursor: "pointer", boxSizing: "content-box", margin: "15px", borderRadius: "50%", bgcolor: "#f3a406" }} />


      </div>

<div className="linea-horizontal"></div>

      {informemutation.isSuccess ? (
        <div className="header-tercero-produccion">

          <div className="container-primero-produccion">
            <div>
              <DeleteIcon 
              className="icon-production"
              />{" "}
              <label className="subtitulo-desechos-bajas">
                Desechos: {informemutation.data.desechos}
              </label>
            </div>

            <div >
              <ArrowDownwardSharpIcon
              className="icon-production"
               />{" "}
              <label  className="subtitulo-desechos-bajas">
                Bajas: {informemutation.data.bajas}
              </label>
            </div>
            <div className="contenedor-ver-detalle-produccion">
              <button className="boton-ver-detalle-produccion" onClick={() => handleVerdetalle()}>
              <TextSnippetIcon /> Ver detalles 
              </button>
            </div>

          </div>
              
            <div className="table-produccion-container">
            <p className="subtitulo-tabla">Ingresos</p>
              <TableProduction
                className="table-produccion-2"
                array={informemutation.data.ingresos}
                estado="ingreso"
              />

            </div>
               
            <div className="table-produccion-container">
            <p className="subtitulo-tabla">Egresos</p>
              <TableProduction
                className="table-produccion-2"
                array={informemutation.data.egresos}
                estado="egreso"
              />

            </div>

        </div>

      ) : (
        <div>
          <Alert severity="info">Cargando datos...</Alert>
          <CircularProgress />
        </div>
      )}

    </>
  );
};
