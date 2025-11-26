import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import regionesComunas from "../data/regionesComunas";

const API_BASE_URL = "http://localhost:8080/api/usuarios";

const RegistroPage = () => {
  const valoresIniciales = {
    rut: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    correo: "",
    region: "",
    comuna: "",
    direccion: "",
    clave: "",
    clave2: "",
  };
  const [form, setForm] = useState(valoresIniciales);
  const [comunas, setComunas] = useState([]);
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  useEffect(() => {
    if (form.region) {
      setComunas(regionesComunas[form.region] || []);
    } else {
      setComunas([]);
    }
  }, [form.region]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    const { rut, nombre, apellido, correo, region, comuna, direccion, clave, clave2 } = form;

    if (rut.length < 7 || rut.length > 9) return "El RUT debe tener entre 7 y 9 caracteres.";
    if (/[.-]/.test(rut)) return "El RUT no debe contener puntos ni guiones.";
    if (nombre.length > 50) return "El nombre debe tener 50 o menos caracteres.";
    if (apellido.length > 100) return "Los apellidos deben tener menos de 100 caracteres.";
    const regexCorreo = /^[^\s@]+@(gmail\.com|duoc\.cl|profesorduoc\.cl)$/;
    if (!regexCorreo.test(correo) || correo.length > 100) return "El correo debe tener un formato válido (gmail.com, duoc.cl o profesorduoc.cl).";
    if (!region) return "Por favor, selecciona una región.";
    if (!comuna) return "Por favor, selecciona una comuna.";
    if (direccion.length > 300) return "La dirección debe contener 300 o menos caracteres.";
    if (clave.length < 4 || clave.length > 10) return "La contraseña debe tener entre 4 y 10 caracteres.";
    if (clave !== clave2) return "Las contraseñas no coinciden.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito("");
    const error = validarFormulario();
    if (error) {
      setMensajeError(error);
      return;
    }

    try {
      // Verificar si el RUT ya existe

      const existe = await fetch(`${API_BASE_URL}/${form.rut}`);
      if (existe.status === 200) {
        setMensajeError("El RUT ya está asociado a un usuario.");
        return;
      }

      // Verificar si el correo existe
      const existeCorreo = await fetch(`${API_BASE_URL}/email/${form.correo}`);
      if (existeCorreo.status === 200) {
        setMensajeError("El correo ya está asociado a un usuario.");
        return;
      }


      // Crear el usuario solo con los campos necesarios
      const nuevoUsuario = {
          rut: form.rut,
          nombre: form.nombre,
          apellido: form.apellido,
          fechaNacimiento: form.fechaNacimiento ? form.fechaNacimiento : null,
          email: form.correo,
          region: form.region,
          comuna: form.comuna,
          direccion: form.direccion,
          contrasena: form.clave,
          rol: "cliente",
          estado: true,
          fechaCreacion: new Date().toISOString(),
        };


      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Error al crear el usuario.");
      }

      setMensajeError("");
      setMensajeExito("Registro exitoso 🎉");
      setForm(valoresIniciales);
      setComunas([]);
    } catch (err) {
      setMensajeError(err.message);
    }
  };

  return (
    <main>
      <div className="formulario">
        <h2>Registro</h2>
        <form id="registroForm" onSubmit={handleSubmit}>
          <label htmlFor="rut">Rut:</label><br />
          <input type="text" id="rut" name="rut" value={form.rut} onChange={handleChange} required /><br /><br />

          <label htmlFor="nombre">Nombres:</label><br />
          <input type="text" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required /><br /><br />

          <label htmlFor="apellido">Apellidos:</label><br />
          <input type="text" id="apellido" name="apellido" value={form.apellido} onChange={handleChange} required /><br /><br />

          <label htmlFor="fechaNacimiento">Fecha de Nacimiento (Opcional):</label><br />
          <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} /><br /><br />

          <label htmlFor="correo">Correo electrónico:</label><br />
          <input type="email" id="correo" name="correo" value={form.correo} onChange={handleChange} required /><br /><br />

          <label htmlFor="region">Región:</label><br />
          <select id="region" name="region" value={form.region} onChange={handleChange} required>
            <option value="">--Selecciona una región--</option>
            {Object.keys(regionesComunas).map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select><br /><br />

          <label htmlFor="comuna">Comuna:</label><br />
          <select id="comuna" name="comuna" value={form.comuna} onChange={handleChange} required>
            <option value="">--Selecciona una comuna--</option>
            {comunas.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select><br /><br />

          <label htmlFor="direccion">Dirección:</label><br />
          <input type="text" id="direccion" name="direccion" value={form.direccion} onChange={handleChange} required /><br /><br />

          <label htmlFor="clave">Contraseña:</label><br />
          <input type="password" id="clave" name="clave" value={form.clave} onChange={handleChange} required /><br /><br />

          <label htmlFor="clave2">Repetir contraseña:</label><br />
          <input type="password" id="clave2" name="clave2" value={form.clave2} onChange={handleChange} required /><br /><br />

          {mensajeError && <p id="mensajeError" style={{ color: "red", fontWeight: "bold" }}>{mensajeError}</p>}
          {mensajeExito && <p id="mensajeExito" style={{ color: "green", fontWeight: "bold" }}>{mensajeExito}</p>}

          <div id="posicion">
            <button type="submit">Registrarse</button>
            <Link to="/login">Volver a Inicio de sesión</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegistroPage;
