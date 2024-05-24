import "./menuResponsive.css";
import { useState, useEffect } from "react";

export default function MenuResponsive() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

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
                            <p>texto</p>
                            <p>texto</p>
                            <p>texto</p>
                            <p>texto</p>
                            <p>texto</p>
                        </div>

                        {/*Menu icon */}
                        <div >
                        <div
                            className={`menu-icon-menuResponsive ${isMenuOpen ? "move-menuResponsive" : ""}`}
                            onClick={toggleMenu}
                        >
                            <div className="line1"></div>
                            <div className="line2"></div>
                            <div className="line3"></div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
