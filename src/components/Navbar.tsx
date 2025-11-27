import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo o nombre del sitio */}
      <h1 className="logo">Enlace Qroo</h1>


      {/* Menú de navegación */}
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/login">Iniciar sesión</Link></li>
        <li><Link to="/register">Registro</Link></li>
      </ul>
    </nav>
  );
}



export default Navbar;
