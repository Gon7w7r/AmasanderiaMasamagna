// src/layouts/AdminLayout.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/css/estilos.css";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth(); // Usar el hook de autenticación
  const [active, setActive] = useState(location.pathname);

  const irA = (ruta) => {
    navigate(ruta);
    setActive(ruta);
  };

  const handleLogout = () => {
    logout(); // Usar la función del contexto
    navigate("/login"); // Redirigir al login
  };

  return (
    <div className="admin-contenedor">
      {/* Sidebar */}
      <aside className="barra">
        <div className="admin-logo">
          <h2>Panel de Administración</h2>
        </div>

        <ul className="nav-menu">
          <li
            className={`nav-item ${active === "/adminIndex" ? "active" : ""}`}
            onClick={() => irA("/adminIndex")}
          >
            <span>🏠 Panel Principal</span>
          </li>
          <li
            className={`nav-item ${active === "/adminProductos" ? "active" : ""}`}
            onClick={() => irA("/adminProductos")}
          >
            <span>📦 Productos</span>
          </li>
          <li 
            className={`nav-item ${active === "/adminUsuarios" ? "active" : ""}`}
            onClick={() => irA("/adminUsuarios")}
          >
            <span>👥 Usuarios</span>
          </li>
          <li
            className={`nav-item ${active === "/adminPedidos" ? "active" : ""}`}
            onClick={() => irA("/adminPedidos")}
          >
            <span>📋 Pedidos</span>
          </li>
          <li
            className={`nav-item ${active === "/adminConfiguracion" ? "active" : ""}`}
            onClick={() => irA("/adminConfiguracion")}
          >
            <span>⚙️ Configuración</span>
          </li>
          <li
            className="nav-item cerrar-sesion"
            onClick={handleLogout}
          >
            <span>🚪 Cerrar Sesión</span>
          </li>
        </ul>
      </aside>

      {/* Contenido principal */}
      <main className="main-content">{children}</main>
    </div>
  );
}