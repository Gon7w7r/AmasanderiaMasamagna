import { useCarrito } from "../context/CarritoContext.jsx";

export default function CarritoResumen() {
  const { carrito, modificarCantidad, eliminarItem, procesarPago, vaciarCarrito } = useCarrito();

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  if (carrito.length === 0)
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

  const aumentarCantidad = (item) => {
    if (item.cantidad >= item.stock) {
      alert(`Solo hay ${item.stock} unidades disponibles de "${item.nombre}".`);
      return;
    }
    modificarCantidad(item.id, 1);
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
                    src={item.imagen || item.imagenUrl}
                    alt={item.nombre}
                    className="imagen-producto"
                  />
                  <span className="nombre-producto">{item.nombre}</span>
                </div>

                <div className="controles-cantidad">
                  <button onClick={() => modificarCantidad(item.id, -1)}>-</button>
                  <span>{item.cantidad}</span>
                  <button
                    onClick={() => aumentarCantidad(item)}
                    disabled={item.cantidad >= item.stock}
                  >
                    +
                  </button>
                  <span>${(item.precio * item.cantidad).toLocaleString("es-CL")}</span>
                  <button onClick={() => eliminarItem(item.id)}>❌</button>
                </div>
              </li>
            ))}
          </ul>

          <div id="abajo-derecha">
            <p>
              <strong>Total: ${total.toLocaleString("es-CL")}</strong>
            </p>
            <button onClick={procesarPago}>Proceder al Pago</button>
            <button onClick={vaciarCarrito}>Vaciar carrito</button>
          </div>
        </div>
      </div>
    </main>
  );
}
