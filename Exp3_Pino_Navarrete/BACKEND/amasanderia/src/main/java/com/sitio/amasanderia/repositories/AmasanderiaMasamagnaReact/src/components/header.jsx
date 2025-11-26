// src/components/header.jsx
import { useState } from "react";
import carritoLogo from "../../public/images/shoppingcart.png";
import "../assets/css/estilos.css";
import Carrito from "./Carrito.jsx";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header() {
  const [carritoVisible, setCarritoVisible] = useState(false);
  const { getCantidadTotal } = useCarrito();
  const { user, logout } = useAuth();

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
            <li><Link to="/pedidos">Pedidos</Link></li>
          </ul>
        </nav>
      </div>

      <div className="derecha">
        

        {/* Carrito */}
        <div className="carrito-container">
          <a href="#" id="btn-carrito" onClick={toggleCarrito}>
            <img src={carritoLogo} alt="Carrito Logo" className="logo" />
            {getCantidadTotal() > 0 && (
              <span className="carrito-badge">{getCantidadTotal()}</span>
            )}
          </a>

          {carritoVisible && <Carrito />}
        </div>
      </div>
    </header>
  );
}