import { useGalpones } from "../../../../components/hooks/use-galpones";
import { Menuheader } from "../../../../components/menuheader";
import { Form } from "../../../../components/form/form";
import { Autocomplete } from "../../../../components/form/autocomplete";
import { TextInput } from "../../../../components/form/text-input";
import FastRewindIcon from '@mui/icons-material/FastRewind';
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

import { useNavigate } from 'react-router-dom';

export const Productiondesechos = () => {
  let today = new Date();
  dayjs.locale('es');
  const now = dayjs().format("DD [de] MMMM [de] YYYY");
  const loggeduser = useStore((state) => state.user);
  const galpones = useGalpones();
  const desechosmutation = useSetdesechos();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



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
      <div className="datos-grales">

        <span style={{ fontStyle: "italic", opacity: "80%", marginTop: "8px" }}>{now}</span>
        <div className="div-ingreso">
          <div className="ingr">

            <h2>Desechos</h2>

            <FastRewindIcon onClick={() => navigate("/productionmenu")} sx={{ fontSize: "28px", fontWeight: "bold", padding: "10px", cursor: "pointer", boxSizing: "content-box", margin: "15px", borderRadius: "50%", bgcolor: "#f3a406" }} />
          </div>

          <div className="dat-gr">
            <h2>Datos Generales</h2>
            <span style={{ fontStyle: "italic", opacity: "60%", marginLeft: "0.50em" }}>
              Operador: {loggeduser && loggeduser.customer.nombre} {loggeduser && loggeduser.customer.apellido}
            </span>
          </div>
        </div>



      </div>
      <div className="pdesechoscontent">

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
                  spacing={1}
                  padding={0}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Stack>
                    <label className="d-labels">Cantidad</label>
                    <TextInput
                      sx={{ width: "70vw" }}
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
                      sx={{ width: "70vw" }}
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
