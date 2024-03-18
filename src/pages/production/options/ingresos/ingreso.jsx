import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import "./ingreso.css";
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
import { useNewingreso } from "../../../../components/hooks/ingreso/use-create-ingreso";
import { useIngresos } from "../../../../components/hooks/ingreso/use-get-ingresos";
import { useOneingreso } from "../../../../components/hooks/ingreso/use-get-one-ingreso";
import { useAdditemingreso } from "../../../../components/hooks/ingreso/use-additem-ingreso";
import { useDeleteitemingreso } from "../../../../components/hooks/ingreso/use-deleteitem-ingreso";
import { useSetgalponingreso } from "../../../../components/hooks/ingreso/use-set-galpon-ingreso";
import { useStore } from "../../../../store/use-store";
import { Loader } from "../../../login/loader";

/* Se muestra durante la carga o si hay un error */

const Dataloadingstatus = ({ estado, stage, now }) => {
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
        <h1>Ingresos</h1>
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

export const Ingreso = () => {
  const data = useProducts();
  const galpones = useGalpones();
  const loggeduser = useStore((state) => state.user);
  const ingresos = useIngresos();
  const ingresomutation = useOneingreso();

  /* to modify */
  const nuevoingreso = useNewingreso();
  const agregaritem = useAdditemingreso();
  const borraritem = useDeleteitemingreso();
  const finalizar = useSetgalponingreso();
  let today = new Date();
  let now = dayjs(today).format("DD/MM/YYYY");

  const [selectedrow, setSelectedrow] = useState([-1, "text"]); //Contiene el numero de producto seleccionado en la lista obtenida y la variante del boton eliminar
  const [itemstoadd, setItemstoadd] = useState([]);
  let productosc2 = useRef(undefined);
  let prodflag =
    useRef(
      false
    ); /* Flag indica si se checkeo si exite una operacion de ingreso en progreso o no */
  let ingresoid =
    useRef(null); /* Contiene la id de la operacion de ingreso en progreso */
  let prodfilterflag =
    useRef(true); /* indica si ya se filtraron los productos con categoria 1 */

  Loader("production");

  /* funciones interactivas */

  const handleSubmit = (entrada) => {
    entrada.producto.cnt = entrada.cantidad;
    let templist = [];
    templist = templist.concat(itemstoadd);
    let selectedproduct = {
      cnt: entrada.producto.cnt,
      compraId: ingresoid.current,
      productoId: entrada.producto.id,
    };
    templist.push(entrada.producto);
    agregaritem.mutate(selectedproduct, {
      onSuccess: () =>
        ingresomutation.mutate(ingresoid.current, {
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
      let datadeletion = [ingresoid.current, itemstoadd[selectedrow[0]].id];
      borraritem.mutate(datadeletion, {
        onSuccess: () =>
          ingresomutation.mutate(ingresoid.current, {
            onSuccess: (data) => setItemstoadd(data.items),
          }),
      });
      setSelectedrow([-1, "text"]);
    }
  };

  const handlefnegreso = (galp) => {
    finalizar.mutate([galp.galpon.id, ingresoid.current], {
      onSuccess: () => window.scrollTo(0, 0),
    });
  };

  /* Verificar si existe una produccion en progreso */

  const verifyproduction = () => {
    let i = 0;
    let max = ingresos.data.length;
    while (i < max) {
      let ingractual = ingresos.data[i];
      if (ingractual.userId === loggeduser.id && ingractual.galponId === null) {
        i = max;
        prodflag.current = true;
        ingresoid.current = ingractual.id;
        ingresomutation.mutate(ingractual.id, {
          onSuccess: (data) => setItemstoadd(data.items),
        });
      }
      i = i + 1;
    }

    if (!prodflag.current) {
      let userobjeto = { userId: loggeduser.id };
      prodflag.current = true;
      nuevoingreso.mutate(userobjeto, {
        onSuccess: (data) => {
          ingresoid.current = data.id;
          ingresomutation.mutate(data.id, {
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
    ingresos.status === "error" ||
    ingresomutation.status === "error"
  ) {
    return <Dataloadingstatus estado="error" stage={1} now={now} />;
  }

  if (
    data.status === "pending" ||
    galpones.status === "pending" ||
    ingresos.status === "pending" ||
    ingresomutation.status === "pending"
  ) {
    if (ingresomutation.status === "pending" && prodflag.current === true) {
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
      if (data.data[i].categoryId === 1) {
        templist.push(data.data[i]);
      }
    }
    console.log(templist, "listacompletada");
    productosc2.current = templist;
  }

  /* Verificacion de produccion */
  if (!prodflag.current && ingresos.isSuccess) {
    verifyproduction();
  }

  /* Finalizacion */

  if (finalizar.isSuccess) {
    return <Dataloadingstatus estado="none" stage={3} now={now} />;
  }

  /* Todo Listo */

  return (
    <div className="egresocontainer">
      <Menuheader />
      <div className="egresocontent">
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          sx={{ display: "flex", flexDirection: "row", justifySelf: "left" }}
          onClick={() => (window.location.href = "./")}
        >
          Volver
        </Button>
        <h1>Ingresos</h1>
        <h2>Datos generales</h2>
        <h4 style={{ fontStyle: "italic" }}>fecha: {now}</h4>
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
            <Stack spacing={3} padding={2}>
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
            <Stack direction="row" spacing={5}>
              <Button
                color="error"
                variant={selectedrow[1]}
                onClick={handleDelete}
              >
                Eliminar producto
              </Button>
              <Button type="submit" sx={{ textDecoration: "underlined" }}>
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
                        cantidad={objeto.CompraProducto.cnt}
                      />
                    </div>
                  ) : (
                    <div onClick={(event) => handleClick(event, key)} key={key}>
                      <Listproductitem
                        producto={objeto.nombre}
                        cantidad={objeto.CompraProducto.cnt}
                      />
                    </div>
                  )
                )
              ) : (
                <h2>Agrega un producto</h2>
              )}
            </div>
          </div>
          <Form onSubmit={handlefnegreso}>
            <Stack padding={2}>
              <label className="e-labels">Galpon</label>
              <Autocomplete
                name="galpon"
                options={galpones.data ?? []}
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) => (
                  <TextField {...params} label="Seleccionar Galpon" />
                )}
              />
            </Stack>
            <Button color="primary" variant="contained" type="submit">
              Guardar Datos de Ingreso
            </Button>
          </Form>
          {finalizar.status === "pending" ? (
            <div>
              <Alert severity="info">Guardando Ingreso...</Alert>
              <CircularProgress />
            </div>
          ) : (
            <div> </div>
          )}
        </div>
      </div>
    </div>
  );
};
