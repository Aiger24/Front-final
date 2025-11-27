import React from "react";
import { useLoginForm } from "../hooks/useLoginForm";
import "../login&register.css";
import logoGob from "../img/logoGob.png";
import logoicon from "../img/logoicon.png";
import { useNavigate } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login: React.FC = () => {
  const [
    { username,
      password,
      showPassword,
      error },

    { setUsername,
      setPassword,
      togglePassword,
      handleSubmit }

  ] = useLoginForm();
  const navigate = useNavigate();

  return (
    <div className="container login-page">
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
        <div className="hero-text">
          <h2>
            Bienvenido a Enlace QROO, tu plataforma confiable para la gestión de trámites en línea.
          </h2>
          <div className="divider-line"></div>
          <p>Facilita tus gestiones administrativas con nuestra plataforma segura y eficiente.</p>
        </div>
      </div>

      <div className="right-panel">
        <div className="form-card">
          <form id="loginForm" className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <h2>Bienvenido</h2>

              <div className="form-group">
                <label htmlFor="username">Ingresa tu Correo o Nombre de usuario</label>
                <input
                  type="text"
                  placeholder="Correo o Nombre de usuario"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Ingresa tu contraseña</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="password"
                    placeholder="Contraseña"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={togglePassword}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <IoEyeOff className="eye-icon" /> : <IoEye className="eye-icon" />}
                  </button>
                </div>

                <button type="button" className="helper-link" onClick={() => navigate('/forgot')}>
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {error && <div className="form-error">{error}</div>}

              <div className="actions">
                <button type="submit" className="btn-submit">
                  Iniciar sesión
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate('/register')}
                >
                  Crear nueva cuenta
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
