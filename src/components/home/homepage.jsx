import { useState } from "react";
import "./homePage.css";
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { useStore } from "../../store/use-store";
import { Loader } from "../../pages/login/loader";


export default function HomePage() {

    const loggeduser = useStore((state) => state.user);
    const loggedUser = useStore((state) => state.user);
    Loader("admin");



    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <>
            <div className="home">
                <div className="menu-hamburguer"
                    onClick={() => setMenuVisible(!menuVisible)}
                >
                    &#9776;
                </div>

                <div>
                    <img src="yemaslogo.jpeg" width={56} height={56} />
                </div>
            </div>

            <div>
                {menuVisible &&
                    <div className="menu-desplegable">
                        <h1 className="menu-titulo">Produccion</h1>
                        <h2>Bienvenido, {loggeduser?.userName}!</h2>
                        <p>  <div>
                            {loggedUser && loggedUser.roleId === 1 && (
                                <p>¡Usted es administrador!</p>
                            )}
                        </div></p>
                        <p className="menu-subtitulo">Hola .....</p>
                        <div className="menu-container-main">
                            <div className="menu-container">
                                <Link to="/productionmenu/ingreso" color="inherit" underline="none">
                                    <h4>Ingreso</h4>
                                    <p>En este módulo podrás registrar el <br />
                                        egreso de cartones producidos.</p>
                                </Link>
                            </div>

                            <div className="menu-container">
                                <Link to="/productionmenu/egreso" color="inherit" underline="none">
                                    <h4 >Produccion</h4>
                                    <p>En este módulo podrás registrar el <br />
                                        egreso de cartones producidos</p>
                                </Link>
                            </div>
                            <div className="menu-container">
                                <Link to="/productionmenu/bajas" color="inherit" underline="none">
                                    <h4 >Bajas</h4>
                                    <p>En este módulo podrás registrar las <br />
                                        gallinas que mueran</p>
                                </Link>
                            </div>
                            <div className="menu-container">
                                <Link to="/productionmenu/desechos" color="inherit" underline="none">
                                    <h4 >Desechos</h4>
                                    <p>En este módulo podrás registrar las <br />
                                        rupturas</p>
                                </Link>
                            </div>
                            <div className="menu-container">
                                <Link to="/productionmenu/verdetallesdeldia" color="inherit" underline="none">
                                    <h4 >Informe</h4>
                                    <p>En este módulo podrás gestinar todas <br />
                                        las regstraciones del dia de la fecha</p>
                                </Link>
                            </div>
                            <div className="burgeroptions">
                                <p className="burgeroption" onClick={() => logout()}>
                                    Cerrar sesión
                                </p>
                                <div className="border-line"></div>

                                <p className="burgeroption">Soporte</p>
                                <div className="border-line"></div>
                            </div>
                        </div>


                    </div>}
            </div>

            <div className="home-body">

                <div className="home-administracion">
                    <div>
                        <p className="home-administracion-titulo">Administracion</p>
                        <p className="home-administracion-subtitulo">Hola .....</p>
                    </div>
                    <div className="home-administracion-components">
                        <div className="home-administracion-component-produccion">
                            <Link to="/productionmenu" color="inherit" underline="none">

                                <p className="component-produccion-subtitulo-1">Produccion</p>
                                <p className="component-produccion-texto">En este modulo podras monitorerar <br /> las operaciones que ocurren dentro del area de producción</p>
                            </Link>
                        </div>
                        <div className="home-administracion-component-usuario">
                            <Link to="/adminmenu/users" color="inherit" underline="none">
                                <p className="component-usuarios-subtitulo">Usuarios</p>
                                <p className="component-usuarios-texto">Lorem ipsum dolr amet</p>

                            </Link>
                        </div>

                    </div>


                </div>
            </div>
        </>
    )
}