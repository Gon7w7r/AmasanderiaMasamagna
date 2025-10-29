import { useCarrito } from "../context/CarritoContext.jsx";
import { Link } from "react-router-dom";

export default function Carrito() {
  const { carrito, eliminarItem } = useCarrito();
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

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
                {item.nombre} (x{item.cantidad}) - ${item.precio * item.cantidad}
                <button style={{ marginLeft: "10px" }} onClick={() => eliminarItem(item.id)}>❌</button>
              </li>
            ))}
          </ul>
          <p><strong>Total: ${total}</strong></p>
          <Link to="/carritoResumen">Ver Carrito</Link>
        </>
      )}
    </div>
  );
}
