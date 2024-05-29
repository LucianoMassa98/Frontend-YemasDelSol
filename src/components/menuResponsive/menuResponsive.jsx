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
                            <h3 className="h3-menuResponsive" >{loggedUser?.userName}</h3>
                            <div className="contenedor-iconos-menuResponsive">
                                <Link href="" className="link-menuResponsive ">Mi perfil</Link><AccountCircleIcon className="icono-css" />
                                <Link className="link-menuResponsive">Configuracion</Link><SettingsIcon className="icono-css" />
                                <Link className="link-menuResponsive">Soporte</Link><SupportAgentOutlinedIcon className="icono-css"/>
                                <Link  onClick={logout} className="link-menuResponsive">Cerrar sesion</Link>  <LogoutOutlinedIcon className="icono-css"  />
                            </div>
                        </div>



                        {/*Menu icon */}
                        <div >
                            {isMenuOpen ?
                                <div className="menu-icon-menuResponsive-close" onClick={toggleMenu}>
                                    <CloseIcon className="CloseIcon"/>
                                </div>
                                :
                                <div className="menu-icon-menuResponsive" onClick={toggleMenu}>
                                    <MenuIcon className="MenuIcon"
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
