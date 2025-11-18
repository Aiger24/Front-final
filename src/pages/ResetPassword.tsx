import React, { useState } from "react";
import logoGob from "../img/logoGob.png";
import "../forgotpass.css";
import { useNavigate } from "react-router-dom";
import logoicon from "../img/logoicon.png";

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
                <img src={logoicon} alt="Enlace Qroo logo" className="branding-logo" />
                <h1>Regresar a Enlace QROO</h1>
            </button>

            <div className="forgot-password-card">
                <h2>Recupera tu acceso a Enlace QROO</h2>
                <p className="subtitle">Cambiar contraseñas</p>

                <form id="forgotPasswordForm" className="forgot-password-form" noValidate>
                    <div className="form-group">
                        <label htmlFor="password">Ingresa tu nueva contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingresa tu nueva contraseña"
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="passwordConfirm">Confirma tu nueva Contraseña</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            placeholder="Confirma tu nueva contraseña"
                            autoComplete="new-password"
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