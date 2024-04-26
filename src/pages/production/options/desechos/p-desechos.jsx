import { useGalpones } from "../../../../components/hooks/use-galpones";
import { Menuheader } from "../../../../components/menuheader";
import { Form } from "../../../../components/form/form";
import { Autocomplete } from "../../../../components/form/autocomplete";
import { TextInput } from "../../../../components/form/text-input";
import "./p-desechos.css";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useSetdesechos } from "../../../../components/hooks/production/use-set-desechos";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useStore } from "../../../../store/use-store";
import { Loader } from "../../../login/loader";
import { useNavigate } from 'react-router-dom';

export const Productiondesechos = () => {
  let today = new Date();
  let now = dayjs(today).format("DD/MM/YYYY");
  const loggeduser = useStore((state) => state.user);
  const galpones = useGalpones();
  const desechosmutation = useSetdesechos();

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
    desechosmutation.mutate(objeto);
  };


  const navigate = useNavigate();



  return (
    <div className="pdesechoscontainer">
      <Menuheader />
      <div className="pdesechoscontent">
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          sx={{ display: "flex", flexDirection: "row", justifySelf: "left" }}
          onClick={() =>  navigate("/productionmenu")}
        >
          Volver
        </Button>
        <h1>Desechos</h1>
        <h2>Datos generales</h2>
        <h4 style={{ fontStyle: "italic" }}>fecha: {now}</h4>
        <h4 style={{ fontStyle: "italic" }}>
          operador:{" "}
          {` ${loggeduser.customer.nombre} , ${loggeduser.customer.apellido}`}
        </h4>
        <hr />
        {desechosmutation.isPending ? (
          <div>
            <Alert severity="info">Guardando datos de desechos...</Alert>
            <CircularProgress />
          </div>
        ) : desechosmutation.isError ? (
          <Alert severity="error">{desechosmutation.error.message}</Alert>
        ) : desechosmutation.isSuccess ? (
          <Alert severity="success">
            Datos de desechos Guardados con exito!
          </Alert>
        ) : galpones.isSuccess ? (
          <div>
            <h3>Agregar Cantidad de Desechos</h3>
            <div className="desechoform">
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
                    <label className="d-labels">Cantidad</label>
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
                    <label className="d-labels">Seleccione el Galpon</label>
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
