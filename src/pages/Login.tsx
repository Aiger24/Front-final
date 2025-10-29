import React from "react";
import { useLoginForm } from "../hooks/useLoginForm";
import "../login.css";

const Login: React.FC = () => {
  const [
    { username,
      password,
      showPassword,
      error },

    { setUsername,
      setPassword,
      handleSubmit }

  ] = useLoginForm();

  return (
    <div className="container login-page">
      <div className="left-panel">
        <div className="branding">
          <h1>Enlace QROO</h1>
        </div>
        <div className="hero-text">
          <h2>
            Bienvenido a Enlace QROO, tu plataforma confiable
            <br /> para la gestión de trámites en línea.
          </h2>
          <p>Facilita tus gestiones administrativas con nuestra plataforma segura y eficiente.</p>
        </div>
      </div>

      <div className="right-panel">
        <div className="form-card">
          <form id="loginForm" className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <h2>Bienvenido</h2>

              <div className="form-group">
                <label htmlFor="username">Ingresa tu Correo </label>
                <input
                  type="text"
                  placeholder="Correo"
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
                    data-target="password"
                    aria-label="Mostrar contraseña"
                  >
                    <svg className="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>

                <a href="#" className="helper-link">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {error && <div className="form-error">{error}</div>}

              <div className="actions">
                <button type="submit" className="btn-submit">
                  Iniciar sesión
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => (window.location.href = "/Front-Luis/Register.html")}
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
