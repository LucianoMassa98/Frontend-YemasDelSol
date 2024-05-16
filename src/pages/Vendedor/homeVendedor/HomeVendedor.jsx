import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ToggleButton from "@mui/material/ToggleButton";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import { api } from "../../../services/api";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
import ModalAddToCart from "../agregarCarrito/ModalAddToCart";
import IconButton from "@mui/material/IconButton";
import { Menuheader } from "../../../components/menuheader";
import InputAdornment from "@mui/material/InputAdornment";
import ActionAreaCard from "../../../components/ActionAreaCard/ActionAreaCard";
import Skeleton from "@mui/material/Skeleton";
import "./HomeVendedor.css";

export default function HomeVendedor() {
  const [openModal, setOpenModal] = React.useState(false);
  const [cantidad, setCantidad] = useState("1");
  const [huevos, setHUevos] = useState([]);
  const [loading, setLoading] = useState(true);
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    {
      label: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
  ];
  const [addToCart, setAddToCart] = useState([]);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const handleChange = (event) => {
    setCantidad(event.target.value);
  };

  const fakePromise = () => new Promise((resolve) => setTimeout(resolve, 1000));

  useEffect(() => {
    try {
      const traerHuevos = async () => {
        await fakePromise();
        const response = await api.get("categories/3");
        setHUevos(response.data.productos);
        setLoading(false);
      };
      traerHuevos();
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Menuheader></Menuheader>
      <div className="container-wave-bg">
        <div className="container-wave">
          <section className="section-form">
            <div className="div-h2">
              <h2>Agregar Productos</h2>
            </div>
            <div className="filtrado-prod">
              <div className="cont-select">
                <label htmlFor="">Producto :</label>
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films}
                  sx={{ width: 270 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Ingrese numero o codigo"
                    />
                  )}
                />
              </div>

              <div className="cantidad">
                <label htmlFor="">Cantidad :</label>

                <TextField
                  type="number"
                  id="outlined-basic"
                  variant="outlined"
                  value={cantidad}
                  onChange={handleChange}
                  sx={{ width: "50%" }}
                  size="small"
                  InputProps={{
                    sx: { p: "0px" }, // Otros estilos específicos para los InputProps
                  }}
                />
              </div>
              <div className="cont-btn">
                <Button variant="contained" color="success">
                  Agregar
                </Button>
              </div>
              <div className="div-prod">
                <label htmlFor="">Buscar </label>

                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ fontSize: "18px" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </section>
          <section className="section-cards">
            {loading
              ? Array.from(new Array(8)).map((_, i) => (
                  <SkeletonLoader key={i} />
                ))
              : huevos.map((huevo, i) => (
                  <ActionAreaCard
                    addToCart={addToCart}
                    setAddToCart={setAddToCart}
                    cantidad={cantidad}
                    handleChange={handleChange}
                    setCantidad={setCantidad}
                    key={huevo.id}
                    nombre={huevo.nombre}
                    precio={huevo.precio}
                    img={
                      "https://s3-alpha-sig.figma.com/img/2419/719c/5ef5720880f32546147fd2bd3e66854b?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EMIJdi4O~9DB4PnQKnaI4Q3PfAnqE9OlmBwNKebaRKYTk6IgXtaHd8lFsLHbLYDTQgAaI2n~PEMuDeh1zrw2RfQ9g6CcqiDd10IchhnZ9-MW15Jjz6nietK4Nwf0DqYf5tA6~zBGaL9YRLtzKG2PQEpXNx5lFcnkJlmsb2kZb4ihScqhDnrw2BNA75pTEtUTSNei1gA9Uei4aeoYT68Xkb1LJexChMxsmCv7AaxJRZ8oyNEb8gp5NjU2MQNlJKDYl9t2rN8ouqVfalML1fMg0v6orq2J-YCcUJ04fkJF-ARgjw1yTgPR0sFdTOwbJj8Go~2MWe7o2jWAPQE1kflQyQ__"
                    }
                  />
                ))}
          </section>

          {/* <div className='btn-ver-mas'>
                    <Button sx={{
                        backgroundColor: "#6170FA", width: "30%", height: "40px", fontSize: "13px", '&:hover': {
                            backgroundColor: "#6170FA",
                        }
                    }} variant="contained">Ver mas</Button>
                </div> */}

          {/* <svg className='wave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,288L16,261.3C32,235,64,181,96,165.3C128,149,160,171,192,202.7C224,235,256,277,288,293.3C320,309,352,299,384,277.3C416,256,448,224,480,197.3C512,171,544,149,576,160C608,171,640,213,672,208C704,203,736,149,768,144C800,139,832,181,864,176C896,171,928,117,960,80C992,43,1024,21,1056,58.7C1088,96,1120,192,1152,234.7C1184,277,1216,267,1248,245.3C1280,224,1312,192,1344,160C1376,128,1408,96,1424,80L1440,64L1440,0L1424,0C1408,0,1376,0,1344,0C1312,0,1280,0,1248,0C1216,0,1184,0,1152,0C1120,0,1088,0,1056,0C1024,0,992,0,960,0C928,0,896,0,864,0C832,0,800,0,768,0C736,0,704,0,672,0C640,0,608,0,576,0C544,0,512,0,480,0C448,0,416,0,384,0C352,0,320,0,288,0C256,0,224,0,192,0C160,0,128,0,96,0C64,0,32,0,16,0L0,0Z"></path></svg> */}
        </div>

        {!openModal && (
          <div onClick={handleOpen} className="cart-icon-container">
            {addToCart.length > 0 && (
              <div className="number-to-cart">
                <span>{addToCart.length > 0 && addToCart.length}</span>
              </div>
            )}
            <AddShoppingCartIcon sx={{ color: "#acac04", fontSize: "45px" }} />
          </div>
        )}

        <ModalAddToCart
          addToCart={addToCart}
          setAddToCart={setAddToCart}
          handleClose={handleClose}
          openModal={openModal}
        ></ModalAddToCart>
      </div>
    </>
  );
}
