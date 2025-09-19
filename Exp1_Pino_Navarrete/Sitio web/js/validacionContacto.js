document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactoForm");
  const mensajeError = document.getElementById("mensajeError");

  console.log("DOM cargado: formulario listo para validación");

  // Validación del formulario
  form.addEventListener("submit", function(event) {
      event.preventDefault();
      console.log("Formulario enviado, iniciando validación...");

      let nombre = document.getElementById("nombre").value;
      let correo = document.getElementById("correo").value.trim();
      let mensaje = document.getElementById("mensaje").value.trim();

      console.log("Valores ingresados:", { nombre, correo, mensaje });

      mensajeError.textContent = "";
        
      if(nombre.length > 100) {
          mensajeError.textContent = "El nombre debe tener 100 o menos caracteres.";
          console.log("Error de validación: nombre demasiado largo");
          return;
      }

      let regexCorreo = /^[^\s@]+@(gmail\.com|duoc\.cl|profesorduoc\.cl)$/;
      if(!regexCorreo.test(correo) || correo.length > 100) {
          mensajeError.textContent = "El correo debe tener un máximo de 100 caracteres o un formato válido [gmail.com|duoc.cl|profesorduoc.cl].";
          console.log("Error de validación: correo inválido");
          return;
      }

      if(mensaje.length > 500) {
          mensajeError.textContent = "El mensaje debe tener 500 o menos caracteres.";
          console.log("Error de validación: mensaje demasiado largo");
          return;
      }

      console.log("Validación exitosa, formulario enviado");
      alert("Mensaje enviado exitosamente!!!🎉");
      this.submit();
  });
});
