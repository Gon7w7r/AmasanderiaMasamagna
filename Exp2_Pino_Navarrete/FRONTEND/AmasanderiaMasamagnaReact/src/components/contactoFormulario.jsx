import React, { useState } from "react";

const ContactoPage = ({ agregarCarrito }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState({ nombre: '', correo: '', mensaje: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpiar errores previos
    setErrores({ nombre: '', correo: '', mensaje: '' });

    // Validación
    let validacionError = false;
    let nombreError = '';
    let correoError = '';
    let mensajeError = '';

    // Validación de nombre
    if (nombre.length > 100) {
      nombreError = 'El nombre debe tener 100 o menos caracteres.';
      validacionError = true;
    }

    // Validación de correo
    const regexCorreo = /^[^\s@]+@(gmail\.com|duoc\.cl|profesorduoc\.cl)$/;
    if (!regexCorreo.test(correo) || correo.length > 100) {
      correoError = 'El correo debe tener un máximo de 100 caracteres o un formato válido [gmail.com|duoc.cl|profesorduoc.cl].';
      validacionError = true;
    }

    // Validación de mensaje
    if (mensaje.length > 500) {
      mensajeError = 'El mensaje debe tener 500 o menos caracteres.';
      validacionError = true;
    }

    // Si hay errores, no enviar el formulario
    if (validacionError) {
      setErrores({
        nombre: nombreError,
        correo: correoError,
        mensaje: mensajeError
      });
      return;
    }

    // Si la validación pasa, procesar el formulario
    alert("Mensaje enviado exitosamente!!!🎉");

    // Limpiar el formulario
    setNombre('');
    setCorreo('');
    setMensaje('');
  };

  return (
    <div className="formulario">
      <h2>Contactanos</h2>
      <form id="contactoForm" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre completo:</label><br />
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        /><br />
        {errores.nombre && <span className="error">{errores.nombre}</span>}<br />

        <label htmlFor="correo">Correo electrónico:</label><br />
        <input
          type="email"
          id="correo"
          name="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        /><br />
        {errores.correo && <span className="error">{errores.correo}</span>}<br />

        <label htmlFor="mensaje">Mensaje:</label><br />
        <textarea
          id="mensaje"
          name="mensaje"
          className="caja-texto"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
        ></textarea><br />
        {errores.mensaje && <span className="error">{errores.mensaje}</span>}<br />

        <div className="contenedor-boton">
          <button type="submit" id="enviar-contacto">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default ContactoPage;
