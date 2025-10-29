import React, { useState, useEffect } from "react";
import "../assets/css/estilos.css";

const API_BASE_URL = 'http://localhost:8080/api';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar usuarios desde el backend
  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/usuarios`);
      
      if (!response.ok) {
        throw new Error('Error al cargar usuarios');
      }
      
      const data = await response.json();
      setUsuarios(data);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const abrirModal = (usuario = null) => {
    setUsuarioActual(usuario);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setUsuarioActual(null);
  };

  const eliminarUsuario = async (rut) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/usuarios/${rut}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Error al eliminar usuario');
        }

        await cargarUsuarios(); // Recargar la lista
        alert("Usuario eliminado correctamente");
      } catch (err) {
        alert("Error al eliminar usuario: " + err.message);
      }
    }
  };

  const guardarUsuario = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    // Validaciones
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@(duoc.cl|gmail.com|profesorduoc.cl)$/;
    const rut = form.rut.value.trim();

    // Validación RUN/RUT (sin puntos ni guiones)
    if (rut.includes(".") || rut.includes("-")) {
      alert("El RUT no debe contener puntos ni guiones.");
      return;
    }

    if (rut.length > 10) {
      alert("El RUT no puede tener más de 10 caracteres.");
      return;
    }

    // Validación correo
    if (!regexCorreo.test(form.email.value)) {
      alert("El correo debe terminar en @duoc.cl, @gmail.com o @profesorduoc.cl");
      return;
    }

    const usuarioData = {
      rut: rut,
      nombre: form.nombre.value,
      email: form.email.value,
      contrasena: form.contrasena.value || usuarioActual?.contrasena, // Mantener contraseña si edición
      rol: form.rol.value,
      estado: usuarioActual?.estado !== undefined ? usuarioActual.estado : true
    };

    try {
      let response;
      
      if (usuarioActual) {
        // Actualizar usuario existente
        response = await fetch(`${API_BASE_URL}/usuarios/${usuarioActual.rut}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuarioData)
        });
      } else {
        // Crear nuevo usuario
        response = await fetch(`${API_BASE_URL}/usuarios`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuarioData)
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error al ${usuarioActual ? 'actualizar' : 'crear'} usuario`);
      }

      await cargarUsuarios(); // Recargar la lista
      cerrarModal();
      alert(`Usuario ${usuarioActual ? "actualizado" : "creado"} correctamente`);
      
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="header">
          <h1>Gestión de Usuarios</h1>
        </div>
        <p>Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-content">
        <div className="header">
          <h1>Gestión de Usuarios</h1>
        </div>
        <div className="error">
          Error: {error}
          <button onClick={cargarUsuarios} className="btn-primario">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="usuarios-container">
      <h1>Gestión de Usuarios</h1>
      <button className="btn-primario" onClick={() => abrirModal()}>
        + Nuevo Usuario
      </button>

      <div className="lista-usuarios">
        {usuarios.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          usuarios.map((u) => (
            <div key={u.rut} className="usuario-item">
              <h4>{u.nombre}</h4>
              <p>
                {u.email} - {u.rol}
              </p>
              <p>RUT: {u.rut}</p>
              <p>Estado: {u.estado ? 'Activo' : 'Inactivo'}</p>
              {u.fechaCreacion && (
                <p>Registrado: {new Date(u.fechaCreacion).toLocaleDateString()}</p>
              )}
              <div className="acciones">
                <button onClick={() => abrirModal(u)} className="btn-secundario">
                  Editar
                </button>
                <button onClick={() => eliminarUsuario(u.id || u.rut)} className="btn-peligro">
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {mostrarModal && (
        <div className="modal" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <span className="cerrar-modal" onClick={cerrarModal}>
              &times;
            </span>
            <h3>{usuarioActual ? "Editar Usuario" : "Nuevo Usuario"}</h3>
            <form onSubmit={guardarUsuario}>
              <div className="form-grupo">
                <label>RUT:</label>
                <input
                  name="rut"
                  defaultValue={usuarioActual?.rut || ""}
                  required
                  maxLength={10}
                  placeholder="Ej: 123456789 o 12345678K"
                />
              </div>
              <div className="form-grupo">
                <label>Nombre:</label>
                <input
                  name="nombre"
                  defaultValue={usuarioActual?.nombre || ""}
                  required
                />
              </div>
              <div className="form-grupo">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={usuarioActual?.email || ""}
                  required
                />
              </div>
              <div className="form-grupo">
                <label>Contraseña:</label>
                <input
                  type="password"
                  name="contrasena"
                  defaultValue=""
                  placeholder={usuarioActual ? "Dejar vacío para mantener actual" : ""}
                  required={!usuarioActual} // Solo requerido para nuevos usuarios
                />
              </div>
              <div className="form-grupo">
                <label>Rol:</label>
                <select
                  name="rol"
                  defaultValue={usuarioActual?.rol || ""}
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="administrador">Administrador</option>
                  <option value="vendedor">Vendedor</option>
                  <option value="cliente">Cliente</option>
                </select>
              </div>
              <button type="submit" className="btn-primario">
                {usuarioActual ? "Actualizar" : "Crear"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}