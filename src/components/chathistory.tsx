import { useState, useRef, useEffect } from "react";
import "./chathistory.css";

interface Message {
    sender: "bot" | "user";
    text: string;
}

interface ChatHistoryProps {
    messages: Message[];
    onSelectMessage?: (text: string) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, onSelectMessage }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>("");
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const listContainerRef = useRef<HTMLDivElement>(null);

    // Filtrar mensajes del usuario y ordena por más reciente primero
    const userMessages = messages.filter((m) => m.sender === "user").reverse();

    // Filtrar por búsqueda
    const filteredMessages = userMessages.filter((m) =>
        m.text.toLowerCase().includes(filter.toLowerCase())
    );

    // Validación: mensaje válido
    const isValidMessage = (text: string): boolean => {
        return text.trim().length > 0 && text.trim().length <= 500;
    };

    // Manejador mejorado con validaciones
    const handleSelectMessage = (text: string) => {
        if (!isValidMessage(text)) {
            console.warn("Mensaje inválido");
            return;
        }
        if (onSelectMessage) {
            onSelectMessage(text);
        }
        setOpen(false);
        setSelectedIndex(-1);
    };

    // Manejo de keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent, _index: number, text: string) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleSelectMessage(text);
        }
    };

    // Enfocar input al abrir
    useEffect(() => {
        if (open && searchInputRef.current) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [open]);

    // Limpiar filtro cuando cierra
    const handleClosePanel = () => {
        setOpen(false);
        setFilter("");
        setSelectedIndex(-1);
    };

    return (
        <>
            {/* BOTÓN PARA ABRIR HISTORIAL */}
            <button
                onClick={() => setOpen(!open)}
                className={`history-btn ${open ? "active" : ""}`}
                aria-label={open ? "Cerrar historial" : "Abrir historial de chat"}
                title={`${userMessages.length} búsqueda${userMessages.length !== 1 ? "s" : ""}`}
                aria-expanded={open}
                aria-controls="history-panel"
            >
                <span className="icon">Historial</span>
                <span className="history-count">{userMessages.length}</span>
            </button>

            {/* OVERLAY BACKDROP */}
            {open && (
                <div
                    className="history-backdrop"
                    onClick={handleClosePanel}
                    aria-hidden="true"
                />
            )}

            {/* PANEL DE HISTORIAL */}
            {open && (
                <div className="history-panel" id="history-panel" role="dialog" aria-modal="true" aria-label="Historial de búsquedas">
                    <div className="history-header">
                        <div className="history-header-content">
                            <h3>Búsquedas Recientes</h3>
                            <p className="history-count-label">{filteredMessages.length > 0 ? `${filteredMessages.length} resultado${filteredMessages.length !== 1 ? "s" : ""}` : ""}</p>
                        </div>
                        <button
                            onClick={handleClosePanel}
                            className="close-btn"
                            aria-label="Cerrar historial"
                            title="Cerrar (Esc)"
                        >
                            <span>✕</span>
                        </button>
                    </div>

                    <div className="history-search">
                        <div className="search-wrapper">
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Buscar tus búsquedas..."
                                value={filter}
                                onChange={(e) => {
                                    setFilter(e.target.value);
                                    setSelectedIndex(-1);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Escape") handleClosePanel();
                                }}
                                className="history-search-input"
                                aria-label="Buscar en historial"
                                maxLength={100}
                            />
                            {filter && (
                                <button
                                    onClick={() => {
                                        setFilter("");
                                        searchInputRef.current?.focus();
                                    }}
                                    className="clear-search-btn"
                                    aria-label="Limpiar búsqueda"
                                    title="Limpiar"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="history-content" ref={listContainerRef}>
                        {filteredMessages.length === 0 ? (
                            <div className="placeholder-container">
                                <div className="placeholder-icon">📋</div>
                                <p className="placeholder">
                                    {userMessages.length === 0
                                        ? "Aún no tienes búsquedas guardadas"
                                        : filter
                                            ? "No encontramos coincidencias"
                                            : "Sin búsquedas disponibles"}
                                </p>
                                {filter && (
                                    <button
                                        onClick={() => setFilter("")}
                                        className="reset-search-btn"
                                    >
                                        Ver todas
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="historial-list">
                                {filteredMessages.map((msg, index) => (
                                    <div
                                        key={`${msg.text}-${index}`}
                                        className={`historial-item ${selectedIndex === index ? "selected" : ""}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleSelectMessage(msg.text)}
                                        onKeyDown={(e) => handleKeyDown(e, index, msg.text)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        onMouseLeave={() => setSelectedIndex(-1)}
                                    >
                                        <div className="item-content">
                                            <div className="history-message-text" title={msg.text}>
                                                {msg.text}
                                            </div>
                                            <span className="item-timestamp">Hace poco</span>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelectMessage(msg.text);
                                            }}
                                            className="send-history-btn"
                                            aria-label={`Enviar búsqueda: ${msg.text}`}
                                            title="Enviar al chat"
                                        >
                                            <span className="btn-icon">➤</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="history-footer">
                        <small>Presiona <kbd>Esc</kbd> para cerrar • <kbd>Enter</kbd> para enviar</small>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatHistory;
