import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [search, setSearch] = useState("");
  return (
    <nav className="navbar">
      {/* Logo o nombre del sitio */}
      <h1 className="logo">Enlace Qroo</h1>

    {/* 🔹 BARRA DE BÚSQUEDA */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => alert(`Buscando: ${search}`)}>🔍</button>
      </div>


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
