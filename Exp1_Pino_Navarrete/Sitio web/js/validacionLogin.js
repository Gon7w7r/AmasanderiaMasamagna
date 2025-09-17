document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const mensajeError = document.getElementById("mensajeError");


    // Validación del formulario
  form.addEventListener("submit", function(event) {
      event.preventDefault();

      let correo = document.getElementById("correo").value.trim();
      let clave = document.getElementById("clave").value;

      mensajeError.textContent = "";


      let regexCorreo = /^[^\s@]+@(gmail\.com|duoc\.cl|profesorduoc\.cl)$/;
      if(!regexCorreo.test(correo) || correo.length > 100) {
          mensajeError.textContent = "El correo debe tener un máximo de 100 caracteres o un formato válido [gmail.com|duoc.cl|profesorduoc.cl].";
          return;
      }

      if(clave.length < 4 || clave.length > 10) {
          mensajeError.textContent = "La contraseña debe tener al menos 4 caracteres y 10 o menos caracteres.";
          return;
      }

      alert("Login exitoso Bienvenido!!!🎉");
      this.submit();
  });
});
