import React, { useState } from "react";
import logoGob from "../img/logoGob.png";
import "../login&register.css";
import { useNavigate } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { IoEye, IoEyeOff } from "react-icons/io5";


const RegisterUsers: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();


    return (
        <div className="container">

            <div className="left-panel">
                <div className="logo-qroo">
                    <img src={logoGob} alt="Logo Gobierno de Qroo" />
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
                <div className="Text-hero">
                    <h2>Crea tu identidad digital</h2>
                    <div className="divider-line"></div>
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
                                <label htmlFor="nombre">Nombre de usuario</label>
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
                                    {showPassword ? <IoEyeOff className="eye-icon" /> : <IoEye className="eye-icon" />}
                                </button>
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
                                    {showConfirmPassword ? <IoEyeOff className="eye-icon" /> : <IoEye className="eye-icon" />}
                                </button>
                            </div>
                            {/*Mensaje de error para contraseñas no coincidentes*/}
                        </div>

                        <div className="actions">
                            <button type="submit" className="btn-submit">Crear Cuenta</button>

                            <div className="login-link">
                                ¿Ya tienes una cuenta? <button type="button" className="helper-link" onClick={() => navigate('/login')}>Iniciar sesión</button>
                            </div>
                        </div>

                    </form>

                </div>

            </div>
        </div>
    );
};



export default RegisterUsers;