import { Button } from "@mui/material";
import { Menuheader } from "../../../../../components/menuheader";
import "./adm-production-details.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useState } from "react";
import { Vermasdialog } from "./seemore/see-more";

export const AdmProductionDetails = () => {
  let listswitch = [
    {
      tipo: "Producción",
      galpon: "Albardon",
      fecha: "5/2/2024",
      hora: "14:05:24",
      encargado: "Rodolfo Perez",
    },
    {
      tipo: "Ingreso",
      galpon: "Albardon",
      fecha: "8/4/2023",
      hora: "7:05:44",
      encargado: "Alejandro molina",
    },
    {
      tipo: "Producción",
      galpon: "Capital",
      fecha: "12/12/2023",
      hora: "10:36:21",
      encargado: "Rodolfo Perez",
    },
    {
      tipo: "Producción",
      galpon: "Caucete",
      fecha: "2/7/2022",
      hora: "17:15:14",
      encargado: "Rodrigo hernandez",
    },
  ];
  const [dataproduction, setDataproduction] = useState(listswitch);
  const [isopen, setIsopen] = useState(false);
  const [lobjeto, setLobjeto] = useState({});

  const handleOpen = (objeto) => {
    setLobjeto(objeto);
    setIsopen(true);
  };

  const handleClose = () => {
    setIsopen(false);
  };

  const handleDeletion = (num) => {
    let newlist = [];
    let max = dataproduction.length;
    let i = 0;
    for (i = 0; i < max; i++) {
      if (i != num) {
        newlist.push(dataproduction[i]);
      }
    }
    setDataproduction(newlist);
  };

  return (
    <div className="admproddetailcontainer">
      <Menuheader />
      <div className="a-p-d-content">
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          sx={{ display: "flex", flexDirection: "row", justifySelf: "left" }}
          onClick={() => (window.location.href = "./")}
        >
          Volver
        </Button>
        <h1>Detalles</h1>
        <hr></hr>
        <div className="listadeop">
          {dataproduction.map((objeto, key) => (
            <div key={key} className="datacard">
              <h4 className="apddataline">Tipo: {objeto.tipo}</h4>
              <h4 className="apddataline">Galpon: {objeto.galpon} </h4>
              <h4 className="apddataline">
                Fecha: -{objeto.fecha}- -{objeto.hora}-
              </h4>
              <h4 className="apddataline">Encargado: -{objeto.encargado}-</h4>
              <div className="a-p-d-buttoncontainer">
                <Button
                  onClick={() => handleDeletion(key)}
                  variant="text"
                  color="error"
                >
                  Eliminar
                </Button>{" "}
                <Button variant="text" onClick={() => handleOpen(objeto)}>
                  Ver
                </Button>
              </div>
            </div>
          ))}
          <Vermasdialog open={isopen} onClose={handleClose} objeto={lobjeto} />
        </div>
      </div>
    </div>
  );
};
