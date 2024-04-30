import { Link } from "react-router-dom";
import "./linkcard-produccion.css";

export const LinkCard = ({ title, icon, children, href }) => {
  return (
    <div className="l-c-principal">
        <div className="l-c-mid">
          <span className="l-c-icon" style={{ fontSize: "59px" }}>{icon}</span>
          <h1 className="l-c-title">{title}</h1>
        </div>
        <div className="l-c-children">{children}</div>
        <Link
        className="link-container"
         to={href}>Ver </Link>
    </div>
  );
};
