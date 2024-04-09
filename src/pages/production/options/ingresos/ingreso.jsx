import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import DeleteIcon from '@mui/icons-material/Delete';
import "./ingreso.css";
import { api } from "../../../../services/api";

import { Menuheader } from "../../../../components/menuheader";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { Form } from "../../../../components/form/form";
import { Toaster, toast } from 'react-hot-toast';
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


/* Componente principal */

export const Ingreso = () => {
  const [productos, setProducts] = useState()
  const [galponSeleccionado, setGalponSeleccionado] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState("")
  const [arrayResumen, setArrayResumen] = useState([])
  const galpones = useGalpones()
  const realGalpones = galpones.data
  const [cantidad, setCantidad] = useState("")
  const user = useStore((state) => state.user);
  const now = dayjs().format("DD/MM/YYYY");

  useEffect(() => {
    try {
      const traerProductos = async () => {
        const response = await api.get('/categories/1');
        setProducts(response.data.productos);
      }
      traerProductos()
    } catch (e) {
      console.log(e);
    }
  }, [])
  const handleAgregarClick = () => {
    if (productoSeleccionado && cantidad) {
      // Crea un nuevo objeto con los datos del producto
      const nuevoProducto = {
        productoId: productoSeleccionado.id,
        cnt: cantidad,
        nombre: productoSeleccionado.nombre,
        id: Date.now()

      };
      setArrayResumen([...arrayResumen, nuevoProducto]);
    } else {
      toast.error('Ingrese el producto y la cantidad', {
        duration: 4000,

        style: {
          background: "black",
          color: "white",
          fontSize: "15px",
          fontWeight: "500"
        },

      });
    }
  }


  const handleProductoChange = (event) => {
    const selectedValue = event.target.value;
    const [id, nombre] = selectedValue.split('-');
    setProductoSeleccionado({
      id: id,
      nombre: nombre
    });
  };

  const handleCantidadChange = (event) => {
    setCantidad(event.target.value);
  };

  const deleteProduct = (id) => {
    const updatedArray = arrayResumen.filter(product => product.id !== id);
    setArrayResumen(updatedArray);
  };

  const handleGalponChange = (event) => {
    setGalponSeleccionado(event.target.value);
  };

  const handleForm = async (e) => {
    e.preventDefault()
    try {
      const data = {

        userId: user.customer.id, // Suponiendo que el usuario tiene una propiedad 'id'
        galponId: galponSeleccionado,
        // nazi: "AWdwadwad",
        items: arrayResumen.map((producto) => ({
          productoId: producto.productoId,
          cnt: producto.cnt
        }))
      };

      const response = await api.post('/remitosCompras', data);
      console.log(response.data, "esto es response");

      if (response.status === 200) {
        toast.success('Egreso guardado correctamente', {
          duration: 6000,

          position: 'bottom-right',
          style: {
            background: "black",
            color: "white",
            fontSize: "15px",
            fontWeight: "500"
          }

        }
        );
        setCantidad("")

        setGalponSeleccionado("")
        setArrayResumen([])
      } else {
        toast.error('Error al guardar el egreso. Por favor, inténtalo de nuevo más tarde.', {
          duration: 4000,
          style: {
            background: "black",
            color: "white",
            fontSize: "15px",
            fontWeight: "500"
          }
        });
      }
    } catch (e) {
      console.error('Error en la solicitud POST:', e);
      toast.error('Error al enviar el egreso. Por favor, inténtalo de nuevo más tarde.', {
        duration: 5000,
        style: {
          background: "#ac1313",
          color: "white",
          fontSize: "15px",
          fontWeight: "500"
        }
      });
    }
  }
  return (

    <>
      <Menuheader />
      <div>
        <form className="" onSubmit={handleForm}>
          <div className="datos-grales">
            <div className="btn-back">
              <Button
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "start",
                  height: "26px",
                  justifySelf: "left",
                  margin: "13px 0px 0px 0px",
                }}
                onClick={() => (window.location.href = "./")}
              >
                <NavigateBeforeIcon />
                Volver
              </Button>
            </div>
            <h2>Ingreso / Compras</h2>
            <h2>Datos Generales</h2>
            <span style={{ fontStyle: "italic" }}>
              Operador: {user.customer.nombre} {user.customer.apellido}
            </span>
            <span style={{ fontStyle: "italic" }}>fecha: {now}</span>
          </div>
          <div className="container-selects">


            <div className="select-container">
              <label htmlFor="">
                Producto
              </label>
              <select
                id="producto"

                onChange={handleProductoChange}

              >
                <option value="" disabled selected hidden>
                  Seleccione un producto
                </option>

                {productos && productos.length > 0 && productos.map((prod, i) => (
                  <option key={prod.id} value={`${prod.id}-${prod.nombre}`}>
                    {prod.nombre}
                  </option>
                ))}

              </select>
            </div>
            <div className="select-container">
              <label htmlFor="">
                Cantidad
              </label>
              <input id="cantidad"
                type="number"
                value={cantidad}
                onChange={handleCantidadChange}
                placeholder="Ingrese una cantidad"
              >

              </input>
            </div>
            <div className="btns">

              <Button sx={{ width: "50%", fontSize: "12px" }} onClick={handleAgregarClick} variant="contained">Agregar Producto</Button>
            </div>

            <section className="section-table">

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


            </section>
            <div className="select-container">
              <label htmlFor="">
                Galpon
              </label>
              <select id="galpon"
                value={galponSeleccionado}
                onChange={handleGalponChange}
              >
                <option value="" disabled selected hidden>
                  Seleccione un Galpon
                </option>

                {realGalpones && realGalpones.length > 0 && realGalpones.map((galpon, i) => (
                  <option key={galpon.id} value={galpon.id}>
                    {galpon.nombre}
                  </option>
                ))}
              </select>
            </div>
            {arrayResumen && arrayResumen.length > 0 && galponSeleccionado && galponSeleccionado !== "" && (


              <Button type="submit" sx={{ width: "80%", marginY: "15px" }} variant="contained" color="success">
                Guardar
              </Button>
            )}
          </div>
        </form>
      </div>
      <Toaster></Toaster>
    </>
  )

};
