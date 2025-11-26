// src/pages/ResumenCarritoPage.jsx
import { useCarrito } from "../context/CarritoContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function CarritoResumen() {
  const { carrito, modificarCantidad, eliminarItem, procesarPago, vaciarCarrito } = useCarrito();
  const { user } = useAuth();
  const navigate = useNavigate();

  const aumentarCantidad = async (item) => {
    const stockDisponible = item.producto?.stock || item.stock;
    if (item.cantidad >= stockDisponible) {
      alert(`Solo hay ${stockDisponible} unidades disponibles de "${item.producto?.nombre || item.nombre}".`);
      return;
    }
    await modificarCantidad(item.id, 1);
  };

  if (!user) {
    return (
      <main id="main-carrito">
        <div id="contenedor-carrito">
          <h2>Resumen de tu Pedido</h2>
          <div id="resumen-carrito" className="resumen-carrito">
            <p>Debes iniciar sesión para ver el carrito</p>
            <button onClick={() => navigate("/login")}>Iniciar Sesión</button>
          </div>
        </div>
      </main>
    );
  }

  const total = carrito.reduce((acc, item) => 
    acc + (item.precioUnitario || item.precio) * item.cantidad, 0
  );

  if (carrito.length === 0) {
    return (
      <main id="main-carrito">
        <div id="contenedor-carrito">
          <h2>Resumen de tu Pedido</h2>
          <div id="resumen-carrito" className="resumen-carrito">
            <p>Tu carrito está vacío</p>
          </div>
        </div>
      </main>
    );
  }

  const handleProcesarPago = async () => {
    const success = await procesarPago();
    if (success) {
      // Opcional: redirigir a una página de confirmación
    }
  };

  return (
    <main id="main-carrito">
      <div id="contenedor-carrito">
        <h2>Resumen de tu Pedido</h2>
        <div id="resumen-carrito" className="resumen-carrito">
          <h3>Resumen del Pedido</h3>
          <ul id="resumen-lista">
            {carrito.map((item) => (
              <li key={item.id} className="item-resumen">
                <div className="info-producto">
                  <img
                    src={item.producto?.imagenUrl || item.imagenUrl}
                    alt={item.producto?.nombre || item.nombre}
                    className="imagen-producto"
                  />
                  <span className="nombre-producto">
                    {item.producto?.nombre || item.nombre}
                  </span>
                </div>

                <div className="controles-cantidad">
                  <button onClick={() => modificarCantidad(item.id, -1)}>-</button>
                  <span>{item.cantidad}</span>
                  <button
                    onClick={() => aumentarCantidad(item)}
                    disabled={item.cantidad >= (item.producto?.stock || item.stock)}
                  >
                    +
                  </button>
                  <span>${((item.precioUnitario || item.precio) * item.cantidad).toLocaleString("es-CL")}</span>
                  <button onClick={() => eliminarItem(item.id)}>❌</button>
                </div>
              </li>
            ))}
          </ul>

          <div id="abajo-derecha">
            <p>
              <strong>Total: ${total.toLocaleString("es-CL")}</strong>
            </p>
            <button onClick={handleProcesarPago}>Proceder al Pago</button>
            <button onClick={vaciarCarrito}>Vaciar carrito</button>
          </div>
        </div>
      </div>
    </main>
  );
}