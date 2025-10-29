import ListaProductos from "../components/ListaProductos.jsx";
import LoginRegister from '../components/loginRegister.jsx'
export default function ProductosPage({ agregarCarrito }) {
  return (
    <section className="productos-page">
        
        <LoginRegister />
        <div className="titulo">
            <h1 id="titulo-productos">PRODUCTOS</h1>
        </div> 
        <ListaProductos agregarCarrito={agregarCarrito} />
        </section>
  );
}