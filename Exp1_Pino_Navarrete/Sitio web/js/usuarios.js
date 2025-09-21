// js/usuarios.js - VERSIÓN CORREGIDA
const regionesYComunas = {
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

document.addEventListener('DOMContentLoaded', function() {
    cargarUsuarios();
    document.getElementById('btn-nuevo-usuario').addEventListener('click', function() {
        mostrarFormularioUsuario(null);
    });
    
    document.querySelector('.cerrar-modal').addEventListener('click', cerrarModal);
});

function cargarUsuarios() {
    const usuarios = obtenerDatos('usuarios');
    const lista = document.getElementById('lista-usuarios');
    lista.innerHTML = '';
    
    usuarios.forEach(usuario => {
        const usuarioHTML = `
            <div class="usuario-item">
                <h4>${usuario.nombre} ${usuario.apellidos}</h4>
                <p>${usuario.correo} - ${usuario.tipoUsuario}</p>
                <p>RUN: ${usuario.run}</p>
                ${usuario.region ? `<p>${usuario.region}, ${usuario.comuna}</p>` : ''}
                <div class="acciones">
                    <button onclick="editarUsuario(${usuario.id})" class="btn-secundario">Editar</button>
                    <button onclick="eliminarUsuario(${usuario.id})" class="btn-peligro">Eliminar</button>
                </div>
            </div>
        `;
        lista.innerHTML += usuarioHTML;
    });
}

function mostrarFormularioUsuario(usuarioEditar) {
    const contenidoModal = document.getElementById('contenido-modal');
    const esEdicion = usuarioEditar !== null;
    
    contenidoModal.innerHTML = `
        <h3>${esEdicion ? 'Editar' : 'Nuevo'} Usuario</h3>
        <form id="form-usuario">
            <input type="hidden" id="usuario-id" value="${esEdicion ? usuarioEditar.id : ''}">
            
            <label for="run">RUN (sin puntos ni guión):</label>
            <input type="text" id="run" value="${esEdicion ? usuarioEditar.run : ''}" required maxlength="9" pattern="[0-9Kk]+">
            
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" value="${esEdicion ? usuarioEditar.nombre : ''}" required maxlength="50">
            
            <label for="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" value="${esEdicion ? usuarioEditar.apellidos : ''}" required maxlength="100">
            
            <label for="correo">Correo:</label>
            <input type="email" id="correo" value="${esEdicion ? usuarioEditar.correo : ''}" required maxlength="100">
            
            <label for="fechaNacimiento">Fecha de Nacimiento (Opcional):</label>
            <input type="date" id="fechaNacimiento" value="${esEdicion ? usuarioEditar.fechaNacimiento || '' : ''}">
            
            <label for="tipoUsuario">Tipo de Usuario:</label>
            <select id="tipoUsuario" required>
                <option value="">Seleccionar...</option>
                <option value="administrador" ${esEdicion && usuarioEditar.tipoUsuario === 'administrador' ? 'selected' : ''}>Administrador</option>
                <option value="vendedor" ${esEdicion && usuarioEditar.tipoUsuario === 'vendedor' ? 'selected' : ''}>Vendedor</option>
                <option value="cliente" ${esEdicion && usuarioEditar.tipoUsuario === 'cliente' ? 'selected' : ''}>Cliente</option>
            </select>
            
            <label for="region">Región:</label>
            <select id="region" required>
                <option value="">Seleccionar región...</option>
            </select>
            
            <label for="comuna">Comuna:</label>
            <select id="comuna" required>
                <option value="">Seleccionar comuna...</option>
            </select>
            
            <label for="direccion">Dirección:</label>
            <input type="text" id="direccion" value="${esEdicion ? usuarioEditar.direccion || '' : ''}" required maxlength="300">
            
            <button type="submit" class="btn-primario">${esEdicion ? 'Actualizar' : 'Crear'} Usuario</button>
        </form>
    `;

    cargarRegionesYComunas(esEdicion ? usuarioEditar : null);
    
    document.getElementById('form-usuario').addEventListener('submit', function(e) {
        e.preventDefault();
        guardarUsuario(esEdicion);
    });
    
    document.getElementById('modal-formulario').style.display = 'block';
}

function guardarUsuario(esEdicion) {
    const usuarios = obtenerDatos('usuarios');
    const usuarioId = document.getElementById('usuario-id').value;
    
    const usuarioData = {
        run: document.getElementById('run').value,
        nombre: document.getElementById('nombre').value,
        apellidos: document.getElementById('apellidos').value,
        correo: document.getElementById('correo').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        tipoUsuario: document.getElementById('tipoUsuario').value,
        region: document.getElementById('region').value,
        comuna: document.getElementById('comuna').value,
        direccion: document.getElementById('direccion').value
    };
    
    if (esEdicion) {
        const index = usuarios.findIndex(u => u.id === parseInt(usuarioId));
        if (index !== -1) {
            usuarios[index] = { ...usuarios[index], ...usuarioData };
        }
    } else {
        usuarioData.id = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
        usuarios.push(usuarioData);
    }
    
    guardarDatos('usuarios', usuarios);
    cerrarModal();
    cargarUsuarios();
    alert(`Usuario ${esEdicion ? 'actualizado' : 'creado'} correctamente`);
}

function editarUsuario(id) {
    const usuarios = obtenerDatos('usuarios');
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
        mostrarFormularioUsuario(usuario);
    }
}

function eliminarUsuario(id) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
        const usuarios = obtenerDatos('usuarios').filter(user => user.id !== id);
        guardarDatos('usuarios', usuarios);
        cargarUsuarios();
        alert('Usuario eliminado correctamente');
    }
}

function cargarRegionesYComunas(usuario) {
    const selectRegion = document.getElementById('region');
    const selectComuna = document.getElementById('comuna');
    
    selectRegion.innerHTML = '<option value="">Seleccionar región...</option>';
    Object.keys(regionesYComunas).forEach(region => {
        selectRegion.innerHTML += `<option value="${region}">${region}</option>`;
    });
    
    if (usuario && usuario.region) {
        selectRegion.value = usuario.region;
        actualizarComunas(usuario.region, usuario.comuna);
    }
    
    selectRegion.addEventListener('change', function() {
        actualizarComunas(this.value);
    });
}

function actualizarComunas(region, comunaSeleccionada) {
    const selectComuna = document.getElementById('comuna');
    selectComuna.innerHTML = '<option value="">Seleccionar comuna...</option>';
    
    if (region && regionesYComunas[region]) {
        regionesYComunas[region].forEach(comuna => {
            selectComuna.innerHTML += `<option value="${comuna}" ${comuna === comunaSeleccionada ? 'selected' : ''}>${comuna}</option>`;
        });
        selectComuna.disabled = false;
    } else {
        selectComuna.disabled = true;
    }
}

function cerrarModal() {
    document.getElementById('modal-formulario').style.display = 'none';
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal-formulario');
    if (event.target === modal) {
        cerrarModal();
    }
});