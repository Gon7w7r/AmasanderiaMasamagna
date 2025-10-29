import React, { useState, useEffect } from "react";
import "../assets/css/estilos.css";
// Datos de ejemplo temporales
const pedidosEjemplo = [
  { id: 1, estado: "pendiente" },
  { id: 2, estado: "procesando" },
  { id: 3, estado: "completado" },
];

export default function PedidosLista() {
  const [pedidos, setPedidos] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  useEffect(() => {
    // Simula cargar pedidos
    setPedidos(pedidosEjemplo);
  }, []);

  const filtrarPedidos = () => {
    return pedidos.filter((p) => {
      let match = true;
      if (estadoFiltro) match = match && p.estado === estadoFiltro;
      // Aquí podrías filtrar por fecha si tuvieras la propiedad fecha
      return match;
    });
  };

  const pedidosFiltrados = filtrarPedidos();

  return (
    <div className="pedidos-lista">
      <div className="filtros">
        <select
          value={estadoFiltro}
          onChange={(e) => setEstadoFiltro(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="procesando">Procesando</option>
          <option value="completado">Completado</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <input
          type="date"
          value={fechaDesde}
          onChange={(e) => setFechaDesde(e.target.value)}
        />
        <input
          type="date"
          value={fechaHasta}
          onChange={(e) => setFechaHasta(e.target.value)}
        />
      </div>

      <div id="lista-pedidos">
        {pedidosFiltrados.length === 0 ? (
          <p style={{ textAlign: "center", color: "#000" }}>
            No hay pedidos registrados
          </p>
        ) : (
          pedidosFiltrados.map((pedido) => (
            <div key={pedido.id} className="pedido-item">
              <h4>Pedido #{pedido.id || "N/A"}</h4>
              <p>Estado: {pedido.estado || "Pendiente"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
