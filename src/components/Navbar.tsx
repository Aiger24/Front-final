import { useState } from "react";

type NavbarProps = {
  setPage: React.Dispatch<React.SetStateAction<"home" | "about" | "contact">>;
};

function Navbar({ setPage }: NavbarProps) {
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
        <li onClick={() => setPage("home")}>Inicio</li>
        <li onClick={() => setPage("about")}>Iniciar sesión</li>
        <li onClick={() => setPage("contact")}>Registro</li>
      </ul>
    </nav>
  );
}



export default Navbar;
