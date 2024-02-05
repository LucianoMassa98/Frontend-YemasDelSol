import "./listproductitem.css";

export const Listproductitem = ({ producto, cantidad, istitle }) => {
  if (istitle) {
    return (
      <div className="l-p-item">
        <h2 className="l-pname">{producto}</h2>
        <h2 className="l-pname">{cantidad}</h2>
      </div>
    );
  } else {
    return (
      <div className="l-p-item">
        <h4 className="l-pname">{producto}</h4>
        <h4 className="l-pname">{cantidad}</h4>
      </div>
    );
  }
};
