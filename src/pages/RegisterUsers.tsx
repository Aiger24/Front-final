import React, { useState } from "react";
import "../login.css";
import Login from "./Login";


const RegisterUsers: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    return (
        <div className="container">
            <div className="left-panel">
                <h1>Crear Cuenta - Enlace QROO</h1>
                <div className="Text-hero">
                    <h2>Crea tu identidad digital</h2>
                    <p>Registrate para acceder a todos los programas disponibles. Completa tu información de forma segura.</p>
                </div>
            </div>

            <div className="right-panel">
                <div className="form-card">
                    <div className="form-header">
                        <h2>Crear nueva cuenta</h2>
                        <p>Completa tus datos para registrarte</p>
                    </div>


                    <form id="registerForm" className="register-form" noValidate>
                        <div className="form-row"> {/* Agrupa los campos lado a lado */}
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre (s)</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Ingresa tu nombre"
                                    autoComplete="given-name"
                                    required
                                >
                                </input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellido">Apellido (s)</label>
                                <input
                                    type="text"
                                    id="apellido"
                                    name="apellido"
                                    placeholder="Ingresa tu apellido"
                                    autoComplete="family-name"
                                    required
                                >
                                </input>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="ejemplo@correo.com"
                                autoComplete="email"
                                required
                            >
                            </input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Mínimo 8 caracteres"
                                    autoComplete="new-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword((s) => !s)}
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    <svg className="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </button>
                            </div>
                            <div className="password-requeriments" id="passwordRequeriments">
                                <small>La contraseña debe contener:</small>
                                <ul>
                                    <li id="req-length">Mínimo 8 caracteres</li>
                                    <li id="req-uppercase">Al menos una mayúscula</li>
                                    <li id="req-lowercase">Al menos una minúscula</li>
                                    <li id="req-number">Al menos un número</li>
                                </ul>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirma tu Contraseña</label>
                            <div className="password-wrapper">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Mínimo 8 caracteres"
                                    autoComplete="new-password"
                                    required
                                />

                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowConfirmPassword((s) => !s)}
                                    aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    <svg className="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </button>
                            </div>
                            {/*Mensaje de error para contraseñas no coincidentes*/}
                        </div>

                        <div className="actions">
                            <button type="submit" className="btn-submit">Crear Cuenta</button>

                            <div className="login-link">
                                ¿Ya tienes cuenta? <a href="/Login.tsx" className="helper-link">Iniciar sesión</a>
                            </div>
                        </div>

                    </form>

                </div>

            </div>
        </div>
    );
};



export default RegisterUsers;