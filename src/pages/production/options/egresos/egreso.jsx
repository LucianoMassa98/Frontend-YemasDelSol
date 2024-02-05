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
import { useNewproduct } from "../../../../components/hooks/use-new-product";
import { useEditproduct } from "../../../../components/hooks/use-edit-product";
import { useDeleteproduct } from "../../../../components/hooks/use-delete-product";
import dayjs from "dayjs";
import { useNewproduction } from "../../../../components/hooks/use-create-production";

const buscarposicion = (texto, lista) => {
  let max = lista.length;
  let i = 0;
  let pos = -1;
  while (i < max) {
    if (texto === lista[i]) {
      pos = i;
      i = max;
    }
    i = i + 1;
  }
  return pos;
};

export const Egreso = () => {
  const data = useProducts();
  const galpones = useGalpones();
  const nuevoproducto = useNewproduct();
  const editarproducto = useEditproduct();
  const borrarproducto = useDeleteproduct();
  const nuevaproduccion = useNewproduction();
  let productnames = [];
  let today = new Date();
  let now = dayjs(today).format("DD/MM/YYYY");

  const [selectedrow, setSelectedrow] = useState([-1, "text"]); //Contiene el numero de producto seleccionado en la lista obtenida y la variante del boton eliminar
  const [selectedgalpon, setSelectedgalpon] = useState(null);
  const [selectedproduct, setSelectedproduct] = useState(null);

  const handleSelectedgalpon = (event, value) => {
    setSelectedgalpon(value);
  };

  const handleSelectedproduct = (event, value) => {
    setSelectedproduct(value);
  };

  if (data.status === "success") {
    let max = data.data.length;
    let i = 0;
    for (i = 0; i < max; i++) {
      productnames.push(data.data[i].nombre);
    }
  }

  const handleSubmit = (entrada) => {
    console.log(selectedproduct);
    if (data.status === "success") {
      let lugar = buscarposicion(selectedproduct, productnames);
      if (lugar === -1) {
        console.log("se llego");
        let productonuevo = { nombre: selectedproduct, categoryId: 2 };
        nuevoproducto.mutate(productonuevo, {
          onSuccess: (data) =>
            editarproducto.mutate([data.id, Number(entrada.cantidad)]),
        });
      } else {
        let encontrado = data.data[lugar];
        console.log(encontrado.cnt);
        editarproducto.mutate([encontrado.id, Number(entrada.cantidad)]);
      }
    } else {
      alert("Aun no se cargan los elementos");
    }
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
      let productox = data.data[selectedrow[0]];
      borrarproducto.mutate(productox.id);
      setSelectedrow([-1, "text"]);
    }
  };

  const handleguardaringreso = () => {
    if (galpones.status === "success") {
      let galponesnames = [];
      let max = galpones.data.length;
      let i = 0;
      for (i = 0; i < max; i++) {
        galponesnames.push(galpones.data[i].nombre);
      }
      let lugar = buscarposicion(selectedgalpon, galponesnames);
      nuevaproduccion.mutate(galpones.data[lugar].id);
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
                <label className="e-labels">Galpon</label>
                <Autocomplete
                  name="galpon"
                  options={galpones.data ?? []}
                  onInputChange={handleSelectedgalpon}
                  getOptionLabel={(option) => option.nombre}
                  renderInput={(params) => (
                    <TextField {...params} label="Seleccionar Galpon" />
                  )}
                />
              </Stack>
              <Stack>
                <label className="e-labels">Producto</label>
                <Autocomplete
                  name="producto"
                  options={productnames}
                  onInputChange={handleSelectedproduct}
                  rules={{ required: false }}
                  renderInput={(params) => (
                    <TextField {...params} label="Seleccionar producto" />
                  )}
                  freeSolo
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
              {data.status === "success" ? (
                data.data.map((objeto, key) =>
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
              ) : data.status === "error" ? (
                <Alert severity="error">Error al cargar datos</Alert>
              ) : (
                <CircularProgress />
              )}
            </div>
          </div>
        </div>
        <Button
          color="primary"
          variant="contained"
          onClick={handleguardaringreso}
        >
          Guardar Datos de Ingreso
        </Button>
        {nuevaproduccion.status === "pending" ? (
          <CircularProgress />
        ) : nuevaproduccion.status === "success" ? (
          <Alert severity="success">Cambios Guardados con exito</Alert>
        ) : (
          <p> </p>
        )}
      </div>
    </div>
  );
};
