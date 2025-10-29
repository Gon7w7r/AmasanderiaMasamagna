import { useAdmin } from "../context/AdminContext.jsx";
import "./styles.css";

export default function AdminPanel() {
  const { productos, usuarios, pedidos, ingresos } = useAdmin();

  return (
    <div className="admin-contenedor">
      <div className="barra">
        <h2>Panel de Administración</h2>
        <ul className="nav-menu">
          <li>Panel Principal</li>
          <li>Productos</li>
          <li>Usuarios</li>
          <li>Pedidos</li>
        </ul>
      </div>

      <div className="main-content">
        <h1>¡Hola, Administrador!</h1>
        <div className="estadisticas">
          <div className="tarjeta-estadistica">
            <h3>Total de Productos</h3>
            <p className="numero">{productos.length}</p>
          </div>
          <div className="tarjeta-estadistica">
            <h3>Total de Usuarios</h3>
            <p className="numero">{usuarios.length}</p>
          </div>
          <div className="tarjeta-estadistica">
            <h3>Pedidos del Mes</h3>
            <p className="numero">{pedidos.length}</p>
          </div>
          <div className="tarjeta-estadistica">
            <h3>Ingresos</h3>
            <p className="numero">${ingresos.toLocaleString("es-CL")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
