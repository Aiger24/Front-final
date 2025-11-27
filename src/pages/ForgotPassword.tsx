import React, { useState } from "react";
import logoGob from "../img/logoGob.png";
import "../forgotpass.css";
import { useNavigate } from "react-router-dom";
import logoicon from "../img/logoicon.png";
import { BsChevronLeft } from "react-icons/bs";

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="containerforgotpassword">
            <div className="logo-qroo-forgotpassword">
                <img src={logoicon} alt="Logo Gobierno de Qroo" />
            </div>

            <button
                className="branding-btn"
                type="button"
                onClick={() => navigate('/')}
                aria-label="Ir a inicio"
            >
                <BsChevronLeft className="branding-logo" />
                <h1>Regresar a Enlace QROO</h1>
            </button>

            <div className="forgot-password-card">
                <h2>Recupera tu acceso a Enlace QROO</h2>
                <p className="subtitle">Escribe tu correo electrónico para recuperar tu cuenta. <br />
                    Una vez enviado el formulario, recibirás un correo con las instrucciones para restablecer tu contraseña.
                </p>

                <form id="forgotPasswordForm" className="forgot-password-form" noValidate>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="ejemplo@correo.com"
                            autoComplete="email"
                            required
                        />
                    </div>
                </form>

                <button type="submit" className="btn-submit">Recuperar acceso</button>

                <div className="login-link">
                    ¿Ya tienes una cuenta? <button type="button" className="helper-link" onClick={() => navigate('/login')}>Iniciar sesión</button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;