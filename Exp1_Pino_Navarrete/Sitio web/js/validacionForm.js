document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");
  const mensajeError = document.getElementById("mensajeError");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let direccion = document.getElementById("direccion").value.trim();
    let clave = document.getElementById("clave").value;
    let clave2 = document.getElementById("clave2").value;

    // Limpiar mensaje previo
    mensajeError.textContent = "";

    // Validaciones
    if(nombre.length < 3){
      mensajeError.textContent = "El nombre debe tener al menos 3 caracteres.";
      return;
    }

    let regexCorreo = /^[^\s@]+@(gmail\.com|duoc\.cl|profesorduoc\.cl)$/;
    if(!regexCorreo.test(correo) || correo.length>100){
      mensajeError.textContent = "El un correo debe tener un maximo de 100 caracteres o un formato válido [gmail.com|duoc.cl|profesorduoc.cl] .";
      return;
    }

    


    if(direccion.length < 5){
      mensajeError.textContent = "La dirección es demasiado corta.";
      return;
    }

    if(clave.length < 4 || clave.length >10){
      mensajeError.textContent = "La contraseña debe tener al menos 4 caracteres y 10 o menos caracteres.";
      return;
    }

    if(clave !== clave2){
      mensajeError.textContent = "Las contraseñas no coinciden.";
      return;
    }

    // Si todo está bien
    alert("Registro exitoso 🎉");
    this.submit(); 
  });
});
