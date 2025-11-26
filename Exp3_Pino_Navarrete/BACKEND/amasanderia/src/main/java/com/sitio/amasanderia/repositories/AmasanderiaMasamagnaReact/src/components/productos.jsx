// src/components/Productos.jsx
import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Productos({ producto, agregarCarrito }) {
  const { user } = useAuth();
  const puedeAgregar = producto.estado !== false && producto.stock > 0 && user;

  const handleAgregar = async () => {
    if (!user) {
      alert("Debes iniciar sesión para agregar productos al carrito");
      return;
    }

    const success = await agregarCarrito(producto, 1);
    if (success) {
      // Opcional: mostrar mensaje de éxito
    }
  };

  return (
    <div className="producto">
      <img src={producto.imagenUrl} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p>Precio: ${producto.precio?.toLocaleString("es-CL")}</p>
      <p>Stock: {producto.stock}</p>
      <p>Categoría: {producto.categoria}</p>

      <button 
        disabled={!puedeAgregar} 
        onClick={handleAgregar}
        title={!user ? "Inicia sesión para comprar" : ""}
      >
        {!user 
          ? "Inicia sesión" 
          : !puedeAgregar
            ? producto.stock === 0
              ? "Agotado"
              : "No disponible"
            : "Agregar al carrito"
        }
      </button>
    </div>
  );
}