import { Listproductitem } from "./listproductitem/listproductitem";
import "./product-list.css";

export const Productlist = ({ datos, estado }) => {
  return (
    <div className="p-lista">
      <div id="headerslpi">
        <Listproductitem
          producto="Producto"
          cantidad="Cantidad"
          istitle={true}
        />
      </div>
      {datos.length === 0 ? (
        <p>Sin Elementos</p>
      ) : (
        <p style={{ height: "0px", width: "0px", margin: "0px" }}></p>
      )}
      {estado === "ingreso" &&
        datos.map((objeto, key) => (
          <Listproductitem
            key={key}
            producto={objeto.nombre}
            cantidad={objeto.CompraProducto.cnt}
          />
        ))}
      {estado === "egreso" &&
        datos.map((objeto, key) => (
          <Listproductitem
            key={key}
            producto={objeto.nombre}
            cantidad={objeto.ProduccionProducto.cnt}
          />
        ))}
    </div>
  );
};
