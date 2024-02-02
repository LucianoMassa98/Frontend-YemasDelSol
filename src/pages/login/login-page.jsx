import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet-async";
import { Form, TextInput } from "../../components/form";
import { useState } from "react";

export const Loginpage = () => {
  const [usertype, Setusertype] = useState(null);
  const handleLogin = (credentials) => {
    //console.log(credentials);
    if (usertype === "product") {
      window.location.href = "/productionmenu";
    }

    if (usertype === "admin") {
      window.location.href = "/adminmenu";
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
              onClick={() => Setusertype("admin")}
              type="submit"
              variant="contained"
              sx={{
                textTransform: "capitalize",
                fontSize: 16,
                backgroundColor: "deepskyblue",
              }}
            >
              Continuar como administrador
            </Button>
            <Button
              name="product"
              onClick={() => Setusertype("product")}
              type="submit"
              variant="contained"
              sx={{
                textTransform: "capitalize",
                fontSize: 16,
                backgroundColor: "deepskyblue",
              }}
            >
              Continuar como Produccion
            </Button>
          </Stack>
        </Form>
        <Typography variant="body1" mt={3} align="center">
          Todavía no tienes una cuenta?{" "}
          <Link href="#" underline="hover" color="#5d8bff">
            Regístrate
          </Link>
        </Typography>
      </Container>
    </>
  );
};
