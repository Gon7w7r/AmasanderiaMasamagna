import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../assets/css/estilos.css";

const API_BASE_URL = "http://localhost:8080/api/usuarios";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const valoresIniciales = { correo: "", clave: "" };

  const [form, setForm] = useState(valoresIniciales);
  const [mensajeError, setMensajeError] = useState("");
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario")) || null
  );

  useEffect(() => {
    // Si ya hay un usuario y no estamos en login, redirige
    if (usuario && location.pathname !== "/login") {
      if (usuario.rol === "administrador") navigate("/adminIndex");
      else navigate("/");
    }
  }, [usuario, location.pathname, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    const { correo, clave } = form;
    const regexCorreo = /^[^\s@]+@(gmail\.com|duoc\.cl|profesorduoc\.cl)$/;

    if (!regexCorreo.test(correo) || correo.length > 100)
      return "El correo debe tener un formato válido (gmail.com, duoc.cl o profesorduoc.cl).";
    if (clave.length < 4 || clave.length > 10)
      return "La contraseña debe tener entre 4 y 10 caracteres.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError("");
    const error = validarFormulario();
    if (error) {
      setMensajeError(error);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.correo, contrasena: form.clave }),
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        setMensajeError(errorMsg);
        return;
      }

      const usuarioEncontrado = await response.json();

      localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
      setUsuario(usuarioEncontrado);

      if (usuarioEncontrado.rol === "administrador") navigate("/adminIndex");
      else navigate("/");
    } catch (err) {
      setMensajeError("Error de conexión con el servidor");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    setForm(valoresIniciales);
    navigate("/login");
  };

  return (
    <main>
      <div className="formulario">
        {usuario ? (
          <>
            <h2>Bienvenido, {usuario.nombre}</h2>
            <p><strong>Correo:</strong> {usuario.email}</p>
            <p><strong>Rol:</strong> {usuario.rol}</p>

            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <h2>Login</h2>
            <form id="loginForm" onSubmit={handleSubmit}>
              <label htmlFor="correo">Correo electrónico:</label><br />
              <input
                type="email"
                id="correo"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                required
              /><br /><br />

              <label htmlFor="clave">Contraseña:</label><br />
              <input
                type="password"
                id="clave"
                name="clave"
                value={form.clave}
                onChange={handleChange}
                required
              /><br /><br />

              {mensajeError && (
                <p
                  id="mensajeError"
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  {mensajeError}
                </p>
              )}

              <div id="posicion">
                <button type="submit">Iniciar Sesión</button>
                <Link to="/registro">Registrarse</Link>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  );
};

export default LoginPage;
