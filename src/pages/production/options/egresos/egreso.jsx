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
import { useState } from "react";
import { useProducts } from "../../../../components/hooks/use-products";
import { useGalpones } from "../../../../components/hooks/use-galpones";
import dayjs from "dayjs";
import { useNewproduction } from "../../../../components/hooks/use-create-production";
import { useAdditem } from "../../../../components/hooks/use-add-item-production";

export const Egreso = () => {
  const data = useProducts();
  const galpones = useGalpones();
  const nuevaproduccion = useNewproduction();
  const agregaritem = useAdditem();
  let today = new Date();
  let now = dayjs(today).format("DD/MM/YYYY");

  const [selectedrow, setSelectedrow] = useState([-1, "text"]); //Contiene el numero de producto seleccionado en la lista obtenida y la variante del boton eliminar
  const [itemstoadd, setItemstoadd] = useState([]);
  const [itemsflag, setItemsflag] = useState(0);

  const handleSubmit = (entrada) => {
    console.log(entrada);
    let templist = [...itemstoadd];
    entrada.producto.cnt = entrada.cantidad;
    templist.push(entrada.producto);
    setItemstoadd(templist);
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
      let templist = [];
      let max = itemstoadd.length;
      let i = 0;
      for (i = 0; i < max; i++) {
        if (i != selectedrow[0]) {
          templist.push(itemstoadd[i]);
        }
      }
      setItemstoadd(templist);
      setSelectedrow([-1, "text"]);
    }
  };

  const handleguardaringreso = (valor) => {
    nuevaproduccion.mutate(valor.galpon.id, {
      onSuccess: (data) => saveitemstrigger(data.id, itemstoadd),
    });
  };

  const saveitemstrigger = (prodid, lista) => {
    setItemsflag(1);
    saveallitems(prodid, lista, lista.length - 1);
  };

  const saveallitems = (prodId, lista, iter) => {
    if (iter != -1) {
      let prod = lista[iter];
      let item = { cnt: prod.cnt, produccionId: prodId, productoId: prod.id };
      agregaritem.mutate(item, {
        onSettled: () => saveallitems(prodId, lista, iter - 1),
      });
    } else {
      setItemsflag(2);
    }
  };

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
        <h1>Egreso / Producciones</h1>
        <h2>Datos generales</h2>
        <h4 style={{ fontStyle: "italic" }}>fecha: {now}</h4>
        <h4 style={{ fontStyle: "italic" }}>operador: nombre de usuario</h4>
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
                  options={data.data ?? []}
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
                        cantidad={objeto.cnt}
                      />
                    </div>
                  ) : (
                    <div onClick={(event) => handleClick(event, key)} key={key}>
                      <Listproductitem
                        producto={objeto.nombre}
                        cantidad={objeto.cnt}
                      />
                    </div>
                  )
                )
              ) : (
                <h2>Agrega un producto</h2>
              )}
            </div>
          </div>
          <Form onSubmit={handleguardaringreso}>
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
          {nuevaproduccion.status === "pending" ? (
            <div>
              <CircularProgress />
              <Alert severity="info">Guardando...</Alert>
            </div>
          ) : nuevaproduccion.status === "success" ? (
            <Alert severity="success">Cambios Guardados con exito</Alert>
          ) : nuevaproduccion.status === "error" ? (
            <Alert severity="error">Error al Guardar datos</Alert>
          ) : (
            <p></p>
          )}

          {itemsflag === 1 ? (
            <Alert severity="info">Guardando productos...</Alert>
          ) : itemsflag === 2 ? (
            <Alert severity="info">Carga de productos Finalizada</Alert>
          ) : (
            <p> </p>
          )}
        </div>
      </div>
    </div>
  );
};
