// src/components/MisPedidos.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const API_BASE_URL = "http://localhost:8080/api";

const MisPedidos = () => {
  const [boletas, setBoletas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, token } = useAuth();

  // Cargar boletas del usuario
  useEffect(() => {
    if (user && token) {
      cargarMisBoletas();
    } else {
      setLoading(false);
    }
  }, [user, token]);

  const cargarMisBoletas = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/boletas/usuario/${user.email}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar tus pedidos');
      }

      const boletasData = await response.json();
      setBoletas(boletasData);
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

  // Si no hay usuario autenticado
  if (!user || !token) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Mis Pedidos</h2>
        <div style={{ 
          backgroundColor: "#f8f9fa", 
          padding: "30px", 
          borderRadius: "8px",
          border: "1px solid #e9ecef",
          marginTop: "20px"
        }}>
          <p style={{ fontSize: "18px", marginBottom: "15px" }}>
            <strong>Para ver tus pedidos primero inicia sesión</strong>
          </p>
          <p style={{ color: "#6c757d" }}>
            Inicia sesión con tu cuenta para acceder al historial de tus compras y pedidos realizados.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p>Cargando tus pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p style={{ color: "red" }}>Error: {error}</p>
        <button onClick={cargarMisBoletas} className="btn-primario">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="mis-pedidos">
      <h2>Mis Pedidos</h2>
      
      <div className="estadisticas-personales">
        <p><strong>Total de pedidos:</strong> {boletas.length}</p>
        <p><strong>Total gastado:</strong> ${boletas.reduce((sum, b) => sum + b.montoFinal, 0).toLocaleString("es-CL")}</p>
      </div>

      {boletas.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>No tienes pedidos realizados</p>
          <p>¡Realiza tu primera compra!</p>
        </div>
      ) : (
        <div className="lista-boletas">
          {boletas.map((boleta) => (
            <div key={boleta.id} className="boleta-item">
              <div className="boleta-header">
                <h4>Boleta #{boleta.id}</h4>
                <span className="estado-badge estado-completado">
                  COMPLETADO
                </span>
              </div>
              
              <div className="boleta-info">
                <p><strong>Fecha:</strong> {formatearFecha(boleta.fechaCreacion)}</p>
                <p><strong>Dirección de envío:</strong> {boleta.direccionUsuario}</p>
                <p><strong>Subtotal:</strong> ${boleta.subtotal?.toLocaleString("es-CL")}</p>
                <p><strong>IVA (19%):</strong> ${boleta.iva?.toLocaleString("es-CL")}</p>
                <p><strong>Total pagado:</strong> ${boleta.montoFinal?.toLocaleString("es-CL")}</p>
              </div>

              {boleta.detalles && boleta.detalles.length > 0 && (
                <div className="boleta-detalles">
                  <h5>Productos comprados:</h5>
                  <ul>
                    {boleta.detalles.map((detalle, index) => (
                      <li key={index}>
                        <strong>{detalle.producto?.nombre || detalle.productoNombre || "Producto"}</strong> - 
                        {detalle.cantidad} x ${detalle.precioUnitario?.toLocaleString("es-CL")} = 
                        <strong> ${(detalle.cantidad * detalle.precioUnitario)?.toLocaleString("es-CL")}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisPedidos;