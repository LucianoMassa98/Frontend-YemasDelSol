import "./menuResponsive.css";
import { useState, useEffect } from "react";
import { useStore } from "../../store/use-store";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";






export default function MenuResponsive() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);


    const logout = useStore((state) => state.doLogout);
    const loggedUser = useStore((state) => state.user);

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


 

    return (
        <>
            <div>
                <div className={`header-menuResponsive ${hasScrolled ? "shadow-menuResponsive" : ""}`}>
                    <div className="nav-menuResponsive container">
                        <div className={`navbar-menuResponsive ${isMenuOpen ? "open-menu" : ""}`}>
                        <h3 className="" >{loggedUser?.userName}</h3>
                          <div className="contenedor-iconos-menuResponsive">
                            <Link href="" className="link-menuResponsive ">Mi perfil</Link><AccountCircleIcon  sx={{width:"60px", color:"orange"}} />
                            <Link className="link-menuResponsive">Configuracion</Link><SettingsIcon  sx={{width:"60px",  color:"orange"}} />
                            <Link className="link-menuResponsive">Soporte</Link><SupportAgentOutlinedIcon  sx={{width:"60px",  color:"orange"}} />
                            <Link className="link-menuResponsive">Cerrar sesion</Link>  <LogoutOutlinedIcon  sx={{width:"60px",  color:"orange"}} />
                            </div>
                            </div>
                            
                       

                        {/*Menu icon */}
                        <div >
                        <div className="menu-icon-menuResponsive" onClick={toggleMenu}>
                                {isMenuOpen ? <CloseIcon sx={{ width: "40px", height: "40px" }} /> : <MenuIcon sx={{ width: "40px", height: "40px", color:"white" }} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
