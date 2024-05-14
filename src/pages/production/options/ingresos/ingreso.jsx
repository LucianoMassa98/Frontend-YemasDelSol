import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ingreso.css";
import { api } from "../../../../services/api";
import Table from "../../../../components/Table/Table";
import { Menuheader } from "../../../../components/menuheader";
import FastRewindIcon from '@mui/icons-material/FastRewind';
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { Form } from "../../../../components/form/form";
import { Toaster, toast } from "react-hot-toast";
import { Autocomplete } from "../../../../components/form/autocomplete";
import { TextInput } from "../../../../components/form/text-input";
import { Listproductitem } from "../../../../components/productlist/listproductitem/listproductitem";
import { useRef, useState, useEffect } from "react";
import { useProducts } from "../../../../components/hooks/use-products";
import { useGalpones } from "../../../../components/hooks/use-galpones";
import dayjs from "dayjs";
import { useNewingreso } from "../../../../components/hooks/ingreso/use-create-ingreso";
import { useIngresos } from "../../../../components/hooks/ingreso/use-get-ingresos";
import { useOneingreso } from "../../../../components/hooks/ingreso/use-get-one-ingreso";
import { useAdditemingreso } from "../../../../components/hooks/ingreso/use-additem-ingreso";
import { useDeleteitemingreso } from "../../../../components/hooks/ingreso/use-deleteitem-ingreso";
import { useSetgalponingreso } from "../../../../components/hooks/ingreso/use-set-galpon-ingreso";
import { useStore } from "../../../../store/use-store";
import { Loader } from "../../../login/loader";
import { useNavigate } from "react-router-dom";


export const Ingreso = () => {
  const [productos, setProducts] = useState();
  const [galponSeleccionado, setGalponSeleccionado] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [arrayResumen, setArrayResumen] = useState([]);
  const galpones = useGalpones();
  const realGalpones = galpones.data;
  const [cantidad, setCantidad] = useState("");
  const user = useStore((state) => state.user);
  dayjs.locale('es') 

  const now = dayjs().locale("es").format("DD [de] MMMM [de] YYYY");



  useEffect(() => {
    try {
      const traerProductos = async () => {
        const response = await api.get("/categories/1");
        setProducts(response.data.productos);
      };
      traerProductos();
    } catch (e) {
      console.log(e);
    }
  }, []);

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
      toast.error("Ingrese el producto y la cantidad", {
        duration: 4000,

        style: {
          background: "black",
          color: "white",
          fontSize: "15px",
          fontWeight: "500",
        },
      });
    }
  };

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

  const handleForm = async (e) => {
    e.preventDefault();
    try {

      const data = {

        userId: user.customer.id,
        galponId: galponSeleccionado,
        items: arrayResumen.map((producto) => ({
          productoId: producto.productoId,
          cnt: producto.cnt,
        })),
      };

      const response = await api.post("/remitosCompras", data);
      console.log(response, "ESTO ES DE INGRESO");
      if (response.status === 200) {
        toast.success("Ingreso guardado correctamente", {
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
    } catch (e) {
      console.error("Error en la solicitud POST:", e);
      toast.error(
        "Error al enviar el egreso. Por favor, inténtalo de nuevo más tarde.",
        {
          duration: 5000,
          style: {
            background: "#ac1313",
            color: "white",
            fontSize: "15px",
            fontWeight: "500",
          },
        }
      );
    }
  };
  return (
    <>
      <Menuheader />
      <div>
        <form className="" onSubmit={handleForm}>
          <div className="datos-grales">

            <span style={{ fontStyle: "italic", opacity: "80%", marginTop: "8px" }}>{now}</span>
            <div className="div-ingreso">
              <div className="ingr">

                <h2>Ingreso / Compras</h2>

                <FastRewindIcon onClick={() => navigate("/productionmenu")} sx={{ fontSize: "28px", fontWeight: "bold", padding: "10px", cursor: "pointer", boxSizing: "content-box", margin: "15px", borderRadius: "50%", bgcolor: "#f3a406" }} />
              </div>

              <div className="dat-gr">
                <h2>Datos Generales</h2>
                <span style={{ fontStyle: "italic", opacity: "60%", marginLeft: "0.50em" }}>
                  Operador: {user.customer.nombre} {user.customer.apellido}
                </span>
              </div>
            </div>



          </div>
          <div className="container-selects">
            <div className="select-container">
              <label style={{ marginTop: "30px" }} htmlFor="">Producto</label>
              <select id="producto" onChange={handleProductoChange}>
                <option value="" disabled selected hidden>
                  Seleccione un producto
                </option>

                {productos &&
                  productos.length > 0 &&
                  productos.map((prod, i) => (
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
            <Table array={arrayResumen} setArrayResumen={setArrayResumen}></Table>


            <div className="select-container">
              <label htmlFor="">Galpon</label>
              <select
                id="galpon"
                value={galponSeleccionado}
                onChange={handleGalponChange}
              >
                <option value="" disabled selected hidden>
                  Seleccione un Galpon
                </option>

                {realGalpones &&
                  realGalpones.length > 0 &&
                  realGalpones.map((galpon, i) => (
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
                  sx={{ width: "50%", marginY: "5px", fontSize: "12px" }}
                  variant="contained"
                  color="success"
                >
                  Guardar
                </Button>
              )}

          </div>
        </form>
      </div>
      <Toaster></Toaster>
    </>
  );
};
