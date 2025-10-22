import { useState, useRef, useEffect } from "react";

function Home() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 ¡Hola! Soy EnlaceBot. ¿En qué puedo ayudarte hoy?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    const newMessage = { sender: "user", text: inputValue };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Respuesta simulada del bot
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Gracias por tu mensaje 😊 pronto te responderé con la información que necesitas.",
        },
      ]);
    }, 900);
  };

  return (
    <main className="home">
      <section className="chat-section">
        <div className="chat-app">
          {/* ==== Encabezado del chat ==== */}
          <div className="chat-header">
            <div className="chat-header-left">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712105.png"
                alt="EnlaceBot avatar"
                className="chat-avatar"
              />
              <div className="chat-info">
                <h3>EnlaceBot</h3>
                <p className="status">🟢 En línea</p>
              </div>
            </div>
            <div className="chat-header-right">
              <i className="fas fa-ellipsis-v"></i>
            </div>
          </div>

          {/* ==== Mensajes ==== */}
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

          {/* ==== Input ==== */}
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} className="send-btn">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </section>

      {/* ==== Sección de apoyos ==== */}
      <section className="info-section">
        <h3 className="main-subtitle">Apoyos más solicitados</h3>

        <div className="info-cards">
          <div className="info-card">
            <img src="https://via.placeholder.com/80" alt="Beca Benito Juárez" />
            <div className="card-content">
              <h4>Beca Benito Juárez</h4>
              <p>Apoyo económico para estudiantes de educación básica, media y superior.</p>
            </div>
          </div>

          <div className="info-card">
            <img src="https://via.placeholder.com/80" alt="Pensión Adultos Mayores" />
            <div className="card-content">
              <h4>Pensión Adultos Mayores</h4>
              <p>Programa de apoyo bimestral para personas mayores de 65 años.</p>
            </div>
          </div>

          <div className="info-card">
            <img src="https://via.placeholder.com/80" alt="Jóvenes Construyendo el Futuro" />
            <div className="card-content">
              <h4>Jóvenes Construyendo el Futuro</h4>
              <p>Capacitación y apoyo económico para jóvenes sin empleo ni estudios.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
