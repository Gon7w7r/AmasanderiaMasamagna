import React, { useState, useEffect } from "react";
import "../assets/css/estilos.css";

const API_BASE_URL = 'http://localhost:8080/api';

export default function PedidosLista() {
  const [pedidos, setPedidos] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar boletas desde el backend
  useEffect(() => {
    cargarBoletas();
  }, []);

  const cargarBoletas = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/boletas`);
      
      if (!response.ok) {
        throw new Error('Error al cargar boletas');
      }
      
      const boletas = await response.json();
      
      // Convertir boletas a formato de pedidos
      const pedidosConvertidos = boletas.map(boleta => ({
        id: boleta.id,
        estado: "completado", // Todas las boletas son pedidos completados
        emailUsuario: boleta.emailUsuario,
        direccionUsuario: boleta.direccionUsuario,
        detalles: boleta.detalles || [],
        fechaCreacion: boleta.fechaCreacion,
        subtotal: boleta.subtotal,
        iva: boleta.iva,
        montoFinal: boleta.montoFinal
      }));
      
      setPedidos(pedidosConvertidos);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Formatear fecha
  const formatearFecha = (fechaString) => {
    if (!fechaString) return "No disponible";
    return new Date(fechaString).toLocaleDateString('es-CL');
  };

  const filtrarPedidos = () => {
    return pedidos.filter((pedido) => {
      let match = true;
      
      // Filtrar por estado (aunque todas las boletas son "completado")
      if (estadoFiltro) {
        match = match && pedido.estado === estadoFiltro;
      }
      
      // Filtrar por fecha (si hay fechas seleccionadas)
      if (fechaDesde && pedido.fechaCreacion) {
        const fechaPedido = new Date(pedido.fechaCreacion);
        const desde = new Date(fechaDesde);
        match = match && fechaPedido >= desde;
      }
      
      if (fechaHasta && pedido.fechaCreacion) {
        const fechaPedido = new Date(pedido.fechaCreacion);
        const hasta = new Date(fechaHasta);
        match = match && fechaPedido <= hasta;
      }
      
      return match;
    });
  };

  const pedidosFiltrados = filtrarPedidos();

  if (loading) {
    return (
      <div className="pedidos-lista">
        <p style={{ textAlign: "center", color: "#000" }}>Cargando boletas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pedidos-lista">
        <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>
        <button onClick={cargarBoletas} className="btn-primario">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="pedidos-lista">
      <h2>Gestión de Pedidos (Boletas)</h2>
      
      <div className="filtros">
        <select
          value={estadoFiltro}
          onChange={(e) => setEstadoFiltro(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="completado">Completado</option>
        </select>

        <input
          type="date"
          value={fechaDesde}
          onChange={(e) => setFechaDesde(e.target.value)}
          placeholder="Desde"
        />
        <input
          type="date"
          value={fechaHasta}
          onChange={(e) => setFechaHasta(e.target.value)}
          placeholder="Hasta"
        />
        
        <button onClick={cargarBoletas} className="btn-secundario">
          Actualizar
        </button>
      </div>

      <div className="estadisticas">
        <p>Total de boletas: {pedidos.length}</p>
        <p>Completados: {pedidos.filter(p => p.estado === 'completado').length}</p>
        <p>Total recaudado: ${pedidos.reduce((sum, p) => sum + p.montoFinal, 0).toLocaleString("es-CL")}</p>
        <p>Total IVA: ${pedidos.reduce((sum, p) => sum + p.iva, 0).toLocaleString("es-CL")}</p>
      </div>

      <div id="lista-pedidos">
        {pedidosFiltrados.length === 0 ? (
          <p style={{ textAlign: "center", color: "#000" }}>
            No hay boletas que coincidan con los filtros
          </p>
        ) : (
          pedidosFiltrados.map((pedido) => (
            <div key={pedido.id} className="pedido-item">
              <div className="pedido-header">
                <h4>Boleta #{pedido.id}</h4>
                <span className={`estado-badge estado-${pedido.estado}`}>
                  {pedido.estado.toUpperCase()}
                </span>
              </div>
              
              <div className="pedido-info">
                <p>
                  <strong>Cliente:</strong> {pedido.emailUsuario}
                </p>
                <p><strong>Dirección:</strong> {pedido.direccionUsuario}</p>
                <p><strong>Subtotal:</strong> ${pedido.subtotal?.toLocaleString("es-CL") || "0"}</p>
                <p><strong>IVA (19%):</strong> ${pedido.iva?.toLocaleString("es-CL") || "0"}</p>
                <p><strong>Total:</strong> ${pedido.montoFinal?.toLocaleString("es-CL") || "0"}</p>
                <p><strong>Fecha emisión:</strong> {formatearFecha(pedido.fechaCreacion)}</p>
              </div>

              {pedido.detalles && pedido.detalles.length > 0 && (
                <div className="pedido-items">
                  <h5>Productos:</h5>
                  <ul>
                    {pedido.detalles.map((detalle, index) => (
                      <li key={index}>
                        {detalle.producto?.nombre || detalle.productoNombre || "Producto"} - 
                        {detalle.cantidad} x ${detalle.precioUnitario?.toLocaleString("es-CL")} = 
                        ${(detalle.cantidad * detalle.precioUnitario)?.toLocaleString("es-CL")}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}