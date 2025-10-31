import React, { useState } from "react";
import "./App.css";

const InfoCards = ({ cardsData }) => {
    const [expandedCard, setExpandedCard] = useState(null);
    const [closingCard, setClosingCard] = useState(null);

    const handleExpand = (id) => {
        if (expandedCard === id) return; // evita reabrir la misma card
        setExpandedCard(id);
    };

    const handleClose = (id) => {
        setClosingCard(id); // activa animación "regresando"
        setTimeout(() => {
            setExpandedCard(null);
            setClosingCard(null);
        }, 550); // tiempo igual a la duración de la animación bounceBack
    };

    return (
        <div className="info-cards">
            {cardsData.map((card) => {
                const isExpanded = expandedCard === card.id;
                const isClosing = closingCard === card.id;

                return (
                    <div
                        key={card.id}
                        className={`info-card 
              ${isExpanded ? "expandido" : ""} 
              ${isClosing ? "regresando" : ""} 
              ${expandedCard && expandedCard !== card.id ? "oculto" : ""}`}
                        onClick={() => !isExpanded && handleExpand(card.id)}
                    >
                        <img src={card.image} alt={card.title} />
                        <div className="card-content">
                            <h4>{card.title}</h4>
                            <p>{card.shortDescription}</p>

                            {isExpanded && (
                                <div className="detalles">
                                    <p>{card.fullDescription}</p>

                                    {/* 🔽 FUTURO: secciones adicionales con animación estable */}
                                    {card.requisitos && (
                                        <div className="extra-section">
                                            <h5>Requisitos:</h5>
                                            <ul>
                                                {card.requisitos.map((req, i) => (
                                                    <li key={i}>{req}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {card.documentos && (
                                        <div className="extra-section">
                                            <h5>Documentos necesarios:</h5>
                                            <ul>
                                                {card.documentos.map((doc, i) => (
                                                    <li key={i}>{doc}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <button
                                        className="volver-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClose(card.id);
                                        }}
                                    >
                                        Volver
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default InfoCards;
