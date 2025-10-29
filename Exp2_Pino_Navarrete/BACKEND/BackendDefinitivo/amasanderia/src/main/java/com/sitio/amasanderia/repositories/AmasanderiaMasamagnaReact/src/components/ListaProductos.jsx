import React, { useState, useEffect } from "react";
import Productos from "./Productos.jsx";
import FiltroBusqueda from "./buscadorProductos.jsx";
import "../assets/css/estilos.css";
import { useCarrito } from "../context/CarritoContext.jsx";

const API_BASE_URL = "http://localhost:8080/api";

export default function ListaProductos() {
  const [productos, setProductos] = useState({});
  const [productosOriginales, setProductosOriginales] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const { carrito, agregarCarrito } = useCarrito();

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/productos`);
        if (!response.ok) throw new Error("Error al cargar productos");
        const data = await response.json();

        // Filtrar solo productos activos
        const activos = data.filter((prod) => prod.estado !== false);

        // Agrupar productos por categoría
        const agrupados = activos.reduce((acc, prod) => {
          const cat = prod.categoria || "Sin categoría";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(prod);
          return acc;
        }, {});

        setProductos(agrupados);
        setProductosOriginales(agrupados); // Guardar copia original
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  // Efecto para filtrar productos cuando cambia la búsqueda
  useEffect(() => {
    if (!busqueda.trim()) {
      // Si no hay búsqueda, mostrar todos los productos
      setProductos(productosOriginales);
      return;
    }

    const termino = busqueda.toLowerCase().trim();
    
    // Filtrar productos que coincidan con la búsqueda
    const productosFiltrados = Object.keys(productosOriginales).reduce((acc, categoria) => {
      const productosCategoria = productosOriginales[categoria].filter(prod => 
        prod.nombre.toLowerCase().includes(termino) ||
        (prod.descripcion && prod.descripcion.toLowerCase().includes(termino)) ||
        prod.categoria.toLowerCase().includes(termino)
      );
      
      if (productosCategoria.length > 0) {
        acc[categoria] = productosCategoria;
      }
      
      return acc;
    }, {});

    setProductos(productosFiltrados);
  }, [busqueda, productosOriginales]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* Componente de filtro */}
      <FiltroBusqueda busqueda={busqueda} setBusqueda={setBusqueda} />
      
      {/* Mostrar mensaje si no hay resultados */}
      {Object.keys(productos).length === 0 && busqueda && (
        <div className="sin-resultados">
          <p>No se encontraron productos para "{busqueda}"</p>
        </div>
      )}

      {/* Lista de productos */}
      {Object.keys(productos).map((categoria) => (
        <div key={categoria} className="categoria-bloque">
          <h2 className="categoria-titulo">{categoria.toUpperCase()}</h2>
          <div id="productos">
            {productos[categoria].map((prod) => (
              <Productos
                key={prod.id}
                producto={prod}
                carrito={carrito}
                agregarCarrito={agregarCarrito}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}