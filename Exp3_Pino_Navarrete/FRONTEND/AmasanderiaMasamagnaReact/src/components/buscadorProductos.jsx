// components/FiltroBusqueda.jsx
import React from "react";
import "../assets/css/estilos.css";

export default function FiltroBusqueda({ busqueda, setBusqueda }) {
  return (
    <div className="filtro-busqueda">
      <input
        type="text"
        placeholder="Buscar productos... (ej: torta)"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="input-busqueda"
      />
    </div>
  );
}