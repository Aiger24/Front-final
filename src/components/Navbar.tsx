

type NavbarProps = {
  setPage: React.Dispatch<React.SetStateAction<"home" | "about" | "contact">>;
};

function Navbar({ setPage }: NavbarProps) {

  return (
    <nav className="navbar">
      {/* Logo o nombre del sitio */}
      <h1 className="logo">Enlace Qroo</h1>




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
