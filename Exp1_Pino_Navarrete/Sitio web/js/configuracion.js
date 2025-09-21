// js/configuracion.js
document.addEventListener('DOMContentLoaded', function() {
    cargarConfiguracion();
    
    document.getElementById('form-info-tienda').addEventListener('submit', function(e) {
        e.preventDefault();
        guardarConfiguracion();
    });
});

function cargarConfiguracion() {
    const config = obtenerDatos('configuracion');
    
    document.getElementById('nombre-tienda').value = config.nombreTienda || '';
    document.getElementById('email-tienda').value = config.emailTienda || '';
    document.getElementById('telefono-tienda').value = config.telefonoTienda || '';
}

function guardarConfiguracion() {
    const config = {
        nombreTienda: document.getElementById('nombre-tienda').value,
        emailTienda: document.getElementById('email-tienda').value,
        telefonoTienda: document.getElementById('telefono-tienda').value
    };
    
    guardarDatos('configuracion', config);
    alert('Configuración guardada correctamente');
}