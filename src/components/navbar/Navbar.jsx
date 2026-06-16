import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/images/logo/a898cd470a8c75548b163a338339538c.png";

import "./Navbar.css";

const Navbar = () => {

    const { user, logout } = useAuth();

    return (

        <header className="navbar">

            <div className="container navbar-container">

                <Link to="/" className="logo">

                    <img
                        src={logo}
                        alt="Logo Mundial Prode"
                    />

                    <span>Mundial Prode</span>

                </Link>

                <nav>

                    <ul className="nav-links">

                        <li>
                            <Link to="/">Inicio</Link>
                        </li>

                        <li>
                            <Link to="/ranking">Ranking</Link>
                        </li>

                        <li>
                            <Link to="/partidos">Partidos</Link>
                        </li>

                    </ul>

                </nav>

                <div className="nav-actions">

                    {
                        user ?

                        <>

                            <span className="welcome">

                                Hola, {user.username}

                            </span>

                            <button
                                className="btn logout-btn"
                                onClick={logout}
                            >
                                Cerrar sesión
                            </button>

                        </>

                        : /* o */ 

                        <>

                            <Link to="/login">

                                Iniciar sesión

                            </Link>

                            <Link
                                className="btn register-btn"
                                to="/register"
                            >

                                Registrarse

                            </Link>

                        </>

                    }

                </div>

            </div>

        </header>

    );

};

export default Navbar;