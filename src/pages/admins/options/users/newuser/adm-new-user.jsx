import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { Menuheader } from "../../../../../components/menuheader";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import "./adm-new-user.css";
import { Form } from "../../../../../components/form/form";
import { useRef, useState } from "react";
import { Autocomplete, TextInput } from "../../../../../components/form";
import { useCreatecustomer } from "../usershooks/create-customer";
import { useGetallcustomers } from "../../../../../components/hooks/admins/use-get-customers";
import { useCreateuser } from "../../../../../components/hooks/admins/use-create-user";
import { Loader } from "../../../../login/loader";

import { useNavigate } from 'react-router-dom';

export const Admnewuserpage = () => {
  const customers = useGetallcustomers();
  const createcustomermutation = useCreatecustomer();
  const createusermutation = useCreateuser();
  const [pagestage, setPagestage] = useState(1);
  let customercreatedid = useRef(0);
  Loader("admin");


  const navigate = useNavigate();

  const handleSelectedcustm = (scustm) => {
    customercreatedid.current = scustm.persona.id;
    setPagestage(2);
    console.log(scustm.persona, "Seleccionado este");
  };

  const Createorgetcustomerid = () => {
    const [mode, setMode] = useState(0);

    if (createcustomermutation.isPending) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyItems: "center",
            alignContent: "center",
          }}
        >
          <Alert severity="info">Cargando...</Alert>
          <CircularProgress />
        </div>
      );
    }

    return (
      <div style={{}}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "2vw",
          }}
        >
          <Button onClick={() => setMode(0)}>Agregar Persona</Button>{" "}
          <Button onClick={() => setMode(1)}>Seleccionar Existente</Button>
        </div>
        {mode === 0 ? (
          <Form onSubmit={handleCustomersubmit}>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: "50vw",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <TextInput
                name="nombre"
                label="nombre"
                variant="standard"
                sx={{ minWidth: "50vw" }}
              />
              <TextInput
                name="apellido"
                label="Apellido"
                variant="standard"
                sx={{ minWidth: "50vw" }}
              />
              <TextInput
                name="celular"
                label="celular"
                variant="outlined"
                sx={{ minWidth: "50vw" }}
              />
              <TextInput
                name="email"
                label="Email"
                variant="filled"
                sx={{ minWidth: "50vw" }}
              />

              <Button variant="outlined" type="submit" sx={{ width: "30vw" }}>
                Agregar Persona
              </Button>
            </Stack>
          </Form>
        ) : (
          <div>
            <Form onSubmit={handleSelectedcustm}>
              <Autocomplete
                name="persona"
                options={customers.data ?? []}
                getOptionLabel={(option) =>
                  `Nombre: ${option.nombre} -- Apellido: ${option.apellido}`
                }
                renderInput={(params) => (
                  <TextField {...params} label="Seleccionar Persona" />
                )}
              />
              <Button type="submit">Seleccionar</Button>
            </Form>
          </div>
        )}
        {createcustomermutation.isError ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyItems: "center",
              alignContent: "center",
            }}
          >
            <Alert severity="error">
              {createcustomermutation.error.message}
            </Alert>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  };

  const handleCustomersubmit = (customer) => {
    let objeto = {
      nombre: customer.nombre,
      apellido: customer.apellido,
      email: customer.email,
      celular: customer.celular,
    };

    createcustomermutation.mutate(objeto, {
      onSuccess: (data) => {
        customercreatedid.current = data.id;
        setPagestage(2);
        console.log(data, "success data");
      },
    });
    console.log(objeto);
  };

  const handleUsersubmit = (usuario) => {
    let objetousuario = {
      customerId: customercreatedid.current,
      userName: usuario.username,
      password: usuario.password,
    };
    createusermutation.mutate(objetousuario);
    console.log(usuario, "dato de usuario");
  };

  if (createusermutation.isPending) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyItems: "center",
          alignContent: "center",
        }}
      >
        <Alert severity="info">Cargando...</Alert>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div id="admnewuserscontainer">
      <Menuheader />
      <div id="admnewuserscontent">
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          sx={{ display: "flex", flexDirection: "row", justifySelf: "left" }}
          onClick={() => (navigate = "/adminmenu/users")}
        >
          Volver
        </Button>
        <h1>Usuarios</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {createusermutation.isSuccess ? (
            <Alert severity="success">Usuario Creado con exito!</Alert>
          ) : pagestage === 2 ? (
            <div>
              <Form onSubmit={handleUsersubmit}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "50vw",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <TextInput
                    name="username"
                    label="Usuario"
                    variant="filled"
                    sx={{ minWidth: "50vw" }}
                  />
                  <TextInput
                    name="password"
                    label="Contraseña"
                    variant="filled"
                    sx={{ minWidth: "50vw" }}
                  />
                  <Button
                    sx={{ width: "30vw" }}
                    variant="outlined"
                    type="submit"
                  >
                    Crear usuario
                  </Button>
                </Stack>
              </Form>{" "}
            </div>
          ) : (
            <Createorgetcustomerid />
          )}
          {createusermutation.isError ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyItems: "center",
                alignContent: "center",
              }}
            >
              <Alert severity="error">{createusermutation.error.message}</Alert>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
