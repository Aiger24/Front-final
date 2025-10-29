import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/Login";
import Contact from "./pages/RegisterUsers";
import "./App.css";

function App() {
  // Estado para controlar la página actual
  const [page, setPage] = useState<"home" | "about" | "contact">("home");

  return (
    // Contenedor general de la aplicación
    <div className="app">
      {/* Navbar ocupa la mitad superior */}
      <Navbar setPage={setPage} />

      {/* Contenido principal que puede desplazarse */}
      <div className="scrollable-content">
        {page === "home" && <Home />}
        {page === "about" && <About />}
        {page === "contact" && <Contact />}
        <Footer />
      </div>
    </div>
  );
}

export default App;
