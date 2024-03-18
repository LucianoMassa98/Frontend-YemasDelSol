import { useGalpones } from "../../../../components/hooks/use-galpones";
import { Menuheader } from "../../../../components/menuheader";
import { Form } from "../../../../components/form/form";
import { Autocomplete } from "../../../../components/form/autocomplete";
import { TextInput } from "../../../../components/form/text-input";
import "./p-bajas.css";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useSetbajas } from "../../../../components/hooks/production/use-set-bajas";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useStore } from "../../../../store/use-store";
import { Loader } from "../../../login/loader";

export const Productionbajas = () => {
  let today = new Date();
  let now = dayjs(today).format("DD/MM/YYYY");
  const loggeduser = useStore((state) => state.user);
  const galpones = useGalpones();
  const bajasmutation = useSetbajas();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  Loader("production");

  const handleSubmit = (datos) => {
    let numero = Number(datos.cantidad);
    let objeto = {
      galponId: datos.galpon.id,
      userId: loggeduser.id,
      cantidad: numero,
    };
    bajasmutation.mutate(objeto);
  };

  return (
    <div className="pbajascontainer">
      <Menuheader />
      <div className="pbajascontent">
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          sx={{ display: "flex", flexDirection: "row", justifySelf: "left" }}
          onClick={() => (window.location.href = "/productionmenu")}
        >
          Volver
        </Button>
        <h1>Bajas</h1>
        <h2>Datos generales</h2>
        <h4 style={{ fontStyle: "italic" }}>fecha: {now}</h4>
        <h4 style={{ fontStyle: "italic" }}>
          operador:{" "}
          {` ${loggeduser.customer.nombre} , ${loggeduser.customer.apellido}`}
        </h4>
        <hr />
        {bajasmutation.isPending ? (
          <div>
            <Alert severity="info">Guardando datos de bajas...</Alert>
            <CircularProgress />
          </div>
        ) : bajasmutation.isError ? (
          <Alert severity="error">{bajasmutation.error.message}</Alert>
        ) : bajasmutation.isSuccess ? (
          <Alert severity="success">Datos de bajas Guardados con exito!</Alert>
        ) : galpones.isSuccess ? (
          <div>
            <h3>Agregar Cantidad de bajas</h3>
            <div className="bajasform">
              <Form
                onSubmit={handleSubmit}
                defaultValues={{ cantidad: 0, galpon: null }}
              >
                <Stack
                  spacing={3}
                  padding={2}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Stack>
                    <label className="b-labels">Cantidad</label>
                    <TextInput
                      sx={{ width: "20vw" }}
                      name="cantidad"
                      type="number"
                      placeholder="Inserte cantidad"
                      variant="outlined"
                      inputProps={{ min: 0 }}
                    />
                  </Stack>
                  <Stack padding={2}>
                    <label className="b-labels">Seleccione el Galpon</label>
                    <Autocomplete
                      sx={{ width: "20vw" }}
                      name="galpon"
                      options={galpones.data ?? []}
                      getOptionLabel={(option) => option.nombre}
                      renderInput={(params) => (
                        <TextField {...params} label="Seleccionar Galpon" />
                      )}
                    />
                  </Stack>
                  <Button type="submit" variant="contained">
                    Guardar
                  </Button>
                </Stack>
              </Form>
            </div>
          </div>
        ) : galpones.isPending ? (
          <div>
            <Alert severity="info">Cargando datos...</Alert>
            <CircularProgress />
          </div>
        ) : galpones.isError ? (
          <Alert severity="error">
            No se pudieron obtener datos de galpones
          </Alert>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
