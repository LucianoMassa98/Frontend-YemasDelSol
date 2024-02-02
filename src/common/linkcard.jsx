import { Link } from "react-router-dom";
import "./linkcard.css";

export const LinkCard = ({ title, icon, children, href }) => {
  return (
    <div className="l-c-principaldiv">
      <Link to={href}>
        <div className="l-c-middiv">
          <span className="l-c-icon">{icon}</span>
          <p className="l-c-title">{title}</p>
        </div>
        <div className="l-c-children">{children}</div>
      </Link>
    </div>
  );
};
