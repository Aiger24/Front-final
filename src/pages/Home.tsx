import { useState, useRef, useEffect } from "react";

interface Apoyo {
  titulo: string;
  descripcion: string;
  detalles: string;
  img: string;
}

function Home() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 ¡Hola! Soy EnlaceBot. ¿En qué puedo ayudarte hoy?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const nuevoMensaje = { sender: "user", text: inputValue };
    setMessages((prev) => [...prev, nuevoMensaje]);
    setInputValue("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Gracias por tu mensaje 😊 pronto te responderé con la información que necesitas." },
      ]);
    }, 800);
  };

  const apoyos: Apoyo[] = [
    {
      titulo: "Beca Benito Juárez",
      descripcion: "Apoyo económico para estudiantes de educación básica, media y superior.",
      detalles:
        "Este programa brinda becas bimestrales a estudiantes de bajos recursos. Busca fomentar la permanencia escolar.",
      img: "https://via.placeholder.com/80",
    },
    {
      titulo: "Pensión Adultos Mayores",
      descripcion: "Programa de apoyo bimestral para personas mayores de 65 años.",
      detalles:
        "Ofrece apoyo directo a adultos mayores, garantizando su bienestar social y económico.",
      img: "https://via.placeholder.com/80",
    },
    {
      titulo: "Jóvenes Construyendo el Futuro",
      descripcion: "Capacitación y apoyo económico para jóvenes sin empleo ni estudios.",
      detalles:
        "Capacita a jóvenes en empresas o instituciones durante un año con apoyo económico y seguro médico.",
      img: "https://via.placeholder.com/80",
    },
    {
      titulo: "Apoyo a Madres Trabajadoras",
      descripcion: "Ayuda económica para madres que trabajan y no cuentan con guardería.",
      detalles:
        "Proporciona recursos mensuales para el cuidado infantil y fomenta la participación laboral femenina.",
      img: "https://via.placeholder.com/80",
    },
    {
      titulo: "Sembrando Vida",
      descripcion: "Apoyo a campesinos para el cultivo sostenible y recuperación forestal.",
      detalles:
        "Promueve el desarrollo rural sustentable mediante prácticas agroforestales y producción ecológica.",
      img: "https://via.placeholder.com/80",
    },
  ];

  return (
    <main className="home">
      {/* === Chat Section === */}
      <section className="chat-section">
        <div className="chat-app">
          <div className="chat-header">
            <div className="chat-header-left">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712105.png"
                alt="EnlaceBot"
                className="chat-avatar"
              />
              <div className="chat-info">
                <h3>EnlaceBot</h3>
                <p className="status">🟢 En línea</p>
              </div>
            </div>
            <i className="fas fa-ellipsis-v"></i>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.sender === "bot" && (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4712/4712105.png"
                    alt="Bot"
                    className="msg-avatar"
                  />
                )}
                <p className="bubble">{msg.text}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button className="send-btn" onClick={handleSend}>

            </button>
          </div>
        </div>
      </section>

      {/* === Apoyos Section === */}
      <section className="info-section">
        <h3 className="main-subtitle">Apoyos más solicitados</h3>

        <div className="info-cards">
          {apoyos.map((apoyo, index) => (
            <ApoyoCard
              key={index}
              apoyo={apoyo}
              activo={tarjetaSeleccionada === index}
              oculto={tarjetaSeleccionada !== null && tarjetaSeleccionada !== index}
              onExpand={() => setTarjetaSeleccionada(index)}
              onClose={() => setTarjetaSeleccionada(null)}
            />
          ))}
        </div>



      </section>
    </main>
  );
}

interface ApoyoCardProps {
  apoyo: Apoyo;
  activo: boolean;
  oculto: boolean;
  onExpand: () => void;
  onClose: () => void;
}

function ApoyoCard({ apoyo, activo, oculto, onExpand, onClose }: ApoyoCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [volviendo, setVolviendo] = useState(false);

  // Centra automáticamente la tarjeta seleccionada
  useEffect(() => {
    if (activo && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activo]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVolviendo(true);
    setTimeout(() => {
      setVolviendo(false);
      onClose();
    }, 500); // coincide con duración de animación CSS
  };

  return (
    <div
      ref={cardRef}
      className={`info-card 
        ${activo ? "expandido" : ""} 
        ${oculto ? "oculto" : ""} 
        ${volviendo ? "volviendo" : ""}`}
      onClick={!activo ? onExpand : undefined}
    >
      <img src={apoyo.img} alt={apoyo.titulo} />
      <div className="card-content">
        <h4>{apoyo.titulo}</h4>
        <p>{apoyo.descripcion}</p>

        {activo && (
          <>
            <p className="detalles">{apoyo.detalles}</p>
            <button className="volver-btn" onClick={handleClose}>
              Volver
            </button>
          </>
        )}

      </div>



    </div>
  );
}

export default Home;
