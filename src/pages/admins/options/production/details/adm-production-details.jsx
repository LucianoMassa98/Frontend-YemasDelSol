import { Alert, Button } from "@mui/material";
import { Menuheader } from "../../../../../components/menuheader";
import "./adm-production-details.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useRef, useState } from "react";
import { Vermasdialog } from "./seemore/see-more";
import { useGetallusers } from "../../../../../components/hooks/admins/use-get-users";
import { useGalpones } from "../../../../../components/hooks/use-galpones";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const findencargado = (userid, listausuarios) => {
  let i = 0;
  let max = listausuarios.length;
  let tempuser = null;
  while (i < max) {
    tempuser = listausuarios[i];
    if (tempuser.id === userid) {
      i = max;
    }
    i = i + 1;
  }

  return tempuser.customer.nombre;
};

const findgalpon = (galponid, listagalpones) => {
  let i = 0;
  let max = listagalpones.length;
  let tempgalpon = null;
  while (i < max) {
    tempgalpon = listagalpones[i];
    if (tempgalpon.id === galponid) {
      i = max;
    }
    i = i + 1;
  }

  return tempgalpon.nombre;
};

const cuttime = (time) => {
  dayjs.extend(utc);
  let date = dayjs.utc(time).utcOffset(-3);
  let fecha = date.format("DD/MM/YYYY");
  let hora = date.format("HH:mm:ss");

  return [fecha, hora];
};

export const AdmProductionDetails = () => {
  const [dataproduction, setDataproduction] = useState([]);
  const datap = useRef([]);
  const [dataingresos, setDataingresos] = useState([]);
  const datai = useRef([]);
  const [isopen, setIsopen] = useState(false);
  const [lobjeto, setLobjeto] = useState({});
  const egresoss = JSON.parse(localStorage.getItem("egresos"));
  const ingresos = JSON.parse(localStorage.getItem("Ingresos"));
  const usuarios = useGetallusers();
  const galpones = useGalpones();
  let isparsed = useRef(false);

  const handleOpen = (objeto) => {
    setLobjeto(objeto);
    setIsopen(true);
  };

  const handleClose = () => {
    setIsopen(false);
  };

  const handleDeletion = (num, column) => {
    let newlist = [];
    let max = 0;
    let i = 0;
    if (column === 1) {
      max = datap.current.length;
      for (i = 0; i < max; i++) {
        if (i != num) {
          newlist.push(datap.current[i]);
        }
      }
      datap.current = newlist;
      setDataproduction(newlist);
    } else {
      max = datai.current.length;
      for (i = 0; i < max; i++) {
        if (i != num) {
          newlist.push(datai.current[i]);
        }
      }
      datai.current = newlist;
      setDataingresos(newlist);
    }

    setDataproduction(newlist);
  };

  if (usuarios.isSuccess && galpones.isSuccess && !isparsed.current) {
    let tempegreso = [];
    let tempingreso = [];
    let i = 0;
    let max = egresoss.length;
    let objeto = null;
    let tempobj = null;
    let nomenc = null;
    let nomgalp = null;
    let fechahora = null;
    for (i = 0; i < max; i++) {
      tempobj = egresoss[i];
      nomenc = findencargado(tempobj.userId, usuarios.data);
      nomgalp = findgalpon(tempobj.galponId, galpones.data);
      fechahora = cuttime(tempobj.createdAt);
      objeto = {
        id: tempobj.id,
        encargado: nomenc,
        galpon: nomgalp,
        fecha: fechahora[0],
        hora: fechahora[1],
        tipo: "Produccion",
        items: tempobj.items,
      };
      tempegreso.push(objeto);
    }

    max = ingresos.length;

    for (i = 0; i < max; i++) {
      tempobj = ingresos[i];
      nomenc = findencargado(tempobj.userId, usuarios.data);
      nomgalp = findgalpon(tempobj.galponId, galpones.data);
      fechahora = cuttime(tempobj.createdAt);
      objeto = {
        id: tempobj.id,
        encargado: nomenc,
        galpon: nomgalp,
        fecha: fechahora[0],
        hora: fechahora[1],
        tipo: "Ingreso",
        items: tempobj.items,
      };
      tempingreso.push(objeto);
    }

    console.log(tempegreso, "egresoss");
    console.log(tempingreso, "ingresoss");
    setDataproduction(tempegreso);
    datap.current = tempegreso;
    setDataingresos(tempingreso);
    datai.current = tempingreso;

    isparsed.current = true;
  }

  console.log(ingresos, "uno");
  console.log(egresoss, "dos");

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
        {usuarios.isSuccess && galpones.isSuccess ? (
          <div className="listascont">
            <div className="listadeop">
              <h4>Egresos</h4>
              {datap.current.map((objeto, key) => (
                <div key={key} className="datacard">
                  <h4 className="apddataline">Tipo: {objeto.tipo}</h4>
                  <h4 className="apddataline">Galpon: {objeto.galpon} </h4>
                  <h4 className="apddataline">
                    Fecha: -{objeto.fecha}- -{objeto.hora}-
                  </h4>
                  <h4 className="apddataline">
                    Encargado: -{objeto.encargado}-
                  </h4>
                  <div className="a-p-d-buttoncontainer">
                    <Button
                      onClick={() => handleDeletion(key, 1)}
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
              <Vermasdialog
                open={isopen}
                onClose={handleClose}
                objeto={lobjeto}
              />
            </div>
            <div className="listadeop">
              <h4>Ingresos</h4>
              {datai.current.map((objeto, key) => (
                <div key={key} className="datacard">
                  <h4 className="apddataline">Tipo: {objeto.tipo}</h4>
                  <h4 className="apddataline">Galpon: {objeto.galpon} </h4>
                  <h4 className="apddataline">
                    Fecha: -{objeto.fecha}- -{objeto.hora}-
                  </h4>
                  <h4 className="apddataline">
                    Encargado: -{objeto.encargado}-
                  </h4>
                  <div className="a-p-d-buttoncontainer">
                    <Button
                      onClick={() => handleDeletion(key, 2)}
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
              <Vermasdialog
                open={isopen}
                onClose={handleClose}
                objeto={lobjeto}
              />
            </div>
          </div>
        ) : (
          <Alert severity="info">Cargando datos...</Alert>
        )}
      </div>
    </div>
  );
};
