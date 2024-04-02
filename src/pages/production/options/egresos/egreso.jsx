import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import "./egreso.css";
import { Menuheader } from "../../../../components/menuheader";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { Form } from "../../../../components/form/form";
import { Autocomplete } from "../../../../components/form/autocomplete";
import { TextInput } from "../../../../components/form/text-input";
import { Listproductitem } from "../../../../components/productlist/listproductitem/listproductitem";
import { useRef, useState } from "react";
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
import { Loader } from "../../../login/loader";


/* Se muestra durante la carga o si hay un error */
const Dataloadingstatus = ({ estado, stage, now }) => {
  console.log(stage, "Estage");
  /* Estado opciones loading y error */
  /* Stage number 1: Cargando todo, 2: Cargando lista de productos, 3: Galpon guardado */
  let message = "Cargando datos...";
  if (stage === 2) {
    message = "Cargando lista de productos...";
  }

  return (
    <div className="egresocontainer">
      <Menuheader />{" "}
      <div className="egresocontent">
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          sx={{ display: "flex", flexDirection: "row", justifySelf: "left" }}
          onClick={() => (window.location.href = "./")}
        >
          Volver
        </Button>
        <h1>Egreso / Producciones</h1>
        {stage === 2 ? (
          <div>
            <h2>Datos generales</h2>
            <h4 style={{ fontStyle: "italic" }}>fecha: {now}</h4>
            <h4 style={{ fontStyle: "italic" }}>operador: nombre de usuario</h4>
          </div>
        ) : stage === 3 ? (
          <Alert severity="success">Produccion Guardada</Alert>
        ) : (
          <div> </div>
        )}
        <hr></hr>
        {estado === "loading" ? (
          <div>
            <Alert severity="info">{message}</Alert>
            <CircularProgress />
          </div>
        ) : estado === "error" ? (
          <Alert severity="error">Error al obtener datos</Alert>
        ) : (
          <div> </div>
        )}
      </div>
    </div>
  );
};

/* Componente principal */

