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
import { useGetallusers } from "../../../../../components/hooks/admins/use-get-users";
import { Form } from "../../../../../components/form/form";
import { useRef, useState } from "react";
import { TextInput } from "../../../../../components/form";
import { useCreatecustomer } from "../usershooks/create-customer";

export const Admnewuserpage = () => {
  const users = useGetallusers();
  const createcustomermutation = useCreatecustomer();
  const [pagestage, setPagestage] = useState(1);
  let customercreatedid = useRef(0);

  const handleCustomersubmit = (customer) => {
    let objeto = {
      nombre: customer.nombre,
      apellido: customer.apellido,
      email: customer.email,
      celular: customer.celular,
    };

    /*  quitar de comentarios una vez que funcione el endpoint
    createcustomermutation.mutate(objeto, {
      onSuccess: (data) => {
        customercreatedid.current = data.id;
        setPagestage(2);
      },
    }); */

    setPagestage(2);
    console.log(objeto);
  };

  const handleUsersubmit = (usuario) => {
    console.log(usuario);
  };

  if (users.isSuccess) {
    console.log(users.data, "datos de usuario");
  }
  return (
    <div id="admnewuserscontainer">
      <Menuheader />
      <div id="admnewuserscontent">
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          sx={{ display: "flex", flexDirection: "row", justifySelf: "left" }}
          onClick={() => (window.location.href = "/adminmenu")}
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
          {pagestage === 2 ? (
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
                <TextField
                  id="username"
                  label="Usuario"
                  variant="filled"
                  sx={{ minWidth: "50vw" }}
                />
                <TextField
                  id="password"
                  label="Contraseña"
                  variant="filled"
                  sx={{ minWidth: "50vw" }}
                />
                <Button sx={{ width: "30vw" }} variant="outlined" type="submit">
                  Crear usuario
                </Button>
              </Stack>
            </Form>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};
