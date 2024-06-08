import FastRewindIcon from "@mui/icons-material/FastRewind";

import "./egreso.css";
import { api } from "../../../../services/api";

import { Menuheader } from "../../../../components/menuheader";
import { Button } from "@mui/material";

import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useGalpones } from "../../../../components/hooks/use-galpones";
import dayjs from "dayjs";
import Table from "../../../../components/Table/Table";
import { useStore } from "../../../../store/use-store";

import { useNavigate } from "react-router-dom";

/* Componente principal */

export const Egreso = () => {
  const [products, setProducts] = useState();
  const galpones = useGalpones();
  const realGalpones = galpones.data;
  // DIA DE HOY
  dayjs.locale("es");
  const now = dayjs().format("DD [de] MMMM [de] YYYY");

  // USUARIO LOGGEADO
  const user = useStore((state) => state.user);

  const [daySelected, setDaySelect] = useState(false);
  const [hoySelected, setHoySelect] = useState(true); // Nuevo estado para el botón "Hoy"
  const [ayerSelected, setAyerSelect] = useState(false); // Nuevo estado para el botón "Ayer"

  const [productoSeleccionado, setProductoSeleccionado] = useState("");

  const [cantidad, setCantidad] = useState("");
  const [galponSeleccionado, setGalponSeleccionado] = useState("");
  const [arrayResumen, setArrayResumen] = useState([]);

  const handleHoyChange = () => {
    setDaySelect(false);
    setHoySelect(true);
    setAyerSelect(false);
  };

  const handleAyerChange = () => {
    setDaySelect(true);
    setHoySelect(false);
    setAyerSelect(true);
  };

  useEffect(() => {
    try {
      const traerProductos = async () => {
        const response = await api.get("/categories/2");
        setProducts(response.data.productos);
      };
      traerProductos();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const navigate = useNavigate();

  const handleProductoChange = (event) => {
    const selectedValue = event.target.value;
    const [id, nombre] = selectedValue.split("-");
    setProductoSeleccionado({
      id: id,
      nombre: nombre,
    });
  };

  const handleCantidadChange = (event) => {
    setCantidad(event.target.value);
  };

  const handleGalponChange = (event) => {
    setGalponSeleccionado(event.target.value);
  };

  const handleAgregarClick = () => {
    if (productoSeleccionado && cantidad) {
      const nuevoProducto = {
        productoId: productoSeleccionado.id,
        cnt: cantidad,
        nombre: productoSeleccionado.nombre,
        id: Date.now(),
      };

      setArrayResumen([...arrayResumen, nuevoProducto]);
    } else {
      alert("ingrese un producto y una cantidad");
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      // Construir el objeto de datos a enviar
      const data = {
        userId: user.customer.id,
        galponId: galponSeleccionado,
        ayer: daySelected,
        items: arrayResumen.map((producto) => ({
          productoId: producto.productoId,
          cnt: producto.cnt,
        })),
      };

      const response = await api.post("/remitosProduccion", data);
      console.log(response, "ESTO ES DE EGRESO");

      if (response.status === 200) {
        toast.success("Egreso guardado correctamente", {
          duration: 3000,

          position: "bottom-right",
          style: {
            background: "black",
            color: "white",
            fontSize: "15px",
            fontWeight: "500",
          },
        });
        setCantidad("");

        setGalponSeleccionado("");
        setArrayResumen([]);
      } else {
        toast.error(
          "Error al guardar el egreso. Por favor, inténtalo de nuevo más tarde.",
          {
            duration: 4000,
            style: {
              background: "black",
              color: "white",
              fontSize: "15px",
              fontWeight: "500",
            },
          }
        );
      }
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
      // toast.error('Error al enviar el egreso. Por favor, inténtalo de nuevo más tarde.', {
      //   duration: 5000,
      //   style: {
      //     background: "#ac1313",
      //     color: "white",
      //     fontSize: "15px",
      //     fontWeight: "500"
      //   }
      // });
    }
  };
  return (
    <>
      <Menuheader></Menuheader>
      <div>
        <form onSubmit={handleForm}>
          <div className="datos-grales">
            <span
              style={{ fontStyle: "italic", opacity: "80%", marginTop: "8px" }}
            >
              {now}
            </span>
            <div className="div-ingreso">
              <div className="ingr">
                <h2>Produccion</h2>

                <FastRewindIcon
                  onClick={() => navigate("/productionmenu")}
                  sx={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    padding: "10px",
                    cursor: "pointer",
                    boxSizing: "content-box",
                    margin: "15px",
                    borderRadius: "50%",
                    bgcolor: "#f3a406",
                  }}
                />
              </div>

              <div className="dat-gr">
                <h2>Datos Generales</h2>
                <span
                  style={{
                    fontStyle: "italic",
                    opacity: "60%",
                    marginLeft: "0.50em",
                  }}
                >
                  Operador: {user && user.customer.nombre}{" "}
                  {user && user.customer.apellido}
                </span>
              </div>
            </div>

            <span>Actualizar fecha:</span>
            <div className="date">
              <div>
                <label htmlFor="">Hoy</label>
                <input
                  name="opcion"
                  value={false}
                  onChange={handleHoyChange}
                  checked={hoySelected}
                  type="radio"
                />
              </div>
              <div>
                <label htmlFor="">Ayer</label>
                <input
                  type="radio"
                  value={true}
                  checked={ayerSelected}
                  onChange={handleAyerChange}
                  name="opcion"
                />
              </div>
            </div>
            <div className="select-container">
              <label htmlFor="">Producto</label>
              <select id="producto" onChange={handleProductoChange}>
                <option value="" disabled selected hidden>
                  Seleccione un producto
                </option>

                {products &&
                  products.length > 0 &&
                  products.map((prod) => (
                    <option key={prod.id} value={`${prod.id}-${prod.nombre}`}>
                      {prod.nombre}
                    </option>
                  ))}
              </select>
            </div>
            <div className="select-container">
              <label htmlFor="">Cantidad</label>
              <input
                id="cantidad"
                type="number"
                value={cantidad}
                onChange={handleCantidadChange}
                placeholder="Ingrese una cantidad"
              ></input>
            </div>
            <div className="btns">
              <Button
                sx={{ width: "50%", fontSize: "12px" }}
                onClick={handleAgregarClick}
                variant="contained"
              >
                Agregar Producto
              </Button>
            </div>
            {/* {mensaje && productoSeleccionado === "" && cantidad === "" && (
              <Alert severity="error">Ingrese la cantidad y el producto deseado</Alert>
            )} */}

            <Table
              array={arrayResumen}
              setArrayResumen={setArrayResumen}
            ></Table>

            {/* <section className="section-table">
              <table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody >
                  {arrayResumen.length > 0 ? arrayResumen.map((prod, i) => (
                    <tr key={i}>
                      <td>{prod.nombre}</td>
                      <td>{prod.cnt}</td>
                      <td>
                        <button className="btn-delete" onClick={() => deleteProduct(prod.id)} variant="outlined">
                          <DeleteIcon sx={{ color: "#ff2727" }} />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr className="tr-rare" >
                      <td>
                        ...
                      </td>
                      <td>
                        ...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section> */}
            <div className="select-container">
              <label htmlFor="">Galpon</label>
              <select
                id="galpon"
                value={galponSeleccionado}
                onChange={handleGalponChange}
              >
                <option value="rial" disabled selected hidden>
                  Seleccione un Galpon
                </option>

                {realGalpones &&
                  realGalpones.length > 0 &&
                  realGalpones.map((galpon) => (
                    <option key={galpon.id} value={galpon.id}>
                      {galpon.nombre}
                    </option>
                  ))}
              </select>
            </div>
            {arrayResumen &&
              arrayResumen.length > 0 &&
              galponSeleccionado &&
              galponSeleccionado !== "" && (
                <Button
                  type="submit"
                  sx={{ width: "80%", marginY: "15px" }}
                  variant="contained"
                  color="success"
                >
                  Guardar
                </Button>
              )}
          </div>
        </form>
        <Toaster></Toaster>
      </div>
    </>
  );
};
