import { Alert, Button, CircularProgress, Stack } from "@mui/material";
import { Menuheader } from "../../../../components/menuheader";
import "./adm-production.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Productlist } from "../../../../components/productlist/product-list";
import { useProductions } from "../../../../components/hooks/use-get-productions";
import { useIngresos } from "../../../../components/hooks/ingreso/use-get-ingresos";
import dayjs from "dayjs";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRef, useState } from "react";
import { useOneingreso } from "../../../../components/hooks/ingreso/use-get-one-ingreso";
import { useOneproduction } from "../../../../components/hooks/use-get-one-production";

const filtrarxfecha = (lista, desde, hasta) => {
  let i = 0;
  let max = lista.length;
  let templist = [];
  let beforeflag = false;
  let afterflag = false;
  let objetoactual = null;
  let fecha = null;
  let z = null;
  for (i = 0; i < max; i++) {
    objetoactual = lista[i];
    fecha = objetoactual.createdAt;
    z = fecha.split("Z");
    afterflag = dayjs(z[0]).isAfter(desde);
    beforeflag = dayjs(z[0]).isBefore(hasta);
    if (afterflag && beforeflag) {
      templist.push(objetoactual);
    }
  }

  return templist;
};

export const AdmProduction = () => {
  const producciones = useProductions();
  const ingresos = useIngresos();
  const produccionmutation = useOneproduction();
  const ingresomutation = useOneingreso();
  const filteredprod = useRef([]);
  const filteredingr = useRef([]);
  const filteredprodlist = useRef([]);
  const filteredingrlist = useRef([]);
  const isreadyflag = useRef(false);
  const fpisready = useRef(false);
  const fiisready = useRef(false);
  const [fpisready2, setFpisready2] = useState(false);
  const [fiisready2, setFiisready2] = useState(false);
  const now = dayjs();
  const today = dayjs(now.format("YYYY-MM-DD"));
  const tomorrow = today.add(1, "day");
  const [desde, setDesde] = useState(today);
  const [hasta, setHasta] = useState(tomorrow);
  const prodcompleto = useRef([]); //almacena los datos completos para pasarlos al ver mas detalle
  const ingrcompleto = useRef([]);

  const handleChange = (date, time) => {
    isreadyflag.current = false;
    fpisready.current = false;
    fiisready.current = false;
    if (time === "Desde") {
      setDesde(date);
    } else {
      setHasta(date);
    }
  };

  const handleVerdetalle = () => {
    localStorage.setItem("egresos", JSON.stringify(prodcompleto.current));
    localStorage.setItem("Ingresos", JSON.stringify(ingrcompleto.current));
    window.location.href = "/adminmenu/production/details";
  };

  const filtrarproduccion = (tam) => {
    if (tam > -1) {
      if (tam === 0) {
        produccionmutation.mutate(filteredprod.current[tam].id, {
          onSuccess: (data) => {
            filteredprodlist.current = filteredprodlist.current.concat(
              data.items
            );
            prodcompleto.current.push(data);
            localStorage.setItem("egresos", prodcompleto.current);
            fpisready.current = true;
            setFpisready2(true);
          },
        });
      } else {
        produccionmutation.mutate(filteredprod.current[tam].id, {
          onSuccess: (data) => {
            filteredprodlist.current = filteredprodlist.current.concat(
              data.items
            );
            prodcompleto.current.push(data);
            filtrarproduccion(tam - 1);
          },
        });
      }
    } else {
      fpisready.current = true;
      setFiisready2(true);
      filteredprodlist.current = [];
    }
  };

  const filtraringresos = (tam) => {
    if (tam > -1) {
      if (tam === 0) {
        ingresomutation.mutate(filteredingr.current[tam].id, {
          onSuccess: (data) => {
            filteredingrlist.current = filteredingrlist.current.concat(
              data.items
            );
            fiisready.current = true;
            setFiisready2(true);
            ingrcompleto.current.push(data);
            localStorage.setItem("Ingresos", ingrcompleto.current);
          },
        });
      } else {
        ingresomutation.mutate(filteredingr.current[tam].id, {
          onSuccess: (data) => {
            filteredingrlist.current = filteredingrlist.current.concat(
              data.items
            );
            ingrcompleto.current.push(data);
            filtraringresos(tam - 1);
          },
        });
      }
    } else {
      fiisready.current = true;
      setFiisready2(true);
      filteredingrlist.current = [];
    }
  };

  if (!isreadyflag.current && producciones.isSuccess && ingresos.isSuccess) {
    filteredprod.current = filtrarxfecha(producciones.data, desde, hasta);
    filteredingr.current = filtrarxfecha(ingresos.data, desde, hasta);
    filteredingrlist.current = [];
    filteredprodlist.current = [];
    prodcompleto.current = [];
    ingrcompleto.current = [];
    filtrarproduccion(filteredprod.current.length - 1);
    filtraringresos(filteredingr.current.length - 1);
    isreadyflag.current = true;
  }

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
        <h4>Fecha: {now.format("DD/MM/YYYY")}</h4>
        <hr></hr>
        {producciones.isSuccess && ingresos.isSuccess && isreadyflag.current ? (
          <div>
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
            {fiisready2 === true && fiisready.current ? (
              <div className="listadeprod">
                <label className="listlabel">Ingresos</label>
                <Productlist
                  datos={filteredingrlist.current}
                  estado="ingreso"
                />
              </div>
            ) : (
              <div>
                <Alert severity="info">Cargando datos...</Alert>
                <CircularProgress />
              </div>
            )}
            {fpisready2 === true && fpisready.current ? (
              <div className="listadeprod">
                <label className="listlabel">Egresos</label>
                <Productlist datos={filteredprodlist.current} estado="egreso" />
              </div>
            ) : (
              <div>
                <Alert severity="info">Cargando datos...</Alert>
                <CircularProgress />
              </div>
            )}
          </div>
        ) : producciones.isLoading && ingresos.isLoading ? (
          <div>
            <Alert severity="info">Cargando datos...</Alert>
            <CircularProgress />
          </div>
        ) : producciones.isError && ingresos.isError ? (
          <Alert severity="error">Error al cargar datos</Alert>
        ) : (
          <div> </div>
        )}
      </div>
      <Button variant="contained" onClick={() => handleVerdetalle()}>
        Ver detalle
      </Button>
    </div>
  );
};
