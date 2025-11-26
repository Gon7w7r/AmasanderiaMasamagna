import React, { useState, useEffect } from "react";

export default function AdminConfiguracion() {
  const [nombreTienda, setNombreTienda] = useState("");
  const [emailTienda, setEmailTienda] = useState("");
  const [telefonoTienda, setTelefonoTienda] = useState("");
  const [costoEnvio, setCostoEnvio] = useState("");
  const [diasEntrega, setDiasEntrega] = useState("");

  useEffect(() => {
    const config = JSON.parse(localStorage.getItem("configuracion")) || {};
    setNombreTienda(config.nombreTienda || "");
    setEmailTienda(config.emailTienda || "");
    setTelefonoTienda(config.telefonoTienda || "");
    setCostoEnvio(config.costoEnvio || "");
    setDiasEntrega(config.diasEntrega || "");
  }, []);

  const guardarConfiguracionTienda = (e) => {
    e.preventDefault();
    const config = {
      nombreTienda,
      emailTienda,
      telefonoTienda,
    };
    localStorage.setItem("configuracion", JSON.stringify(config));
    alert("Configuración de la tienda guardada correctamente");
  };

  const guardarConfiguracionEnvios = (e) => {
    e.preventDefault();
    const config = {
      ...JSON.parse(localStorage.getItem("configuracion")),
      costoEnvio,
      diasEntrega,
    };
    localStorage.setItem("configuracion", JSON.stringify(config));
    alert("Configuración de envíos guardada correctamente");
  };

  return (
    <div>
      <h1>Configuración del Sistema</h1>

      <div className="configuracion-opciones">
        <div className="opcion-configuracion">
          <h3>Información de la Tienda</h3>
          <form onSubmit={guardarConfiguracionTienda}>
            <label>Nombre de la Tienda:</label>
            <input
              type="text"
              value={nombreTienda}
              onChange={(e) => setNombreTienda(e.target.value)}
              required
              maxLength={100}
            />

            <label>Email de Contacto:</label>
            <input
              type="email"
              value={emailTienda}
              onChange={(e) => setEmailTienda(e.target.value)}
              required
              maxLength={100}
            />

            <label>Teléfono:</label>
            <input
              type="tel"
              value={telefonoTienda}
              onChange={(e) => setTelefonoTienda(e.target.value)}
              required
            />

            <button type="submit" className="btn-primario">
              Guardar Cambios
            </button>
          </form>
        </div>

        <div className="opcion-configuracion">
          <h3>Configuración de Envíos</h3>
          <form onSubmit={guardarConfiguracionEnvios}>
            <label>Costo de Envío:</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={costoEnvio}
              onChange={(e) => setCostoEnvio(e.target.value)}
            />

            <label>Días de Entrega Estimados:</label>
            <input
              type="number"
              min="1"
              value={diasEntrega}
              onChange={(e) => setDiasEntrega(e.target.value)}
            />

            <button type="submit" className="btn-primario">
              Guardar Configuración
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
