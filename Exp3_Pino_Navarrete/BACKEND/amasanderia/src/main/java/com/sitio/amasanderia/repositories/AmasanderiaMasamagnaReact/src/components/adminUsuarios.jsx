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

    const activarUsuario = async (rut) => {
    try {
      // 1. Traer el usuario completo
      const userResponse = await fetch(`${API_BASE_URL}/usuarios/${rut}`);
      const usuario = await userResponse.json();

      // 2. Actualizar el estado
      usuario.estado = true;

      // 3. Volver a enviarlo completo
      const response = await fetch(`${API_BASE_URL}/usuarios/${rut}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        throw new Error("Error al activar usuario");
      }

      await cargarUsuarios();
      alert("Usuario activado correctamente");
    } catch (err) {
      alert("Error al activar usuario: " + err.message);
    }
  };


  const guardarUsuario = async (e) => {
  e.preventDefault();
  const form = e.target;

  const regexCorreo = /^[a-zA-Z0-9._%+-]+@(duoc.cl|gmail.com|profesorduoc.cl)$/;
  const rut = form.rut.value.trim();
  const clave = form.contrasena.value.trim();

  // VALIDACIÓN RUT
  if (rut.includes(".") || rut.includes("-")) {
    alert("El RUT no debe contener puntos ni guiones.");
    return;
  }

  if (rut.length > 10) {
    alert("El RUT no puede tener más de 10 caracteres.");
    return;
  }

  // VALIDACIÓN EMAIL
  if (!regexCorreo.test(form.email.value)) {
    alert("El correo debe terminar en @duoc.cl, @gmail.com o @profesorduoc.cl");
    return;
  }

  // VALIDACIÓN CONTRASEÑA (solo si está escribiendo una nueva)
  if (!usuarioActual) {
    // Cuando se crea usuario → contraseña obligatoria
    if (clave.length < 4 || clave.length > 10) {
      alert("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }
  } else {
    // Cuando se edita → validar solo si la cambia
    if (clave && (clave.length < 4 || clave.length > 10)) {
      alert("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }
  }

  // VALIDAR SI RUT YA EXISTE (solo cuando se crea)
  if (!usuarioActual) {
    const existeRut = await fetch(`${API_BASE_URL}/usuarios/${rut}`);
    if (existeRut.status === 200) {
      alert("El RUT ingresado ya pertenece a otro usuario.");
      return;
    }
  }

  // VALIDAR SI EMAIL YA EXISTE
  const existeCorreo = await fetch(`${API_BASE_URL}/usuarios/email/${form.email.value}`);
  if (existeCorreo.status === 200) {
    const usuarioCorreo = await existeCorreo.json();

    if (!usuarioActual || usuarioCorreo.rut !== usuarioActual.rut) {
      alert("El correo ingresado ya está registrado en otro usuario.");
      return;
    }
  }

  // Construcción del objeto usuario
  const usuarioData = {
    rut: rut,
    nombre: form.nombre.value,
    apellido: form.apellido.value,
    fechaNacimiento: form.fechaNacimiento.value || null,
    email: form.email.value,
    region: form.region.value,
    comuna: form.comuna.value,
    direccion: form.direccion.value,
    contrasena: clave || usuarioActual?.contrasena,
    rol: form.rol.value,
    estado: usuarioActual?.estado ?? true,
    fechaCreacion: usuarioActual?.fechaCreacion || new Date().toISOString()
  };

  try {
    let response;

    if (usuarioActual) {
      // EDITAR USUARIO
      response = await fetch(`${API_BASE_URL}/usuarios/${usuarioActual.rut}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioData)
      });
    } else {
      // CREAR USUARIO
      response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioData)
      });
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error al guardar usuario");
    }

    await cargarUsuarios();
    cerrarModal();
    alert(usuarioActual ? "Usuario actualizado correctamente" : "Usuario creado correctamente");

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

                  {u.estado ? (
                    // Usuario ACTIVO -> mostrar botón ELIMINAR (desactivar)
                    <button onClick={() => eliminarUsuario(u.rut)} className="btn-peligro">
                      Desactivar
                    </button>
                  ) : (
                    // Usuario INACTIVO -> mostrar botón ACTIVAR
                    <button onClick={() => activarUsuario(u.rut)} className="btn-primario">
                      Activar
                    </button>
                  )}
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

              <div className="form-grupo">
                  <label>Apellido:</label>
                  <input
                    name="apellido"
                    defaultValue={usuarioActual?.apellido || ""}
                    required
                  />
                </div>

                <div className="form-grupo">
                  <label>Fecha de nacimiento:</label>
                  <input
                    type="date"
                    name="fechaNacimiento"
                    defaultValue={usuarioActual?.fechaNacimiento || ""}
                  />
                </div>

                <div className="form-grupo">
                  <label>Región:</label>
                  <input
                    name="region"
                    defaultValue={usuarioActual?.region || ""}
                    required
                  />
                </div>

                <div className="form-grupo">
                  <label>Comuna:</label>
                  <input
                    name="comuna"
                    defaultValue={usuarioActual?.comuna || ""}
                    required
                  />
                </div>

                <div className="form-grupo">
                  <label>Dirección:</label>
                  <input
                    name="direccion"
                    defaultValue={usuarioActual?.direccion || ""}
                    required
                  />
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