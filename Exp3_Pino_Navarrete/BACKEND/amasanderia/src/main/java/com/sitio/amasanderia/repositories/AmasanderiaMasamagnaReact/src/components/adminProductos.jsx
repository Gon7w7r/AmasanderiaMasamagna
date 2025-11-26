import React, { useState, useEffect } from "react";
import "../assets/css/estilos.css";

const API_BASE_URL = 'http://localhost:8080/api';

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [alertaStock, setAlertaStock] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productosOriginales, setProductosOriginales] = useState([]);


  // Cargar productos desde el backend
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
  try {
    setLoading(true);
    const response = await fetch(`${API_BASE_URL}/productos`);

    if (!response.ok) {
      throw new Error('Error al cargar productos');
    }

    const data = await response.json();
    setProductos(data);             // Lista que se muestra
    setProductosOriginales(data);   // Copia original sin filtros

    const tieneStockBajo = data.some((p) => p.stock <= 5);
    setAlertaStock(tieneStockBajo);
  } catch (err) {
    setError(err.message);
    console.error('Error:', err);
  } finally {
    setLoading(false);
  }
};


  const abrirModalNuevo = () => {
    setProductoEditar(null);
    setMostrarModal(true);
  };

  const abrirModalEditar = (producto) => {
    setProductoEditar(producto);
    setMostrarModal(true);
  };

  const eliminarProducto = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Error al eliminar producto');
        }

        await cargarProductos(); // Recargar la lista
        alert("Producto eliminado correctamente");
      } catch (err) {
        alert("Error al eliminar producto: " + err.message);
      }
    }
  };

    const desactivarProducto = async (id) => {
    if (window.confirm("¿Estás seguro de cambiar el estado de este producto?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/productos/${id}/desactivar`, {
          method: 'PATCH'
        });

        if (!response.ok) {
          throw new Error("Error al desactivar el producto");
        }

        await cargarProductos();
        alert("Producto desactivado correctamente");
      } catch (err) {
        alert("Error al desactivar: " + err.message);
      }
    }
  };

  const activarProducto = async (id) => {
  if (window.confirm("¿Estás seguro de activar este producto?")) {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/${id}/activar`, {
        method: 'PATCH'
      });

      if (!response.ok) {
        throw new Error("Error al activar el producto");
      }

      await cargarProductos();
      alert("Producto activado correctamente");
    } catch (err) {
      alert("Error al activar: " + err.message);
    }
  }
};


  


  const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;

  const fechaActual = new Date().toISOString(); // Fecha en formato ISO para backend

  const productoData = {
    nombre: form.nombre.value,
    descripcion: form.descripcion.value,
    precio: parseFloat(form.precio.value),
    stock: parseInt(form.stock.value),
    categoria: form.categoria.value,
    imagenUrl: productoEditar?.imagenUrl || "", // Mantener imagenUrl si existe
    estado: productoEditar?.estado !== undefined ? productoEditar.estado : true,
    fechaCreacion: productoEditar ? productoEditar.fechaCreacion : fechaActual // Si se edita, mantener la fecha original
  };

  try {
    let response;

    if (productoEditar) {
      // Actualizar producto existente
      response = await fetch(`${API_BASE_URL}/productos/${productoEditar.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoData)
      });
    } else {
      // Crear nuevo producto
      response = await fetch(`${API_BASE_URL}/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoData)
      });
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error al ${productoEditar ? 'actualizar' : 'crear'} producto`);
    }

    await cargarProductos(); // Recargar la lista
    setMostrarModal(false);
    alert(`Producto ${productoEditar ? "actualizado" : "creado"} correctamente`);

  } catch (err) {
    alert("Error: " + err.message);
  }
};


  // Función de filtrado
    const filtrarProductos = (termino = "", categoria = "") => {
    let filtrados = [...productosOriginales];

    // Filtro por búsqueda
    if (termino) {
      filtrados = filtrados.filter((p) =>
        p.nombre.toLowerCase().includes(termino.toLowerCase())
      );
    }

    // Filtro por categoría
    if (categoria) {
      if (categoria === "desactivados") {
        filtrados = filtrados.filter((p) => p.estado === false);
      } else {
        filtrados = filtrados.filter((p) => p.categoria === categoria);
      }
    }

    setProductos(filtrados);
  };



  if (loading) {
    return (
      <div className="main-content">
        <div className="header">
          <h1>Gestión de Productos</h1>
        </div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-content">
        <div className="header">
          <h1>Gestión de Productos</h1>
        </div>
        <div className="error">
          Error: {error}
          <button onClick={cargarProductos} className="btn-primario">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="header">
        <h1>Gestión de Productos</h1>
        <div className="user-info">
          <span>Administrador</span>
        </div>
      </div>

      {alertaStock && (
        <div className="alerta-stock">
          ⚠️ Atención: Algunos productos tienen 5 o menos unidades en stock.
        </div>
      )}

      <div className="vista-header">
        <h2>Gestión de Productos</h2>
        <button onClick={abrirModalNuevo} className="btn-primario">
          + Nuevo Producto
        </button>
      </div>

      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar producto..."
          onChange={(e) => filtrarProductos(e.target.value)}
        />
        <select onChange={(e) => filtrarProductos(undefined, e.target.value)}>
          <option value="">Todas las categorías</option>
          <option value="torta">Tortas</option>
          <option value="pie">Pies</option>
          <option value="masa">Masas</option>
          <option value="pan">Pan</option>
          <option value="queque">Queque</option>
          <option value="desactivados">Desactivados</option>
        </select>
      </div>

      <div id="lista-productos" className="lista-productos">
        {productos.length === 0 ? (
          <p>No hay productos registrados.</p>
        ) : (
          productos.map((producto) => (
            <div key={producto.id} className="producto-item" style={{ display: "flex", gap: "20px", flexDirection: "row", alignItems: "center" }}>
              <div style={{ height: "100px", overflow: "hidden", borderRadius: "8px" }}>
                <img style={{ width: "100%", height: "100px", objectFit: "cover" }} src={producto.imagenUrl} alt="" />
              </div>
              <div>
                <h4>{producto.nombre}</h4>
                <p>
                  Precio: ${producto.precio?.toLocaleString("es-CL")} — Stock:{" "}
                  {producto.stock}
                </p>
                <p>Categoría: {producto.categoria}</p>
                <p>Estado: {producto.estado ? 'Activo' : 'Inactivo'}</p>
                <div className="acciones">
                  <button
                    onClick={() => abrirModalEditar(producto)}
                    className="btn-secundario"
                  >
                    Editar
                  </button>
                  <button
                      onClick={() =>
                        producto.estado
                          ? desactivarProducto(producto.id)
                          : activarProducto(producto.id)
                      }
                      className={producto.estado ? "btn-peligro" : "btn-primario"}
                    >
                      {producto.estado ? "Desactivar" : "Activar"}
                    </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {mostrarModal && (
        <div className="modal">
          <div className="modal-contenido">
            <span
              className="cerrar-modal"
              onClick={() => setMostrarModal(false)}
            >
              &times;
            </span>

            <h3>{productoEditar ? "Editar Producto" : "Nuevo Producto"}</h3>
            <form id="form-producto" onSubmit={handleSubmit}>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                defaultValue={productoEditar?.nombre || ""}
                required
              />

              <label>Descripción:</label>
              <textarea
                name="descripcion"
                defaultValue={productoEditar?.descripcion || ""}
              />

              <label>Precio:</label>
              <input
                type="number"
                name="precio"
                defaultValue={productoEditar?.precio || ""}
                required
                min="0"
                step="0.01"
              />

              <label>Stock:</label>
              <input
                type="number"
                name="stock"
                defaultValue={productoEditar?.stock || ""}
                required
                min="0"
              />

              <label>Categoría:</label>
              <select
                name="categoria"
                defaultValue={productoEditar?.categoria || ""}
                required
              >
                <option value="">Seleccionar...</option>
                <option value="torta">Tortas</option>
                <option value="pie">Pies</option>
                <option value="masa">Masas</option>
                <option value="pan">Pan</option>
                <option value="queque">Queque</option>
                
              </select>

              <button type="submit" className="btn-primario">
                {productoEditar ? "Actualizar" : "Crear"} Producto
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}