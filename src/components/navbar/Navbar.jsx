import { Link, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/images/logo/a898cd470a8c75548b163a338339538c.png";

import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo Mundial Prode" />

          <span>Mundial Prode</span>
        </Link>

        <nav>
          <ul className="nav-links ">
            <NavLink to="/">Inicio</NavLink>

            <li>
              <NavLink to="/ranking" className="nav-link-effect">Ranking </NavLink>
            </li>

            <li>
              <NavLink to="/partidos" className="nav-link-effect"> Partidos </NavLink>
            </li>
          </ul>
        </nav>

        <div className="nav-actions nav-links">
          {user ? (
            <>
              <NavLink to="/perfil" className="welcome">
                Hola, {user.username}
              </NavLink>

              <button className="btn logout-btn" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            /* o */

            <>
              <Link to="/login">Iniciar sesión</Link>

              <Link className="btn register-btn" to="/register">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