export const Egreso = () => {


  const [open, setOpen] = useState(false);
  const data = useProducts();
  const galpones = useGalpones();
  const loggeduser = useStore((state) => state.user);
  const producciones = useProductions();
  const productionmutation = useOneproduction();
  if (producciones.status === "success") {
    console.log(producciones.data, "producciones obtenidas");
  }

  /* to modify */
  const nuevaproduccion = useNewproduction();
  const agregaritem = useAdditem();
  const borraritem = useDeleteitem();
  const finalizar = useSetgalponproduction();
  let today = new Date();
  let now = dayjs(today).format("DD/MM/YYYY");

  const [selectedrow, setSelectedrow] = useState([-1, "text"]); //Contiene el numero de producto seleccionado en la lista obtenida y la variante del boton eliminar
  const [itemstoadd, setItemstoadd] = useState([]);
  let productosc2 = useRef(undefined);
  let prodflag = useRef(false);
  let egresoid = useRef(null);
  let prodfilterflag = useRef(true);

  Loader("production");

  /* funciones interactivas */
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const handleSubmit = (entrada) => {
    // console.log(entrada, "esto es entgrada");
    entrada.producto.cnt = entrada.cantidad;
    let templist = [];
    templist = templist.concat(itemstoadd);
    let selectedproduct = {
      cnt: entrada.producto.cnt,
      produccionId: egresoid.current,
      productoId: entrada.producto.id,
    };
    templist.push(entrada.producto);
    agregaritem.mutate(selectedproduct, {
      onSuccess: () =>
        productionmutation.mutate(egresoid.current, {
          onSuccess: (data) => setItemstoadd(data.items),
        }),
    });
  };

  const handleClick = (datos, llave) => {
    if (llave === selectedrow[0]) {
      setSelectedrow([-1, "text"]);
    } else {
      setSelectedrow([llave, "contained"]);
    }
  };

  const handleDelete = () => {
    if (selectedrow[0] != -1) {
      let datadeletion = [egresoid.current, itemstoadd[selectedrow[0]].id];
      borraritem.mutate(datadeletion, {
        onSuccess: () =>
          productionmutation.mutate(egresoid.current, {
            onSuccess: (data) => setItemstoadd(data.items),
          }),
      });
      setSelectedrow([-1, "text"]);
    }
  };

  const handlefnegreso = (galp) => {
    finalizar.mutate([galp.galpon.id, egresoid.current], {
      onSuccess: () => window.scrollTo(0, 0),
    });
  };

  /* Verificar si existe una produccion en progreso */

  const verifyproduction = () => {
    let i = 0;
    let max = producciones.data.length;
    while (i < max) {
      let prodactual = producciones.data[i];
      if (prodactual.userId === loggeduser.id && prodactual.galponId === null) {
        i = max;
        prodflag.current = true;
        egresoid.current = prodactual.id;
        productionmutation.mutate(prodactual.id, {
          onSuccess: (data) => setItemstoadd(data.items),
        });
      }
      i = i + 1;
    }

    if (!prodflag.current) {
      let userobjeto = { userId: loggeduser.id };
      prodflag.current = true;
      nuevaproduccion.mutate(userobjeto, {
        onSuccess: (data) => {
          egresoid.current = data.id;
          productionmutation.mutate(data.id, {
            onSuccess: (data) => setItemstoadd(data.items),
          });
        },
      });
    }
  };

  /* loading or error status */

  if (
    data.status === "error" ||
    galpones.status === "error" ||
    producciones.status === "error" ||
    productionmutation.status === "error"
  ) {
    return <Dataloadingstatus estado="error" stage={1} now={now} />;
  }
  if (
    data.status === "pending" ||
    galpones.status === "pending" ||
    producciones.status === "pending" ||
    productionmutation.status === "pending"
  ) {
    if (productionmutation.status === "pending" && prodflag.current === true) {
      return <Dataloadingstatus estado="loading" stage={2} now={now} />;
    }
    return <Dataloadingstatus estado="loading" stage={1} now={now} />;
  }

  //filtrarlista

  if (prodfilterflag.current && data.status === "success") {
    prodfilterflag.current = false;
    let i = 0;
    let max = data.data.length;
    let templist = [];
    for (i = 0; i < max; i++) {
      if (data.data[i].categoryId === 2) {
        templist.push(data.data[i]);
      }
    }
    // console.log(templist, "listacompletada");
    productosc2.current = templist;
  }

  /* Verificacion de produccion */
  if (!prodflag.current && producciones.isSuccess) {
    verifyproduction();
  }

  /* Finalizacion */

  if (finalizar.isSuccess) {
    return <Dataloadingstatus estado="none" stage={3} now={now} />;
  }

  /* Todo Listo */
  console.log(itemstoadd, "esto es itemsToadad");
  console.log(data.status, galpones.status, producciones.status, productionmutation.status, "estos son statuis");
  return (
    <>
      <Menuheader />
      <div className="egresocontainer">
        <div className="egresocontent">
          <Button
            variant="outlined"
            startIcon={<NavigateBeforeIcon />}
            sx={{ display: "flex", flexDirection: "row", height: "26px", justifySelf: "left", margin: "13px 0px 13px 0px" }}
            onClick={() => (window.location.href = "./")}
          >
            Volver
          </Button>
          <span className="egres">Egreso / Producciones</span>
          <h3>Datos generales</h3>
          <div className="cont-date">
            <h4 style={{ fontStyle: "italic" }}>fecha: {now}</h4>
          </div>
          <div className="check">
            <label htmlFor=""> Hoy
              <input type="radio" name="opcion" checked /> {/* Primer input */}
            </label>
            <label htmlFor="">Ayer
              <input type="radio" name="opcion" /> {/* Primer input */}
            </label>
          </div>



          <h4 style={{ fontStyle: "italic" }}>
            operador:{" "}
            {` ${loggeduser.customer.nombre} , ${loggeduser.customer.apellido}`}
          </h4>
          <hr></hr>
          <div className="egresoform">
            <Form

              onSubmit={handleSubmit}
              defaultValues={{
                galpon: null,
                producto: null,
                cantidad: null,
              }}

            >

              <Stack spacing={3} sx={{ width: "90vw" }} padding={2}>
                <Stack>
                  <label className="e-labels">Producto</label>
                  <Autocomplete
                    name="producto"
                    options={productosc2.current ?? []}
                    getOptionLabel={(option) => option.nombre}
                    rules={{ required: true }}
                    renderInput={(params) => (
                      <TextField {...params} label="Seleccionar producto" />
                    )}
                  />
                </Stack>
                <Stack>
                  <label className="e-labels">Cantidad</label>
                  <TextInput
                    name="cantidad"
                    type="number"
                    placeholder="Inserte cantidad"
                    variant="outlined"
                    inputProps={{ min: 0 }}
                  />
                </Stack>
              </Stack>
              <Stack sx={{ display: "flex", justifyContent: "center" }} direction="row" spacing={2}>
                <Button
                  color="error"
                  size="small"
                  variant={selectedrow[1]}
                  onClick={handleDelete}
                  sx={{ textDecoration: "underlined", fontSize: "12px", padding: "0px", height: "50px", width: "50%" }}
                >
                  Eliminar producto
                </Button>
                <Button variant="outlined" size="small" type="submit" sx={{ textDecoration: "underlined", fontSize: "12px", padding: "0px", height: "50px", width: "50%" }}>
                  Agregar Producto
                </Button>
              </Stack>
            </Form>
          </div>
          <hr></hr>
          <div className="egresoform">
            <div className="e-resumen">
              <h3 className="e-labels">Resumen</h3>
              <div className="p-lista">
                <Listproductitem producto="Producto" cantidad="Cantidad" />
                <hr id="pldivision"></hr>
                {itemstoadd.length > 0 ? (
                  itemstoadd.map((objeto, key) =>

                    key === selectedrow[0] ? (

                      <div
                        style={{
                          backgroundColor: "Highlight",
                          borderRadius: "10px",
                        }}
                        onClick={(event) => handleClick(event, key)}
                        key={key}
                      >

                        <Listproductitem
                          producto={objeto.nombre}
                          cantidad={objeto.ProduccionProducto.cnt}
                        />
                      </div>
                    ) : (
                      <div onClick={(event) => handleClick(event, key)} key={key}>

                        <Listproductitem
                          producto={objeto.nombre}
                          cantidad={objeto.ProduccionProducto.cnt}
                        />
                      </div>
                    )
                  )
                ) : (
                  <h2>Agrega un producto</h2>
                )}
              </div>
            </div>
            <div className="cont-form">

              <Form onSubmit={handlefnegreso} >

                <Stack padding={2} sx={{ width: "90vw", justifyContent: "center" }}>
                  <label className="e-labels">Galpon</label>
                  <Autocomplete
                    name="galpon"
                    options={galpones.data ?? []}
                    getOptionLabel={(option) => option.nombre}
                    renderInput={(params) => (
                      <TextField {...params} label="Seleccionar Galpon" />
                    )}
                    sx={{ width: "100%" }}
                  />
                </Stack>
                {itemstoadd.length > 0 && (

                  <Button color="primary" variant="contained" type="submit">
                    Guardar Datos de Egreso
                  </Button>
                )}
              </Form>
            </div>
            {finalizar.status === "pending" ? (
              <div>
                <Alert severity="info">Guardando Produccion...</Alert>
                <CircularProgress />
              </div>
            ) : (
              <div> </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
