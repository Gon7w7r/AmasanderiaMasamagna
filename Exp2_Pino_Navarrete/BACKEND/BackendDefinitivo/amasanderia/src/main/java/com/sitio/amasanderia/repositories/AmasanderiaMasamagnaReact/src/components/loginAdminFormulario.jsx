import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // 👈 para redirigir

const LoginAdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  const navigate = useNavigate(); // 👈 Hook de React Router para redirigir

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (password.length < 4 || password.length > 10) {
      alert("La contraseña debe tener entre 4 y 10 caracteres");
      return;
    }

    // Validación de usuario y contraseña
    if (username === "admin" && password === "admin123") {
      // Redirigir al panel de administración
      navigate("/adminIndex"); // 👈 cambia esta ruta según tu página destino
    } else {
      setErrorVisible(true);
    }
  };

  return (

        <div className="login-container">
          <div className="login-header">
            <h1>Panel de Administración</h1>
            <p>Amasandería Masamagna</p>
          </div>

          <div className="login-form">
            <div className="logo">Masamagna</div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Usuario</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {errorVisible && (
                <div className="error-message" id="errorMessage">
                  Usuario o contraseña incorrectos
                </div>
              )}

              <button type="submit" className="btn-login">
                Iniciar Sesión
              </button>
              <br />
              <br />
              <div id="switch-login">
                <Link to="/login">Cambiar a Cliente</Link>
              </div>
            </form>
          </div>

          <div className="login-footer">
            <p>
              &copy; 2024 Amasandería Masamagna - Todos los derechos reservados
            </p>
          </div>
        </div>
  );
};

export default LoginAdminPage;
