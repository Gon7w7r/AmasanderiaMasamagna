document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactoForm");
  const mensajeError = document.getElementById("mensajeError");


    // Validación del formulario
  form.addEventListener("submit", function(event) {
      event.preventDefault();
      let nombre = document.getElementById("nombre").value;
      let correo = document.getElementById("correo").value.trim();
      let mensaje = document.getElementById("mensaje").value.trim();
      

      mensajeError.textContent = "";
        
      if(nombre.length > 100) {
          mensajeError.textContent = "El nombre debe tener 100 o menos caracteres.";
          return;
      }

      let regexCorreo = /^[^\s@]+@(gmail\.com|duoc\.cl|profesorduoc\.cl)$/;
      if(!regexCorreo.test(correo) || correo.length > 100) {
          mensajeError.textContent = "El correo debe tener un máximo de 100 caracteres o un formato válido [gmail.com|duoc.cl|profesorduoc.cl].";
          return;
      }
      if(mensaje.length > 500) {
          mensajeError.textContent = "El mensaje debe tener 500 o menos caracteres.";
          return;
      }

      alert("Mensaje enviado exitosamente!!!🎉");
      this.submit();
  });
});
