import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet-async";
import { Form, TextInput } from "../../components/form";
import { useState } from "react";
import { Alert, Collapse } from "@mui/material";
import { useGetallusers } from "../../components/hooks/admins/use-get-users";
import { useStore } from "../../store/use-store";
import { useNavigate } from 'react-router-dom';

export const Loginpage = () => {
  const [hasFailedOnce, setHasFailedOnce] = useState(false);
  const getusers = useGetallusers();
  const { setUser, setIsLoggedIn } = useStore();

  if (getusers.isSuccess) {
    console.log(getusers.data, "usuarios obtenidos");
  }


  const navigate = useNavigate();



  const handleLogin = (credentials) => {
    if (getusers.isSuccess) {
      let resultado = null;
      let i = 0;
      let max = getusers.data.length;
      let flag = false;
      while (i < max) {
        let obj = getusers.data[i];
        if (
          credentials.username === obj.userName &&
          credentials.password === obj.password
        ) {
          i = max;
          flag = true;
          resultado = obj;
          setUser(resultado);
          setIsLoggedIn(true);
        }
        i = i + 1;
      }

      if (flag) {
        if (resultado.roleId === 1) {
          navigate("/adminmenu");
        }
        if (resultado.roleId === 2) {
          navigate ("/productionmenu");
        }
      } else {
        setHasFailedOnce(true);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar sesión</title>
      </Helmet>
      <Container maxWidth="xs">
        <Typography variant="h3" component="h1" align="center" my={6}>
          Iniciar Sesión
        </Typography>

        <Form
          defaultValues={{ username: "", password: "" }}
          onSubmit={handleLogin}
        >
          <Stack spacing={4} sx={{ fontSize: 16 }}>
            <TextInput
              name="username"
              variant="standard"
              label="Usuario"
              placeholder="Tu usuario"
            />
            <TextInput
              name="password"
              type="password"
              variant="standard"
              label="Contraseña"
              placeholder="Tu contraseña"
            />
            <Button
              name="admin"
              type="submit"
              variant="contained"
              sx={{
                textTransform: "capitalize",
                fontSize: 16,
                backgroundColor: "deepskyblue",
              }}
            >
              Ingresar
            </Button>
            <Collapse in={hasFailedOnce}>
              <Alert severity="error">
                Las credenciales ingresadas no coinciden. Por favor, revisa los
                datos ingresados e intenta de nuevo.
              </Alert>
            </Collapse>
          </Stack>
        </Form>
        <Typography variant="body1" mt={3} align="center">
          Todavía no tienes una cuenta?{" "}
          <Link href="/register" underline="hover" color="#5d8bff">
            Regístrate
          </Link>
        </Typography>
      </Container>
    </>
  );
};
