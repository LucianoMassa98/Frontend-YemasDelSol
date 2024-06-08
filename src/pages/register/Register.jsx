// Importar useState en la parte superior del archivo
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  Button,
  TextField,
  Box,
  Collapse,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    email: "",
    usuario: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const [allErrors, setAllErrors] = useState({
    nombre: false,
    apellido: false,
    celular: false,
    email: false,
    usuario: false,
    contraseña: false,
    confirmarContraseña: false,
    an: true,
  });

  const [textError, setTextError] = useState("");

  const [errors, setErrors] = useState({
    nombre: false,
    apellido: false,
    celular: false,
    email: false,
    usuario: false,
    contraseña: false,
    confirmarContraseña: false,
    an: true,
  });
  // useEffect(() => {
  //     const hasErrors = Object.values(allErrors).some(error => error) || Object.values(errors).some(error => error);
  //     console.log(hasErrors, "esto es has ehas");

  //     if (hasErrors) {
  //         setManejoUseEffect(false);
  //     }

  //     if (!hasErrors) {
  //         setManejoUseEffect(true)
  //     }
  // }, [allErrors, errors])
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibilityTwo = () => {
    setShowPasswordTwo(!showPasswordTwo);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Restablecer errorMail cuando el usuario modifica el campo de correo electrónico
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.nombre.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nombre: true,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nombre: false,
        an: false,
      }));
      if (formData.nombre.trim().length > 30) {
        setAllErrors((prevErrors) => ({
          ...prevErrors,
          nombre: true,
        }));
        setTextError("El nombre no debe tener mas de 30 caracteres");
      } else {
        setAllErrors((prevErrors) => ({
          ...prevErrors,
          nombre: false,
          an: false,
        }));
      }
    }

    if (formData.apellido.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        apellido: true,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        apellido: false,
        an: false,
      }));
      if (formData.apellido.trim().length > 18) {
        setAllErrors((prevErrors) => ({
          ...prevErrors,
          apellido: true,
        }));
        setTextError("El apellido no debe tener mas de 15 caracteres");
      } else {
        setAllErrors((prevErrors) => ({
          ...prevErrors,
          apellido: false,
          an: false,
        }));
      }
    }

    if (formData.celular.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        celular: true,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        celular: false,
        an: false,
      }));
      if (
        formData.celular.trim().length > 13 ||
        formData.celular.trim().length < 3
      ) {
        setAllErrors((prevErrors) => ({
          ...prevErrors,
          calular: true,
        }));
        setTextError("numero de telefono invalido");
      } else {
        setAllErrors((prevErrors) => ({
          ...prevErrors,
          celular: false,
          an: false,
        }));
      }
    }

    if (formData.email.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: true,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: false,
        an: false,
      }));
      if (!validateEmail(formData.email.trim())) {
        setAllErrors((prevErrors) => ({
          ...prevErrors,
          email: true,
        }));
        setTextError("Correo electrónico inválido");
      } else {
        setAllErrors((prevErrors) => ({
          ...prevErrors,
          email: false,
          an: false,
        }));
      }
    }

    if (formData.usuario.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        usuario: true,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        usuario: false,
        an: false,
      }));

      if (
        formData.usuario.trim().length > 15 ||
        formData.usuario.trim().length < 4
      ) {
        setAllErrors((prevErrors) => ({
          ...prevErrors,
          usuario: true,
        }));
        setTextError("El nombre de usuario debe tener entre 3 y 15 caracteres");
      } else {
        setAllErrors((prevErrors) => ({
          ...prevErrors,
          usuario: false,
          an: false,
        }));
      }
    }

    if (formData.contraseña.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contraseña: true,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contraseña: false,
        an: false,
      }));

      if (
        formData.contraseña.trim().length < 8 ||
        !/\d/.test(formData.contraseña.trim())
      ) {
        setAllErrors((prevErrors) => ({
          ...prevErrors,
          contraseña: true,
        }));
        setTextError(
          "La contraseña debe tener más de 8 caracteres y contener al menos un número"
        );
      } else {
        setAllErrors((prevErrors) => ({
          ...prevErrors,
          contraseña: false,
          an: false,
        }));
      }
    }

    if (formData.confirmarContraseña.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmarContraseña: true,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmarContraseña: false,
        an: false,
      }));
      if (formData.confirmarContraseña.trim() !== formData.contraseña.trim()) {
        setAllErrors((prevErrors) => ({
          ...prevErrors,
          confirmarContraseña: true,
        }));
        setTextError("Las contraseñas no coinciden");
      } else {
        setAllErrors((prevErrors) => ({
          ...prevErrors,
          confirmarContraseña: false,
          an: false,
        }));
      }
    }

    if (
      formData.nombre !== "" &&
      formData.apellido !== "" &&
      formData.celular !== "" &&
      formData.email !== "" &&
      formData.contraseña !== "" &&
      formData.confirmarContraseña !== "" &&
      formData.usuario !== ""
    ) {
      setErrors((prevErrors) => {
        // Lógica para establecer los errores
        return {
          ...prevErrors,
          // Aquí establece los errores de acuerdo a tu lógica
        };
      });

      // Esperar a que se actualice el estado de los errores antes de continuar
      await new Promise((resolve) => setTimeout(resolve, 0));

      // Verificar si hay errores actualizados
      const hasErrors = Object.values(allErrors).some((error) => error);
      console.log(hasErrors, "esto es hass");
      if (hasErrors) {
        return false;
      } else {
        console.log("no hay errores");

        await new Promise((resolve) => setTimeout(resolve, 100));

        const updatedHasErrors = Object.values(allErrors).some(
          (error) => error
        );

        if (!updatedHasErrors) {
          setFormData({
            nombre: "",
            apellido: "",
            celular: "",
            email: "",
            usuario: "",
            contraseña: "",
            confirmarContraseña: "",
          });

          toast.success("Usted se ha registrado correctamente!", {
            duration: 4000,
            style: {
              background: "black",
              color: "white",
              fontSize: "15px",
              fontWeight: "500",
            },
          });
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        } else {
          console.log("Aún hay errores después del tiempo de espera");
        }
      }
    }
  };

  return (
    <div className="container">
      <h1 className="register">Registro</h1>
      <h2 className="datos-gr">Datos Generales</h2>
      <Box
        component="form"
        onSubmit={handleSubmit}
        action="/login"
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "40px",
          mt: "5px",
          width: "80vw",
          "@media (max-width: 600px)": {
            flexDirection: "column",
            gap: "20px",
          },
        }}
      >
        <div className="cont">
          <TextField
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            type="text"
            id="nombre"
            label="Nombre"
            variant="standard"
            error={errors.nombre}
            helperText={errors.nombre ? "este campo es requerido" : ""}
            fullWidth
          />
          <TextField
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            type="text"
            id="apellido"
            label="Apellido"
            variant="standard"
            error={errors.apellido}
            helperText={errors.apellido ? "este campo es requerido" : ""}
            fullWidth
          />
          <TextField
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            type="number"
            id="celular"
            label="Celular/Telefono"
            error={errors.celular}
            helperText={errors.celular ? "este campo es requerido" : ""}
            variant="standard"
            fullWidth
          />
          <TextField
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            id="email"
            label="Email"
            variant="standard"
            error={errors.email == true}
            helperText={errors.email === true ? "este campo es requerido" : ""}
            fullWidth
          />
        </div>
        <div className="cont">
          <TextField
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            type="text"
            id="usuario"
            label="Nombre de Usuario"
            error={errors.usuario}
            helperText={errors.usuario ? "este campo es requerido" : ""}
            variant="standard"
            fullWidth
          />
          <TextField
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            id="contraseña"
            label="Contraseña"
            error={errors.contraseña}
            helperText={errors.contraseña ? "este campo es requerido" : ""}
            variant="standard"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="confirmarContraseña"
            value={formData.confirmarContraseña}
            onChange={handleChange}
            type={showPasswordTwo ? "text" : "password"}
            id="confirmarContraseña"
            label="Confirmar Contraseña"
            error={errors.confirmarContraseña}
            helperText={
              errors.confirmarContraseña ? "este campo es requerido" : ""
            }
            variant="standard"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibilityTwo} edge="end">
                    {showPasswordTwo ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            name="admin"
            type="submit"
            variant="contained"
            sx={{
              textTransform: "capitalize",
              fontSize: 16,
              mt: 3,
              backgroundColor: "deepskyblue",
            }}
          >
            Registrarse
          </Button>
          <Collapse
            in={
              allErrors.nombre ||
              allErrors.apellido ||
              allErrors.email ||
              allErrors.contraseña ||
              allErrors.celular ||
              allErrors.usuario ||
              allErrors.confirmarContraseña
            }
          >
            <Alert severity="error">{textError}</Alert>
          </Collapse>
        </div>
      </Box>
      {/* <button onClick={()=>toast("hello word")}>awad</button> */}

      <Toaster></Toaster>
    </div>
  );
}
