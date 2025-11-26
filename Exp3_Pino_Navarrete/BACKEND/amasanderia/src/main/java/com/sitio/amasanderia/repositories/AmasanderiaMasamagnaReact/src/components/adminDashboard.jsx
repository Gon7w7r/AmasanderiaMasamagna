// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import "../assets/css/estilos.css";

const API_BASE_URL = 'http://localhost:8080/api';

export default function AdminDashboard() {
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [productosBajoStock, setProductosBajoStock] = useState(0); // NUEVO
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      setLoading(true);
      
      // Cargar productos y usuarios en paralelo
      const [productosResponse, usuariosResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/productos`),
        fetch(`${API_BASE_URL}/usuarios`)
      ]);

      if (!productosResponse.ok || !usuariosResponse.ok) {
        throw new Error('Error al cargar estadísticas');
      }

      const productos = await productosResponse.json();
      const usuarios = await usuariosResponse.json();

      // Calcular estadísticas
      setTotalProductos(productos.length);
      setTotalUsuarios(usuarios.length);
      
      const ingresos = productos.reduce((total, producto) => {
        return total + (producto.precio * producto.stock);
      }, 0);
      setTotalIngresos(ingresos);

      // Calcular productos con stock bajo 5
      const bajoStock = productos.filter(p => p.stock <= 5).length;
      setProductosBajoStock(bajoStock);

    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="header">
          <h1>¡Hola, Administrador!</h1>
        </div>
        <p>Cargando estadísticas...</p>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="header">
        <h1>¡Hola, Administrador!</h1>
        <div className="user-info">
          <span>Panel de Control</span>
        </div>
      </div>

      <div className="estadisticas">
        <div className="tarjeta-estadistica">
          <h3>Total de Productos</h3>
          <p className="numero">{totalProductos}</p>
          <span className="descripcion">Productos en inventario</span>
        </div>
        
        <div className="tarjeta-estadistica">
          <h3>Total de Usuarios</h3>
          <p className="numero">{totalUsuarios}</p>
          <span className="descripcion">Usuarios registrados</span>
        </div>
        
        <div className="tarjeta-estadistica">
          <h3>Valor Total Inventario</h3>
          <p className="numero">${totalIngresos.toLocaleString("es-CL")}</p>
          <span className="descripcion">Valor total del stock</span>
        </div>

        {/* NUEVO: Productos bajo stock */}
        <div className="tarjeta-estadistica">
          <h3>Productos con Stock Bajo</h3>
          <p className="numero">{productosBajoStock}</p>
          <span className="descripcion">Stock menor a 5 unidades</span>
        </div>
      </div>
    </div>
  );
}
