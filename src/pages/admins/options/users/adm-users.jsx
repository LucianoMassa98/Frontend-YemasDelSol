import { Alert, Button, CircularProgress, Stack } from "@mui/material";
import { Menuheader } from "../../../../components/menuheader";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./adm-users.css";
import { useGetallusers } from "../../../../components/hooks/admins/use-get-users";
import { RightDrawer } from "../../../../components/drawers/right-drawer";
import { Form, TextInput } from "../../../../components/form";
import { useRef, useState } from "react";

export const Admuserspage = () => {
  const [isopen, setIsopen] = useState(false);
  let actualuser = useRef({
    customer: { nombre: "", apellido: "", celular: "", email: "" },
    userName: "",
  });

  const handleClose = () => {
    setIsopen(false);
  };

  const handleEdituser = (datauseredit) => {
    console.log(datauseredit);
  };

  const users = useGetallusers();
  if (users.isSuccess) {
    console.log(users.data, "datos de usuario");
  }
  return (
    <div id="admuserscontainer">
      <Menuheader />
      <div id="admuserscontent">
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
          <div id="usersboxx">
            {users.status === "success" ? (
              users.data.map((objeto, key) => (
                <div
                  key={key}
                  className="useroption"
                  onClick={() => {
                    actualuser.current = objeto;
                    setIsopen(true);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "1vw",
                    }}
                  >
                    <p style={{ fontWeight: "bold" }}>{"Usuario: "}</p>
                    <p>{objeto.userName}</p>
                    <p style={{ fontWeight: "bold" }}>{" - email: "}</p>
                    <p>{objeto.customer.email}</p>
                  </div>
                  <ArrowForwardIosIcon className="arrowuser" />
                </div>
              ))
            ) : users.status === "pending" ? (
              <div>
                <Alert severity="info">Cargando...</Alert>
                <CircularProgress />
              </div>
            ) : users.status === "error" ? (
              <Alert severity="error">Error al cargar datos</Alert>
            ) : (
              <div></div>
            )}
          </div>
          <Button
            href="/adminmenu/users/newuser"
            variant="contained"
            style={{ maxWidth: "20vw" }}
          >
            Crear nuevo Usuario
          </Button>
          <RightDrawer anchor="right" open={isopen} onClose={handleClose}>
            <Form
              onSubmit={handleEdituser}
              defaultValues={{
                enombre: actualuser.current.customer.nombre,
                eapellido: actualuser.current.customer.apellido,
                ecelular: actualuser.current.customer.celular,
                eusuario: actualuser.current.userName,
                econtra: "",
              }}
              PaperProps={{
                sx: { backgroundColor: "orange", height: 200, borderRadius: 6 },
              }}
            >
              <Stack spacing={3} sx={{ mb: 3 }}>
                <TextInput name="enombre" label="Nombre" variant="standard" />
                <TextInput
                  name="eapellido"
                  label="Apellido"
                  variant="standard"
                />
                <TextInput name="ecelular" label="Celular" variant="standard" />
                <TextInput name="eusuario" label="Usuario" variant="standard" />
                <TextInput
                  name="econtra"
                  label="Contraseña"
                  variant="standard"
                />
              </Stack>
              <Button type="submit" variant="contained">
                Guardar
              </Button>
            </Form>
          </RightDrawer>
        </div>
      </div>
    </div>
  );
};
