import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useStore } from "../../store/use-store";
import "./homePage.css";

export default function HomePage() {
 
  const logout = useStore((state) => state.doLogout);
  
  return (
    <>
      <div className="home-ventas">
        <div className="texto-ventas">
          <img src="yemaslogo.jpeg" width={70} height={70} className="logo-ventas" />
          <div className="texto-ventas-2">
            <h1 className="h1-ventas">Hola Veronica</h1>
            <h3 className="h3-ventas">administracion</h3>
          </div>
        </div>

          <div className="burgeroptions-ventas">
            <p className="burgeroption-ventas">
              <SettingsOutlinedIcon fontSize="large" />
            </p>
            <p className="burgeroption-ventas">
              <SupportAgentOutlinedIcon fontSize="large" />
            </p>
            <p className="burgeroption-ventas-2" onClick={logout}>
              <LogoutOutlinedIcon fontSize="large"  />
            </p>
          </div>
       
      </div>

    </>
  );
}
