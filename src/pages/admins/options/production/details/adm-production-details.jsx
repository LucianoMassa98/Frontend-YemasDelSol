import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Menuheader } from "../../../../../components/menuheader";
import "./adm-production-details.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useGetinformedetalles } from "../../../../../components/hooks/admins/use-get-informe-detalles";
import { useDeletecompa } from "../../../../../components/hooks/admins/use-delete-compra";
import { useDeleteegreso } from "../../../../../components/hooks/admins/use-delete-egreso";

export const AdmProductionDetails = () => {
  const [isopen, setIsopen] = useState("cerrado");
  const lobjeto = useRef({
    ingresos: [],
    egresos: [],
    desechos: [],
    bajas: [],
  });
  const detallemutation = useGetinformedetalles();
  const deletecompramutation = useDeletecompa();
  const deleteegresomutation = useDeleteegreso();
  const fechasdata = JSON.parse(localStorage.getItem("fechas"));

  useEffect(() => {
    detallemutation.mutate(fechasdata);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = (llave, tipo) => {
    lobjeto.current = llave;
    setIsopen(tipo);
  };

  const handleClose = () => {
    setIsopen("cerrado");
  };

  const handleDeletion = (tipo, id) => {
    if (tipo === "ingreso") {
      deletecompramutation.mutate(id, {
        onSuccess: () => detallemutation.mutate(fechasdata),
      });
    }

    if (tipo === "egreso") {
      deleteegresomutation.mutate(id, {
        onSuccess: () => detallemutation.mutate(fechasdata),
      });
    }
  };
  if (detallemutation.isSuccess) {
    console.log(detallemutation.data);
  }
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
        {detallemutation.isSuccess ? (
          <div className="listascont">
            <div className="listadeop">
              <h4>Egresos</h4>
              {detallemutation.data.egresos.map((objeto, key) => (
                <div key={key} className="datacard">
                  <h4 className="apddataline">Tipo: Egreso</h4>
                  {objeto.galpon === null ? (
                    <h4 className="apddataline">
                      Carga de datos No finalizada
                    </h4>
                  ) : (
                    <h4 className="apddataline">
                      Galpon: {objeto.galpon.nombre}{" "}
                    </h4>
                  )}
                  <h4 className="apddataline">
                    Fecha: -{dayjs(objeto.createdAt).format("DD/MM/YYYY")}- -
                    {dayjs(objeto.createdAt).add(3, "hour").format("HH:mm:ss")}-
                  </h4>
                  <h4 className="apddataline">
                    Encargado: -{objeto.user.customer.nombre} ,{" "}
                    {objeto.user.customer.apellido}-
                  </h4>
                  <div className="a-p-d-buttoncontainer">
                    <Button
                      onClick={() => handleDeletion("egreso", objeto.id)}
                      variant="text"
                      color="error"
                    >
                      Eliminar
                    </Button>{" "}
                    <Button
                      variant="text"
                      onClick={() => handleOpen(key, "egreso")}
                    >
                      Ver
                    </Button>
                  </div>
                </div>
              ))}
              {/* due to an error of deeply nested object the dialog had to be extended without using components */}

              <Dialog open={isopen === "egreso"} onClose={handleClose}>
                <DialogTitle>Datos Generales</DialogTitle>
                <DialogContent dividers>
                  <List disablePadding>
                    <ListItem disableGutters disablePadding>
                      <ListItemText
                        primary="Fecha:"
                        secondary={`${dayjs(
                          detallemutation.data.egresos[lobjeto.current]
                            ?.createdAt
                        ).format("DD/MM/YYYY")}`}
                      />
                    </ListItem>
                    <ListItem disableGutters disablePadding>
                      <ListItemText
                        primary="Operador:"
                        secondary={`${
                          detallemutation.data.egresos[lobjeto.current]?.user
                            .customer.nombre
                        } - ${
                          detallemutation.data.egresos[lobjeto.current]?.user
                            .customer.apellido
                        }`}
                      />
                    </ListItem>
                    <ListItem disableGutters disablePadding>
                      {detallemutation.data.egresos[lobjeto.current]?.galpon !=
                      null ? (
                        <ListItemText
                          primary="Galpon:"
                          secondary={`${
                            detallemutation.data.egresos[lobjeto.current]
                              ?.galpon.nombre
                          }`}
                        />
                      ) : (
                        <ListItemText
                          primary="Galpon: No definido"
                          secondary="Carga en progreso"
                        />
                      )}
                    </ListItem>
                    <ListItem>
                      <div className="p-lista">
                        <div id="headerslpi">
                          <div className="l-p-item">
                            <h2 className="l-pname">Producto</h2>
                            <h2 className="l-pname">Cantidad</h2>
                          </div>
                        </div>
                        {detallemutation.data.egresos[lobjeto.current]?.items
                          ?.length === 0 ? (
                          <p>Sin Elementos</p>
                        ) : (
                          <p
                            style={{
                              height: "0px",
                              width: "0px",
                              margin: "0px",
                            }}
                          ></p>
                        )}
                        {detallemutation.data.egresos[
                          lobjeto.current
                        ]?.items.map((objeto, key) => (
                          <div className="l-p-item" key={key}>
                            <h4 className="l-pname">{objeto.nombre}</h4>
                            <h4 className="l-pname">
                              {objeto.ProduccionProducto.cnt}
                            </h4>
                          </div>
                        ))}
                      </div>
                    </ListItem>
                  </List>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
              </Dialog>
            </div>
            <div className="listadeop">
              <h4>Ingresos</h4>
              {detallemutation.data.ingresos.map((objeto, key) => (
                <div key={key} className="datacard">
                  <h4 className="apddataline">Tipo: Ingreso</h4>
                  {objeto.galpon === null ? (
                    <h4 className="apddataline">
                      Carga de datos No finalizada
                    </h4>
                  ) : (
                    <h4 className="apddataline">
                      Galpon: {objeto.galpon.nombre}{" "}
                    </h4>
                  )}
                  <h4 className="apddataline">
                    Fecha: -{dayjs(objeto.createdAt).format("DD/MM/YYYY")}- -
                    {dayjs(objeto.createdAt).format("HH:mm:ss")}-
                  </h4>
                  <h4 className="apddataline">
                    Encargado: -{objeto.user.customer.nombre} ,{" "}
                    {objeto.user.customer.apellido}-
                  </h4>
                  <div className="a-p-d-buttoncontainer">
                    <Button
                      onClick={() => handleDeletion("ingreso", objeto.id)}
                      variant="text"
                      color="error"
                    >
                      Eliminar
                    </Button>{" "}
                    <Button
                      variant="text"
                      onClick={() => handleOpen(key, "ingreso")}
                    >
                      Ver
                    </Button>
                  </div>
                </div>
              ))}
              <Dialog open={isopen === "ingreso"} onClose={handleClose}>
                <DialogTitle>Datos Generales</DialogTitle>
                <DialogContent dividers>
                  <List disablePadding>
                    <ListItem disableGutters disablePadding>
                      <ListItemText
                        primary="Fecha:"
                        secondary={`${dayjs(
                          detallemutation.data.ingresos[lobjeto.current]
                            ?.createdAt
                        ).format("DD/MM/YYYY")}`}
                      />
                    </ListItem>
                    <ListItem disableGutters disablePadding>
                      <ListItemText
                        primary="Operador:"
                        secondary={`${
                          detallemutation.data.ingresos[lobjeto.current]?.user
                            .customer.nombre
                        } - ${
                          detallemutation.data.ingresos[lobjeto.current]?.user
                            .customer.apellido
                        }`}
                      />
                    </ListItem>
                    <ListItem disableGutters disablePadding>
                      {detallemutation.data.ingresos[lobjeto.current]?.galpon !=
                      null ? (
                        <ListItemText
                          primary="Galpon:"
                          secondary={`${
                            detallemutation.data.ingresos[lobjeto.current]
                              ?.galpon.nombre
                          }`}
                        />
                      ) : (
                        <ListItemText
                          primary="Galpon: No definido"
                          secondary="Carga en progreso"
                        />
                      )}
                    </ListItem>
                    <ListItem>
                      <div className="p-lista">
                        <div id="headerslpi">
                          <div className="l-p-item">
                            <h2 className="l-pname">Producto</h2>
                            <h2 className="l-pname">Cantidad</h2>
                          </div>
                        </div>
                        {detallemutation.data.ingresos[lobjeto.current]?.items
                          ?.length === 0 ? (
                          <p>Sin Elementos</p>
                        ) : (
                          <p
                            style={{
                              height: "0px",
                              width: "0px",
                              margin: "0px",
                            }}
                          ></p>
                        )}
                        {detallemutation.data.ingresos[
                          lobjeto.current
                        ]?.items.map((objeto, key) => (
                          <div className="l-p-item" key={key}>
                            <h4 className="l-pname">{objeto.nombre}</h4>
                            <h4 className="l-pname">
                              {objeto.CompraProducto?.cnt}
                            </h4>
                          </div>
                        ))}
                      </div>
                    </ListItem>
                  </List>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        ) : (
          <Alert severity="info">Cargando datos...</Alert>
        )}
      </div>
    </div>
  );
};
