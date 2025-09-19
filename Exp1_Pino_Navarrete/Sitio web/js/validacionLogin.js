document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const mensajeError = document.getElementById("mensajeError");

  console.log("DOM cargado: formulario de login listo para validación");

  // Validación del formulario
  form.addEventListener("submit", function(event) {
      event.preventDefault();
      console.log("Formulario de login enviado, iniciando validación...");

      let correo = document.getElementById("correo").value.trim();
      let clave = document.getElementById("clave").value;

      console.log("Valores ingresados:", { correo, clave });

      mensajeError.textContent = "";

      let regexCorreo = /^[^\s@]+@(gmail\.com|duoc\.cl|profesorduoc\.cl)$/;
      if(!regexCorreo.test(correo) || correo.length > 100) {
          mensajeError.textContent = "El correo debe tener un máximo de 100 caracteres o un formato válido [gmail.com|duoc.cl|profesorduoc.cl].";
          console.log("Error de validación: correo inválido");
          return;
      }

      if(clave.length < 4 || clave.length > 10) {
          mensajeError.textContent = "La contraseña debe tener al menos 4 caracteres y 10 o menos caracteres.";
          console.log("Error de validación: contraseña fuera de rango");
          return;
      }

      console.log("Validación exitosa, login permitido");
      alert("Login exitoso Bienvenido!!!🎉");
      this.submit();
  });
});
