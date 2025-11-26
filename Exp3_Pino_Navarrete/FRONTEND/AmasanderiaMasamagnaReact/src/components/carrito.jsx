// src/components/Carrito.jsx (corregido)
import { useCarrito } from "../context/CarritoContext.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Carrito() {
  const { carrito, eliminarItem, getTotal } = useCarrito();
  const { user } = useAuth();

  const cerrarCarrito = () => {
    const carritoElement = document.getElementById('carrito');
    if (carritoElement) {
      carritoElement.style.display = 'none';
    }
  };

  if (!user) {
    return (
      <div id="carrito" className="carrito">
        <h2>Carrito</h2>
        <p>Debes iniciar sesión para ver el carrito</p>
        <Link to="/login">Iniciar Sesión</Link>
      </div>
    );
  }

  return (
    <div id="carrito" className="carrito">
      <h2>Carrito</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul id="lista-carrito">
            {carrito.map((item) => (
              <li key={item.id}>
                {item.producto?.nombre || item.nombre} (x{item.cantidad}) - 
                ${((item.precioUnitario || item.precio) * item.cantidad).toLocaleString("es-CL")}
                <button 
                  style={{ marginLeft: "10px" }} 
                  onClick={() => eliminarItem(item.id)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
          <p><strong>Total: ${getTotal().toLocaleString("es-CL")}</strong></p>
          <Link to="/carritoResumen" onClick={cerrarCarrito}>
            Ver Carrito Completo
          </Link>
        </>
      )}
    </div>
  );
}