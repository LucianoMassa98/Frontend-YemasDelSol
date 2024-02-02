import "./listproductitem.css";

export const Listproductitem = ({ producto, cantidad }) => {
  return (
    <div className="l-p-item">
      <h4 className="l-pname">{producto}</h4>
      <h4 className="l-pname">{cantidad}</h4>
    </div>
  );
};
