import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* Logo o nombre del sitio */}
      <h1 className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        Enlace Qroo
      </h1>

      {/* Menú de navegación */}
      <ul className="nav-links">
        <li onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          Inicio
        </li>
        <li onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
          Iniciar sesión
        </li>
        <li onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>
          Registro
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
