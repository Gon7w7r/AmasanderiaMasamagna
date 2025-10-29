import { useState } from "react";
import carritoLogo from "../../public/images/shoppingcart.png";
import "../assets/css/estilos.css";
import Carrito from "./Carrito.jsx";
import { Link } from "react-router-dom";

export default function Header({ carrito, vaciarCarrito, eliminarItem }) {
  const [carritoVisible, setCarritoVisible] = useState(false);
  const toggleCarrito = (e) => {
    e.preventDefault();
    setCarritoVisible(!carritoVisible);
  };

  return (
    <header>
      <div className="izquierda">
        <Link to="/">
          <img src="/images/logo.jpg" alt="Main Logo" className="logo" />
        </Link>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </nav>
      </div>

      <div className="carrito-container">
        <a href="#" id="btn-carrito" onClick={toggleCarrito}>
          <img src={carritoLogo} alt="Carrito Logo" className="logo" />
        </a>

        {carritoVisible && (
          <Carrito
            carrito={carrito}
            vaciarCarrito={vaciarCarrito}
            eliminarItem={eliminarItem}
          />
        )}
      </div>
    </header>
  );
}
