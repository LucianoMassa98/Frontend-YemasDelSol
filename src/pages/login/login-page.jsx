import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import { Helmet } from "react-helmet-async";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import { Form, TextInput } from "../../components/form";
import { FilledInput } from '@mui/material';
import "./login.css"
import { useState } from "react";
import { Alert, Collapse } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import { useGetallusers } from "../../components/hooks/admins/use-get-users";
import { useStore } from "../../store/use-store";
import { useNavigate } from 'react-router-dom';

export const Loginpage = () => {

  const [hasFailedOnce, setHasFailedOnce] = useState(false);
  const getusers = useGetallusers();
  console.log(getusers.data, "usuarios obtenidos");
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
          navigate("/productionmenu");
        }
        if (resultado.roleId === 3) {
          navigate("/vendedor");
        }
      } else {
        setHasFailedOnce(true);
      }
    }
  };

  return (
    <div className="container-fondo-circle">
      <div className="container-login">
        <Helmet>
          <title>Iniciar sesión</title>
        </Helmet>
        <Container maxWidth="xs" sx={{ width: "78%", backgroundColor: " #f3a406", borderRadius: "3%", paddingY: "30px", position: "relative" }}>
          <div className="container-logo-absolute">
            <img src="./yemaslogo.jpeg" alt="" />
          </div>
          <Typography color={"black"} sx={{ marginTop: "30px", letterSpacing: '0.3em', fontWeight: "500" }} variant="h3" component="h2">
            LOGIN
          </Typography>
          <Form
            defaultValues={{ username: "", password: "" }}
            onSubmit={handleLogin}
          >
            <Stack spacing={4} sx={{ fontSize: 16, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <TextInput
                name="username"
                variant="standard"
                // color="secondary"
                label="Usuario"
                type="text"
                placeholder="Tu usuario"

                sx={{
                  width: '90%',
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">

                      <PersonIcon />

                    </InputAdornment>
                  )
                }}

              />
              <TextInput
                name="password"
                type="password"
                variant="standard"
                autoComplete="current-password"
                label="Contraseña"
                placeholder="Tu contraseña"
                sx={{ width: "90%" }}

              />
              <Button
                name="admin"
                type="submit"
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "black",
                  fontSize: 14,
                  width: "50%",


                }}
              >
                ENTRAR
              </Button>
              <Collapse sx={{ width: "100%" }} in={hasFailedOnce}>
                <Alert severity="error">
                  Las credenciales ingresadas no coinciden. Por favor, revisa los
                  datos ingresados e intenta de nuevo.
                </Alert>
              </Collapse>
            </Stack>
          </Form>
          <Link underline="none" href="/register" sx={{ outline: "none", textUnderlineOffset: "none" }} color="black">
            <Typography variant="body1" mt={1} align="center">
              Olvidaste tu contraseña ?
            </Typography>
          </Link>
          <Typography variant="body1" mt={1} align="center" sx={{ color: "black" }}>
            Todavía no tienes una cuenta?{" "}
            <Link underline="none" href="/register" color="inherit">
              Regístrate
            </Link>
          </Typography>
        </Container>
      </div>
      <div className="circles-fondo">
        <img src="./circlesvg.png" width="100%" alt="" />
      </div>
      <div className="circles-fondo-dos">
        <img src="./circlesvg.png" width="100%" alt="" />
      </div>
      <div className="circles-fondo-tres">
        <img src="./circlesvg.png" width="60%" alt="" />
      </div>
      <div className="circles-fondo-cuatro">
        <img src="./circlesvg.png" width="70%" alt="" />
      </div>
      <div className="circles-fondo-cinco">
        <img src="./circlesvg.png" width="80%" alt="" />
      </div>

    </div>
  );
};
