import "./homePage.css";

export default function HomePage() {
  return (
    <>
      <div className="home-ventas">
        <div>
          <img src="yemaslogo.jpeg" width={70} height={70} />
        </div>
        <div className="home-secciones-ventas">
          <h4>Ventas</h4>
          <h4>|</h4>
          <h4>Compras</h4>
          <h4>|</h4>
          <h4>Proveedores</h4>
          <h4>|</h4>
          <h4>Stock</h4>
        </div>
        <div className="home-logo-ventas">
          <p>Logo</p>
        </div>
      </div>
      <div></div>
    </>
  );
}
