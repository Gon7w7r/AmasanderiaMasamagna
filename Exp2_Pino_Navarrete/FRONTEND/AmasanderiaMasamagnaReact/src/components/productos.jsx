import React from "react";

export default function Productos({ producto, agregarCarrito, carrito }) {
  const puedeAgregar = producto.estado !== false && producto.stock > 0;

  const handleAgregar = () => {
    // Buscar si el producto ya está en el carrito
    const itemEnCarrito = carrito.find((i) => i.id === producto.id);

    if (itemEnCarrito && itemEnCarrito.cantidad >= producto.stock) {
      alert(`Solo hay ${producto.stock} unidades disponibles de "${producto.nombre}".`);
      return;
    }

    agregarCarrito(producto);
  };

  return (
    <div className="producto">
      <img src={producto.imagenUrl} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p>Precio: ${producto.precio?.toLocaleString("es-CL")}</p>
      <p>Stock: {producto.stock}</p>
      <p>Categoría: {producto.categoria}</p>

      <button disabled={!puedeAgregar} onClick={handleAgregar}>
        {!puedeAgregar
          ? producto.stock === 0
            ? "Agotado"
            : "No disponible"
          : "Agregar al carrito"}
      </button>
    </div>
  );
}
