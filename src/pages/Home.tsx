import { useState, useRef, useEffect } from "react";
import beca_benito_juarez from "../assets/beca_benito_juarez.jpg";
import adultos_mayores from "../assets/adultos_mayores.jpg";
import jovenes_futuro from "../assets/jovenes_futuro.jpg";
import madres_trabajadoras from "../assets/madres_trabajadoras.jpg";
import sembrando_vida from "../assets/sembrando_vida.jpg";
import ChatHistory from "../components/chathistory";
import Enlacebot from "../assets/Enlacebot.jpg";


interface Message {
  sender: "bot" | "user";
  text: string;
}

interface Apoyo {
  titulo: string;
  descripcion: string;
  detalles: string;
  img: string;
}

function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "👋 ¡Hola! Soy EnlaceBot. ¿En qué puedo ayudarte hoy?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showApoyos, setShowApoyos] = useState(false);
  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [apoyoError, setApoyoError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const subtituloRef = useRef<HTMLHeadingElement | null>(null);
  const apoyosPanelRef = useRef<HTMLDivElement | null>(null);



  useEffect(() => {
    const chatContainer = messagesEndRef.current?.parentElement;
    if (!chatContainer) return;

    const shouldScroll =
      chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight < 150;

    if (shouldScroll) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // 🔧 Mantener el panel de apoyos fijo junto al chatbot

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const nuevoMensaje: Message = { sender: "user", text: inputValue };
    setMessages((prev) => [...prev, nuevoMensaje]);
    setInputValue("");



    // 🔽 Desplazar el chat hacia abajo manualmente
    const chatContainer = messagesEndRef.current?.parentElement;
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Gracias por tu mensaje 😊 pronto te responderé con la información que necesitas.",
        },
      ]);
    }, 800);
  };


  const apoyos: Apoyo[] = [
    {
      titulo: "Beca Benito Juárez",
      descripcion: "Apoyo económico para estudiantes de educación básica, media y superior.",
      detalles:
        "Este programa brinda becas bimestrales a estudiantes de bajos recursos. Busca fomentar la permanencia escolar.",
      img: beca_benito_juarez,
    },
    {
      titulo: "Pensión Adultos Mayores",
      descripcion: "Programa de apoyo bimestral para personas mayores de 65 años.",
      detalles:
        "Ofrece apoyo directo a adultos mayores, garantizando su bienestar social y económico.",
      img: adultos_mayores,
    },
    {
      titulo: "Jóvenes Construyendo el Futuro",
      descripcion: "Capacitación y apoyo económico para jóvenes sin empleo ni estudios.",
      detalles:
        "Capacita a jóvenes en empresas o instituciones durante un año con apoyo económico y seguro médico.",
      img: jovenes_futuro,
    },
    {
      titulo: "Apoyo a Madres Trabajadoras",
      descripcion: "Ayuda económica para madres que trabajan y no cuentan con guardería.",
      detalles:
        "Proporciona recursos mensuales para el cuidado infantil y fomenta la participación laboral femenina.",
      img: madres_trabajadoras,
    },
    {
      titulo: "Sembrando Vida",
      descripcion: "Apoyo a campesinos para el cultivo sostenible y recuperación forestal.",
      detalles:
        "Promueve el desarrollo rural sustentable mediante prácticas agroforestales y producción ecológica.",
      img: sembrando_vida,
    },
  ];

  const apoyosFiltrados = apoyos.filter((a) =>
    a.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const toggleApoyos = () => {
    setShowApoyos(!showApoyos);
    // Si se cierra, limpiar la búsqueda y volver al inicio
    if (showApoyos) {
      setBusqueda("");
      setApoyoError(null);
      // Volver al inicio del scroll del panel
      if (apoyosPanelRef.current) {
        const listDiv = apoyosPanelRef.current.querySelector(".apoyos-list");
        if (listDiv) {
          listDiv.scrollTop = 0;
        }
      }
    }
  };


  const handleEnviarApoyo = (nombre: string) => {
    setApoyoError(null);
    // Validar que el apoyo existe en la lista
    const apoyoExiste = apoyos.some((a) => a.titulo === nombre);
    if (!apoyoExiste) {
      setApoyoError("No se encontró el apoyo seleccionado.");
      return;
    }
    // Validar si el último mensaje enviado por el usuario fue este apoyo
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === "user");
    if (lastUserMsg && lastUserMsg.text === nombre) {
      setApoyoError("Ya enviaste este apoyo. Selecciona otro o pregunta algo diferente.");
      return;
    }
    // Validar longitud del nombre del apoyo
    if (!nombre.trim() || nombre.length === 0) {
      setApoyoError("El apoyo seleccionado no es válido.");
      return;
    }
    // Agregar el apoyo como mensaje del usuario
    const nuevoMensaje: Message = { sender: "user", text: nombre };
    setMessages((prev) => [...prev, nuevoMensaje]);
    // Limpiar búsqueda y cerrar panel después de enviar
    setBusqueda("");
    setShowApoyos(false);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Aquí tienes información sobre "${nombre}". ¿Te gustaría saber más detalles o preguntar por otro apoyo?`,
        },
      ]);
    }, 800);
  };

  const handleSelectHistoryMessage = (text: string) => {
    // Agregar el mensaje del historial al chat como si el usuario lo hubiera escrito
    const nuevoMensaje: Message = { sender: "user", text };
    setMessages((prev) => [...prev, nuevoMensaje]);

    // Simular respuesta del bot
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "He encontrado la información sobre eso. ¿Necesitas más detalles?",
        },
      ]);
    }, 800);
  };

  return (
    <main className="home">

      {/* === Chat Section === */}
      <section className="chat-section">
        <div className="chat-app">
          <div className="chat-header">
            <div className="chat-header-left">
              <img
                src={Enlacebot}
                alt="EnlaceBot"
                className="chat-avatar"
              />
              <div className="chat-info">
                <h3>EnlaceBot</h3>
                <span className="status">Disponible para ayudarte</span>
              </div>
            </div>


            <ChatHistory
              messages={messages}
              onSelectMessage={handleSelectHistoryMessage}
            />


          </div>

          {/* Barra de Apoyos */}
          <div className="apoyos-bar">
            <button
              className="apoyos-toggle"
              onClick={toggleApoyos}
              aria-label="Alternar panel de apoyos"
            >
              📑 Apoyos {showApoyos ? "▲" : "▼"}
            </button>

            <div className={`apoyos-panel ${showApoyos ? "open" : ""}`} ref={apoyosPanelRef}>
              <input
                type="text"
                className="apoyos-search"
                placeholder="Buscar apoyo..."
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setApoyoError(null); // Limpiar error al escribir
                }}
                autoComplete="off"
                aria-label="Buscar apoyo por nombre"
              />
              {apoyoError && (
                <div className="apoyo-error" style={{ color: '#b3261e', margin: '0.5rem 0', fontWeight: 500 }}>
                  {apoyoError}
                </div>
              )}
              <div className="apoyos-list">
                {apoyosFiltrados.length > 0 ? (
                  apoyosFiltrados.map((apoyo, index) => (
                    <div
                      key={index}
                      className="apoyo-item"
                      onClick={() => handleEnviarApoyo(apoyo.titulo)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleEnviarApoyo(apoyo.titulo);
                        }
                      }}
                    >
                      <h4>{apoyo.titulo}</h4>
                      <p>{apoyo.descripcion}</p>
                      <button
                        className="enviar-chat"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnviarApoyo(apoyo.titulo);
                        }}
                        aria-label={`Enviar ${apoyo.titulo} al chat`}
                      >
                        Enviar al chat
                      </button>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: "center", padding: "1rem", color: "#999", fontSize: "0.9rem" }}>
                    <p>{busqueda ? `No se encontraron apoyos con "${busqueda}"` : "Cargando apoyos..."}</p>
                  </div>
                )}
              </div>
            </div>
          </div>


          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.sender === "bot" && (
                  <img
                    src={Enlacebot}
                    alt="Bot"
                    className="msg-avatar"
                  />
                )}
                <p className="bubble">{msg.text}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>


          <div
            className="chat-input-area"

          >
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button
              type="button"
              className="send-btn"
              onClick={handleSend}
              aria-label="Enviar mensaje"
            >
              ➤
            </button>
          </div>


        </div>
      </section>


      {/* === Apoyos Section === */}
      <section className="info-section">
        <h3 ref={subtituloRef} className="main-subtitle">
          Apoyos más solicitados
        </h3>
        <div className="info-cards">
          {apoyos.map((apoyo, index) => (
            <ApoyoCard
              key={index}
              apoyo={apoyo}
              activo={tarjetaSeleccionada === index}
              oculto={tarjetaSeleccionada !== null && tarjetaSeleccionada !== index}
              onExpand={() => setTarjetaSeleccionada(index)}
              onClose={() => setTarjetaSeleccionada(null)}
              subtituloRef={subtituloRef}
              onPreguntar={handleEnviarApoyo}
              messagesEndRef={messagesEndRef}
            />
          ))}
        </div>
      </section>

      <GuiaEnlaceQroo />

    </main>
  );
}

// === Guía de uso de Enlace Qroo ===
function GuiaEnlaceQroo() {
  return (
    <section className="guia-uso">
      <h3 className="guia-titulo"> Guía para usar Enlace Qroo</h3>
      <p className="guia-intro">
        Tu espacio para encontrar apoyos, becas y programas del gobierno fácilmente.
      </p>

      <div className="guia-pasos">
        <div className="guia-card">
          <h4>1. Cómo empezar</h4>
          <p>
            Escribe tu pregunta en el chat, por ejemplo:
            <br />• “Apoyos para madres solteras”
            <br />• “¿Cómo solicitar la beca Benito Juárez?”
            <br />• “Ayuda para adultos mayores”
          </p>
          <p>Presiona el botón <strong>➤ Enviar</strong> o la tecla <strong>Enter</strong>.</p>
        </div>

        <div className="guia-card">
          <h4>2. Usa el botón de Apoyos</h4>
          <p>
            En la parte superior del chat verás el botón <strong>“Apoyos”</strong>.
            <br />Haz clic para ver una lista de apoyos disponibles.
            <br />Selecciona el que te interese y envíalo al chat con un solo clic.
          </p>
        </div>

        <div className="guia-card">
          <h4>3. Buscar apoyos específicos</h4>
          <p>
            Escribe palabras simples como:
            <br />“Beca”, “Adultos mayores”, “Campo”, “Empleo” o “Salud”.
            <br />El chatbot te mostrará los programas relacionados.
          </p>
        </div>

        <div className="guia-card">
          <h4>4. Consejos para una mejor experiencia</h4>
          <ul>
            <li> No te preocupes por escribir perfecto, el bot te entiende.</li>
            <li> Si no entiendes algo, escribe “Explícalo más fácil”.</li>
            <li> No es obligatorio registrarse.</li>
          </ul>
        </div>

        <div className="guia-card">
          <h4>5. Seguridad y confianza</h4>
          <p>
            Enlace Qroo no solicita datos personales.
            <br />Solo ofrece información pública y verificada de fuentes oficiales.
          </p>
        </div>

        <div className="guia-card">
          <h4>6. Usa el Historial de conversaciones</h4>
          <p>
            En la esquina superior derecha del chat encontrarás el botón del <strong>Historial</strong>.
            <br />Aquí puedes ver todas tus preguntas anteriores.
          </p>
          <p>
            <strong>Cómo usarlo:</strong>
            <br />• Haz clic en el botón Historial
            <br />• Busca una pregunta anterior escribiendo palabras clave
            <br />• Selecciona la pregunta que deseas repetir
            <br />• Se agregará automáticamente al chat para que el bot te responda de nuevo
          </p>
        </div>

        <div className="guia-card guia-final">
          <p className="guia-consejo">
            <strong>Consejo del EnlaceBot:</strong> "No tengas miedo de preguntar.
            Estoy aquí para ayudarte a encontrar el apoyo que mereces."
          </p>
        </div>
      </div>
    </section>
  );
}

interface ApoyoCardProps {
  apoyo: Apoyo;
  activo: boolean;
  oculto: boolean;
  onExpand: () => void;
  onClose: () => void;
  subtituloRef: React.RefObject<HTMLHeadingElement>;
  onPreguntar?: (titulo: string) => void;
  messagesEndRef?: React.RefObject<HTMLDivElement>;
}

function ApoyoCard({ apoyo, activo, oculto, onExpand, onClose, subtituloRef, onPreguntar, messagesEndRef }: ApoyoCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [volviendo, setVolviendo] = useState(false);

  useEffect(() => {
    if (activo && cardRef.current && subtituloRef.current) {
      // Posición absoluta de la card dentro del documento
      const cardHeight = cardRef.current.offsetHeight;

      // Posición absoluta del subtítulo dentro del documento
      const subtituloBottom = subtituloRef.current.offsetTop + subtituloRef.current.offsetHeight;

      // Calcula scroll para que la card quede centrada debajo del subtítulo
      const scrollY = subtituloBottom + cardHeight / 2 - window.innerHeight / 2;

      window.scrollTo({
        top: scrollY,
        behavior: "smooth",
      });
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

  const handlePreguntar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVolviendo(true);
    setTimeout(() => {
      setVolviendo(false);
      onClose();
      // Llamar al callback para enviar al chat
      if (onPreguntar) {
        onPreguntar(apoyo.titulo);
      }
      // Scroll hacia el chat
      setTimeout(() => {
        if (messagesEndRef?.current) {
          const chatContainer = messagesEndRef.current.parentElement;
          if (chatContainer) {
            chatContainer.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } else {
          // Fallback si no hay referencia
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }, 100);
    }, 500);
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
            <div className="card-buttons">
              <button className="volver-btn" onClick={handleClose}>
                Volver
              </button>
              <button
                className="preguntar-btn"
                onClick={handlePreguntar}
                aria-label={`Preguntar al chat sobre ${apoyo.titulo}`}
              >
                Preguntar al Chat
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Home;
