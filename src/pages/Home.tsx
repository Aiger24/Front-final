import { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaArrowUp, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import beca_benito_juarez from "../assets/beca_benito_juarez.jpg";
import adultos_mayores from "../assets/adultos_mayores.jpg";
import jovenes_futuro from "../assets/jovenes_futuro.jpg";
import madres_trabajadoras from "../assets/madres_trabajadoras.jpg";
import sembrando_vida from "../assets/sembrando_vida.jpg";
import ChatHistory from "../components/chathistory";
import Enlacebot from "../assets/Enlacebot.jpg";
import { formatMarkdown } from "./formatMarkdown";
import ReactPlayer from "react-player";
import Howtosend from "../media/1-1.mp4";
import Howtousechat from "../media/1130 (2)(2)-1.mp4";

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
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const textBeforeRecording = useRef("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const subtituloRef = useRef<HTMLHeadingElement | null>(null);
  const apoyosPanelRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleScrollToChat = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  };

  const handleMicClick = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Tu navegador no soporta reconocimiento de voz.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.continuous = true;
    recognition.interimResults = true;

    textBeforeRecording.current = inputValue;

    recognition.onresult = (event: any) => {
      let currentTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setInputValue(textBeforeRecording.current + (textBeforeRecording.current ? " " : "") + currentTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  // 🔧 Botón de scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  useEffect(() => {
    const chatContainer = messagesEndRef.current?.parentElement;
    if (!chatContainer) return;

    // Siempre hacer scroll al fondo para mostrar la respuesta más reciente 
    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isBotTyping]);


  // Función para enviar mensajes al backend - CORREGIDA
  const sendChatMessage = async (message: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          type: "text"
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };
  // Mantener el panel de apoyos fijo junto al chatbot

  const handleSend = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }
    const prompt = inputValue.trim();
    if (!prompt) return;
    setInputValue("");
    handleAIResponse(prompt);
  };

  const handleAIResponse = async (prompt: string) => {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) return;

    setIsBotTyping(true);
    setError(null);
    setMessages((prev) => [...prev, { sender: "user", text: cleanPrompt }]);

    try {
      const data = await sendChatMessage(cleanPrompt);

      // DEBUG: Mostrar toda la respuesta del backend
      console.log("Respuesta completa del backend:", data);

      // CORREGIDO: Usar 'Message' en lugar de 'answer'
      if (data?.Message) {
        const botText = data.Message;
        const formattedText = formatMarkdown(botText);
        setMessages((prev) => [...prev, { sender: "bot", text: formattedText }]);
      } else if (data?.message) {
        // Por si acaso el backend usa 'message' en minúscula
        const botText = data.message;
        const formattedText = formatMarkdown(botText);
        setMessages((prev) => [...prev, { sender: "bot", text: formattedText }]);
      } else {
        console.error("Estructura de respuesta inesperada:", data);
        setError("El backend no envió ninguna respuesta válida.");
      }
    } catch (err) {
      console.error(err);
      setError("No pude conectarme con el bot. Intenta otra vez.");
    } finally {
      setIsBotTyping(false);
    }
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
    handleAIResponse(nombre);
    setBusqueda("");
    setShowApoyos(false);
  };

  const handleSelectHistoryMessage = (text: string) => {
    // Validar si el mensaje ya existe en la conversación actual
    const messageExists = messages.some((m) => m.sender === "user" && m.text === text);
    if (messageExists) {
      // Si el mensaje ya existe, no hacer nada
      console.log("Este mensaje ya está en la conversación");
      return;
    }

    // Si es un mensaje nuevo, enviar
    handleAIResponse(text);
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

            <div className="HelperLink">
              <button
                className="Intruccions"
                type="button"
                onClick={() => {
                  const guiaSection = document.querySelector('.guia-uso');
                  if (guiaSection) {
                    guiaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                ¿Cómo usar Enlace Qroo?
              </button>
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
              📑 Visualizar Apoyos {showApoyos ? <FaChevronUp className="show-list" /> : <FaChevronDown className="show-list" />}
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
                <p
                  className="bubble"
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            ))}
            {isBotTyping && (
              <div className="message bot">
                <img src={Enlacebot} alt="Bot" className="msg-avatar" />
                <p className="bubble">EnlaceBot está respondiendo…</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input
              ref={inputRef}
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
              className={`send-btnAudio ${isRecording ? "recording" : ""}`}
              onClick={handleMicClick}
              aria-label={isRecording ? "Detener grabación" : "Iniciar grabación"}
            >
              <FaMicrophone />
            </button>
            <button
              type="button"
              className="send-btn"
              onClick={handleSend}
              aria-label="Enviar mensaje"
            >
              <RiSendPlaneFill />
            </button>
          </div>

          {error && (
            <p className="chat-error" role="alert" style={{ color: "#b3261e", margin: "0.5rem 1rem" }}>
              {error}
            </p>
          )}
        </div>
      </section>

      {/* === Apoyos Section === */}
      <section className="info-section">
        <h3 ref={subtituloRef} className="main-subtitle">
          Apoyos más solicitados
        </h3>
        {tarjetaSeleccionada !== null && (
          <div
            className="card-overlay"
            onClick={() => setTarjetaSeleccionada(null)}
            aria-label="Cerrar card"
          />
        )}
        <div className="info-cards">
          {apoyos.map((apoyo, index) => (
            <ApoyoCard
              key={index}
              apoyo={apoyo}
              activo={tarjetaSeleccionada === index}
              oculto={tarjetaSeleccionada !== null && tarjetaSeleccionada !== index}
              onExpand={() => setTarjetaSeleccionada(index)}
              onClose={() => setTarjetaSeleccionada(null)}
              onPreguntar={handleEnviarApoyo}
            />
          ))}
        </div>
      </section>

      <GuiaEnlaceQroo onScrollToChat={handleScrollToChat} />

      {isVisible && (
        <button
          type="button"
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Volver al inicio"
        >
          <FaArrowUp />
        </button>
      )}
    </main>
  );
}

// === Guía de uso de Enlace Qroo ===
interface GuiaEnlaceQrooProps {
  onScrollToChat: () => void;
}

// define guia enlace qroo como un componente desde home, control remotto que indicia que haga scroll al chat
function GuiaEnlaceQroo({ onScrollToChat }: GuiaEnlaceQrooProps) {
  return (
    <section className="guia-uso">
      <h3 className="guia-titulo"> 🤖 Guía para usar Enlace Qroo</h3>
      <p className="guia-intro">
        Tu espacio para encontrar apoyos, becas y programas del gobierno fácilmente.
      </p>

      <div className="guia-pasos">
        <div className="guia-card video-layout">
          <div className="left-panelvideo">
            <h4>💬 1. Cómo empezar a usar EnlaceBot</h4>
            <p>
              Escribe tu pregunta en el chat, por ejemplo:
              <br /> 👩‍👧 “Apoyos para madres solteras”
              <br /> 📚 “¿Cómo solicitar la beca Benito Juárez?”
              <br /> 👴 “Ayuda para adultos mayores”
            </p>
            <p>Presiona el botón <strong><RiSendPlaneFill /> Enviar</strong> o la tecla <strong>Enter</strong>.</p>
          </div>

          <div className="right-panelvideo">
            <div className="Video-tuto">
              <video
                src={Howtosend}
                controls
                autoPlay
                
                loop
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
              />
            </div>
          </div>
        </div>

        <div className="guia-card video-layout">
          <div className="left-panelvideo">
            <h4>📋 2. Usa el botón de Apoyos</h4>
            <p>
              En la parte superior del chat verás el botón <strong>“📋 Visualizar Apoyos”</strong>.
              <br />✅ Haz clic para ver una lista de apoyos disponibles.
              <br />✅ Selecciona el que te interese
              <br />✅ Envíalo al chat con un solo clic.
            </p>
          </div>
          <div className="right-panelvideoapoyos">
            <div className="Video-tuto">
              <video
                src={Howtousechat}
                controls
                autoPlay
                loop
                muted
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
              />
            </div>
          </div>
        </div>

        <div className="guia-card">
            <h4>✨ 3. Consejos para una mejor experiencia</h4>
            <p>
              💡 No te preocupes por escribir perfecto, el bot te entiende.
              <br />🗣️ Si no entiendes algo, escribe “Explícalo más fácil”.
              <br />🚫 No es obligatorio registrarse.
            </p>
        </div>

        <div className="guia-card">
          <h4>🔒 4. Seguridad y confianza</h4>
          <p>
            🛡️ Enlace Qroo no solicita datos personales.
            <br />✅ Solo ofrece información pública y verificada de fuentes oficiales.
          </p>
        </div>

        <div className="guia-card">
          <h4>🕐 5. Usa el Historial de conversaciones</h4>
          <p>
            En la esquina superior derecha del chat encontrarás el botón del <strong>Historial</strong>.
            <br />Aquí puedes ver todas tus preguntas anteriores.
          </p>
          <p>
            <strong>Cómo usarlo:</strong>
            <br /> Haz clic en el botón Historial
            <br /> Busca una pregunta anterior escribiendo palabras clave
            <br /> Selecciona la pregunta que deseas repetir
            <br /> Se agregará automáticamente al chat para que el bot te responda de nuevo
          </p>
        </div>

        <div 
        //indicaciones para que al presionar mande directo al chat
          className="guia-card guia-final" 
          onClick={onScrollToChat}
          style={{ cursor: 'pointer' }}
        >
          <p className="guia-consejo">
            <strong>🤖 Consejo del EnlaceBot:</strong> "No tengas miedo de preguntar.
            Estoy aquí para ayudarte a encontrar el apoyo que mereces."
            <br />
            ¿Listo para empezar? ¡Escribe tu primera pregunta! 👇
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
  onPreguntar?: (titulo: string) => void;
}

function ApoyoCard({ apoyo, activo, oculto, onExpand, onClose, onPreguntar }: ApoyoCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activo) {
      // Agregar clase al body para desabilitar scroll
      document.body.classList.add('card-expanded');
    } else {
      // Remover clase al body para habilitar scroll
      document.body.classList.remove('card-expanded');
    }

    return () => {
      document.body.classList.remove('card-expanded');
    };
  }, [activo]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handlePreguntar = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Enviar mensaje al chat
    if (onPreguntar) {
      onPreguntar(apoyo.titulo);
    }
    // Cerrar card primero
    onClose();
    // Hacer scroll al inicio con múltiples métodos y delays
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    setTimeout(scrollToTop, 50);
    setTimeout(scrollToTop, 100);
    setTimeout(scrollToTop, 150);
  };

  return (
    <div
      ref={cardRef}
      className={`info-card 
        ${activo ? "expandido" : ""} 
        ${oculto ? "oculto" : ""}`}
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
