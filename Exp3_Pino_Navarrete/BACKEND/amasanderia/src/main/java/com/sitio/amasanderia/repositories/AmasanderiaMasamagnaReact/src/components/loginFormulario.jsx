// pages/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/css/estilos.css";

const API_BASE_URL = "http://localhost:8080/api/usuarios";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user, logout } = useAuth();
  
  const [form, setForm] = useState({ correo: "", clave: "" });
  const [mensajeError, setMensajeError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (mensajeError) setMensajeError("");
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
      setCargando(true);
      
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: form.correo, 
          contrasena: form.clave 
        }),
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        setMensajeError(errorMsg);
        setCargando(false);
        return;
      }

      const data = await response.json();
      
      // Usar el AuthContext en lugar de localStorage directamente
      login(data.usuario, data.token);
      setForm({ correo: "", clave: "" });

      // Redirigir según el rol
      if (location.pathname === "/login") {
        if (data.usuario.rol === "administrador") {
          navigate("/adminIndex");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setMensajeError("Error de conexión con el servidor");
      console.error("Error en login:", err);
    } finally {
      setCargando(false);
    }
  };

  // Si ya hay un usuario logueado, mostrar información
  if (user) {
    return (
      <main>
        <div className="formulario">
          <h2>Bienvenido, {user.nombre} {user.apellido}</h2>
          
          <div style={{ textAlign: 'left', margin: '20px 0' }}>
            <p><strong>Correo:</strong> {user.email}</p>
            <p><strong>Rol:</strong> {user.rol}</p>
            <p><strong>Región:</strong> {user.region}</p>
            <p><strong>Comuna:</strong> {user.comuna}</p>
            <p><strong>Dirección:</strong> {user.direccion}</p>
            {user.fechaNacimiento && (
              <p><strong>Fecha de Nacimiento:</strong> {new Date(user.fechaNacimiento).toLocaleDateString()}</p>
            )}
            {user.rut && (
              <p><strong>RUT:</strong> {user.rut}</p>
            )}
          </div>

          <button onClick={logout}>Cerrar sesión</button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="formulario">
        <h2>Login</h2>
        
        {mensajeError && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            {mensajeError}
          </p>
        )}

        <form id="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="correo">Correo electrónico:</label><br />
          <input
            type="email"
            id="correo"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            required
            disabled={cargando}
          /><br /><br />

          <label htmlFor="clave">Contraseña:</label><br />
          <input
            type="password"
            id="clave"
            name="clave"
            value={form.clave}
            onChange={handleChange}
            required
            disabled={cargando}
          /><br /><br />

          <div id="posicion">
            <button type="submit" disabled={cargando}>
              {cargando ? "Cargando..." : "Iniciar Sesión"}
            </button>
            <Link to="/registro">Registrarse</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;