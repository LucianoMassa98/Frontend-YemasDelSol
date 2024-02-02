import { Alert, CircularProgress } from "@mui/material";
import { useProducts } from "../hooks/use-products";
import { Listproductitem } from "./listproductitem/listproductitem";
import "./product-list.css";

export const Productlist = () => {
  let datos = useProducts();

  return (
    <div className="p-lista">
      <Listproductitem producto="Producto" cantidad="Cantidad" />
      <hr id="pldivision"></hr>
      {datos.status === "pending" && (
        <div>
          <CircularProgress />
          Cargando...
        </div>
      )}
      {datos.status === "success" &&
        datos.data.map((objeto, key) => (
          <Listproductitem
            key={key}
            producto={objeto.nombre}
            cantidad={objeto.cnt}
          />
        ))}
      {datos.status === "error" && (
        <Alert severity="error" variant="outlined">
          Error, no se pudo obtener la lista de productos
        </Alert>
      )}
    </div>
  );
};
