import "./Cabecalho.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Cabecalho() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <div className="hamburguer">

                <div className="btnabrir">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        fill="currentColor"
                        className="bi bi-list"
                        id="btn"
                        viewBox="0 0 16 16"
                        onClick={toggleMenu}
                    >
                        <path
                            fillRule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                        />
                    </svg>
                </div>

                <header className={`header ${menuOpen ? 'abrMenu' : ''}`}>
                    <div className="btnfechar" onClick={toggleMenu}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            fill="currentColor"
                            id="btn"
                            className="bi bi-x-lg"
                            viewBox="0 0 16 16"
                        >
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    </div>

                    <nav className="navBar">
                        <ul className="navList">
                            <li>
                                <NavLink 
                                    to="/inicio" 
                                    className={({ isActive }) => isActive ? 'activeLink' : 'navItem'}
                                >
                                    Inicio
                                </NavLink>
                            </li>
                            
                            <li>
                                <NavLink 
                                    to="/notas" 
                                    className={({ isActive }) => isActive ? 'activeLink' : 'navItem'}
                                >
                                    Notas
                                </NavLink>
                            </li>

                            <li>
                                <NavLink 
                                    to="/login" 
                                    className={({ isActive }) => isActive ? 'activeLink' : 'navItem'}
                                >
                                    Sair
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>

                {menuOpen && <div className="escMenu" onClick={toggleMenu}></div>}
            </div>        
        </>
    );
}

export default Cabecalho;
