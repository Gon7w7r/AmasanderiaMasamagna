document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");
  const mensajeError = document.getElementById("mensajeError");

  console.log("DOM cargado: formulario de registro listo para validación");

  const regionesComunas = {
      "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
      "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
      "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
      "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
      "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
      "Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
      "Región del Libertador Gral. Bernardo O’Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
      "Región del Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
      "Región de Ñuble": ["Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Quirihue", "Ránquil", "Treguaco", "Bulnes", "Chillán Viejo", "Chillán", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Coihueco", "Ñiquén", "San Carlos", "San Fabián", "San Nicolás"],
      "Región del Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
      "Región de la Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
      "Región de Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
      "Región de Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
      "Región Aisén del Gral. Carlos Ibáñez del Campo": ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
      "Región de Magallanes y de la Antártica Chilena": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"],
      "Región Metropolitana de Santiago": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "Santiago", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
  };

  const selectRegion = document.getElementById("region");
  const selectComuna = document.getElementById("comuna");

  // Llenar select de regiones al cargar
  for (let region in regionesComunas) {
      const option = document.createElement("option");
      option.value = region;
      option.textContent = region;
      selectRegion.appendChild(option);
  }
  console.log("Select de regiones inicializado");

  // Cuando cambie la región, actualizar comunas
  selectRegion.addEventListener("change", function() {
      const comunas = regionesComunas[this.value] || [];
      selectComuna.innerHTML = '<option value="">--Selecciona una comuna--</option>';
      comunas.forEach(comuna => {
          const option = document.createElement("option");
          option.value = comuna;
          option.textContent = comuna;
          selectComuna.appendChild(option);
      });
      console.log("Comunas actualizadas para la región:", this.value, comunas);
  });

  // Validación del formulario
  form.addEventListener("submit", function(event) {
      event.preventDefault();
      console.log("Formulario de registro enviado, iniciando validación...");

      let rut= document.getElementById('rut').value.trim();
      let nombre = document.getElementById("nombre").value.trim();
      let apellido = document.getElementById("apellido").value.trim();
      let correo = document.getElementById("correo").value.trim();
      let direccion = document.getElementById("direccion").value.trim();
      let clave = document.getElementById("clave").value;
      let clave2 = document.getElementById("clave2").value;

      console.log("Valores ingresados:", { rut, nombre, apellido, correo, direccion, clave, clave2, region: selectRegion.value, comuna: selectComuna.value });

      mensajeError.textContent = "";

      if (rut.length < 7 || rut.length > 9) {
         mensajeError.textContent = "El rut debe tener más de 7 caracteres y menos de 10 caracteres"; 
         console.log("Error de validación: rut incorrecto");
         return; 
      } 
      const contienePuntosOGuiones = /[.-]/.test(rut); 
      if (contienePuntosOGuiones) { 
        mensajeError.textContent = "El rut no debe contener puntos ni guion"; 
        console.log("Error de validación: rut contiene puntos o guion");
        return; 
      }

      if(nombre.length > 50) {
          mensajeError.textContent = "El nombre debe tener 50 o menos caracteres.";
          console.log("Error de validación: nombre demasiado largo");
          return;
      }

      if(apellido.length > 100) {
          mensajeError.textContent = "Los apellidos deben tener menos de 100 caracteres.";
          console.log("Error de validación: apellido demasiado largo");
          return;
      }

      let regexCorreo = /^[^\s@]+@(gmail\.com|duoc\.cl|profesorduoc\.cl)$/;
      if(!regexCorreo.test(correo) || correo.length > 100) {
          mensajeError.textContent = "El correo debe tener un máximo de 100 caracteres o un formato válido [gmail.com|duoc.cl|profesorduoc.cl].";
          console.log("Error de validación: correo inválido");
          return;
      }

      //validacion region
      if(selectRegion.value === "") {
        mensajeError.textContent = "Por favor, selecciona una región.";
        console.log("Error de validación: región no seleccionada");
        return;
      }

      // Validación de comuna
      if(selectComuna.value === "") {
        mensajeError.textContent = "Por favor, selecciona una comuna.";
        console.log("Error de validación: comuna no seleccionada");
        return;
      }

      if(direccion.length > 300) {
          mensajeError.textContent = "La dirección debe contener 300 o menos caracteres.";
          console.log("Error de validación: dirección demasiado larga");
          return;
      }

      if(clave.length < 4 || clave.length > 10) {
          mensajeError.textContent = "La contraseña debe tener al menos 4 caracteres y 10 o menos caracteres.";
          console.log("Error de validación: contraseña fuera de rango");
          return;
      }

      if(clave !== clave2){
          mensajeError.textContent = "Las contraseñas no coinciden.";
          console.log("Error de validación: contraseñas no coinciden");
          return;
      }

      console.log("Validación exitosa, registro permitido");
      alert("Registro exitoso 🎉");
      this.submit();
  });
});
