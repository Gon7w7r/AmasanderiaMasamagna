// src/layouts/AdminLayout.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../assets/css/estilos.css";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation(); // para saber la ruta actual
  const [active, setActive] = useState(location.pathname);

  const irA = (ruta) => {
    navigate(ruta);
    setActive(ruta);
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
          <li className={`nav-item ${active === "/adminUsuarios" ? "active" : ""}`}
            onClick={() => irA("/adminUsuarios")}>
                        <span>👥Usuarios</span>
          </li>
          <li
            className={`nav-item ${active === "/adminPedidos" ? "active" : ""}`}
            onClick={() => irA("/adminPedidos")}
          >
            <span>📋 Pedidos</span>
          </li>
          <li
            className={`nav-item ${active === "/adminConfig" ? "active" : ""}`}
            onClick={() => irA("/adminConfiguracion")}
          >
            <span>⚙️ Configuración</span>
          </li>
          <li
          className="nav-item cerrar-sesion"
          onClick={() => {
            localStorage.removeItem("usuario"); // elimina usuario logueado
            navigate("/login"); // redirige al login
          }}
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
