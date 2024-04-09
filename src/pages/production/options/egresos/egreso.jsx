import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import DeleteIcon from '@mui/icons-material/Delete';

import "./egreso.css";
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
import { useEffect, useRef, useState } from "react";
import { useProducts } from "../../../../components/hooks/use-products";
import { useGalpones } from "../../../../components/hooks/use-galpones";
import dayjs from "dayjs";
import { useNewproduction } from "../../../../components/hooks/use-create-production";
import { useAdditem } from "../../../../components/hooks/use-add-item-production";


import { useProductions } from "../../../../components/hooks/use-get-productions";
import { useOneproduction } from "../../../../components/hooks/use-get-one-production";
import { useDeleteitem } from "../../../../components/hooks/use-delete-item-production";
import { useSetgalponproduction } from "../../../../components/hooks/use-set-galpon-production";
import { useStore } from "../../../../store/use-store";
import axios from "axios";
import { Loader } from "../../../login/loader";



/* Componente principal */

export const Egreso = () => {

  const [products, setProducts] = useState()
  const [mensaje, setMensaje] = useState(false)
  const galpones = useGalpones()
  const realGalpones = galpones.data
  // DIA DE HOY
  const now = dayjs().format("DD/MM/YYYY");

  // USUARIO LOGGEADO
  const user = useStore((state) => state.user);

  const [daySelected, setDaySelect] = useState(false)
  const [hoySelected, setHoySelect] = useState(true); // Nuevo estado para el botón "Hoy"
  const [ayerSelected, setAyerSelect] = useState(false); // Nuevo estado para el botón "Ayer"

  const [productoSeleccionado, setProductoSeleccionado] = useState("");


  const [cantidad, setCantidad] = useState("");
  const [galponSeleccionado, setGalponSeleccionado] = useState("");
  const [arrayResumen, setArrayResumen] = useState([])


  const handleHoyChange = () => {
    setDaySelect(false); // Actualizar el estado general
    setHoySelect(true); // Marcar "Hoy"
    setAyerSelect(false); // Desmarcar "Ayer"
  };

  const handleAyerChange = () => {
    setDaySelect(true); // Actualizar el estado general
    setHoySelect(false); // Desmarcar "Hoy"
    setAyerSelect(true); // Marcar "Ayer"
  };


  useEffect(() => {
    try {
      const traerProductos = async () => {
        const response = await api.get('/categories/2');
        setProducts(response.data.productos);
      }
      traerProductos()
    } catch (e) {
      console.log(e);
    }
  }, [])


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

  const handleGalponChange = (event) => {
    setGalponSeleccionado(event.target.value);
  };




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
      alert("ingrese un producto y una cantidad")

    }
  }

  // ELIMINAR PRODUCTO

  const deleteProduct = (id) => {
    const updatedArray = arrayResumen.filter(product => product.id !== id);
    setArrayResumen(updatedArray);
  };


  const handleForm = async (e) => {
    e.preventDefault();

    try {
      // Construir el objeto de datos a enviar
      const data = {

        userId: user.customer.id, // Suponiendo que el usuario tiene una propiedad 'id'
        galponId: galponSeleccionado, // Obtener el ID del galpón seleccionado
        ayer: daySelected,
        items: arrayResumen.map((producto) => ({
          productoId: producto.productoId,
          cnt: producto.cnt
        }))
      };

      // Enviar la solicitud POST utilizando Axios
      const response = await api.post('/remitosProduccion', data);
      console.log(response.data);
      // Manejar la respuesta
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
    } catch (error) {
      // Manejar errores
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
  };
  return (
    <>
      <Menuheader></Menuheader>
      <div>
        <form onSubmit={handleForm}>
          <div className="datos-grales">
            <div className="btn-back">

              <Button
                variant="outlined"

                sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "start", height: "26px", justifySelf: "left", margin: "13px 0px 0px 0px" }}
                onClick={() => (window.location.href = "./")}
              >
                <NavigateBeforeIcon />
                Volver
              </Button>
            </div>
            <h2 >Egreso / Producciones</h2>
            <h2>Datos Generales</h2>
            <span style={{ fontStyle: "italic" }}>Operador :

              {user.customer.nombre} {user.customer.apellido}

            </span>

            <span style={{ fontStyle: "italic" }}>fecha: {now}</span>

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

                {products && products.length > 0 && products.map((prod, i) => (
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
            {/* {mensaje && productoSeleccionado === "" && cantidad === "" && (
              <Alert severity="error">Ingrese la cantidad y el producto deseado</Alert>
            )} */}

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
        <Toaster></Toaster>
      </div>
    </>

  )

};