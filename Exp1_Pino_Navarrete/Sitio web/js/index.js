// js/index.js
document.addEventListener('DOMContentLoaded', function() {
    actualizarEstadisticas();
});

function actualizarEstadisticas() {
    const productos = obtenerDatos('productos');
    const usuarios = obtenerDatos('usuarios');
    const pedidos = obtenerDatos('pedidos');
    
    document.querySelectorAll('.tarjeta-estadistica .numero')[0].textContent = productos.length;
    document.querySelectorAll('.tarjeta-estadistica .numero')[1].textContent = usuarios.length;
    document.querySelectorAll('.tarjeta-estadistica .numero')[2].textContent = pedidos.length;
    
    // Ingresos simples (para evaluación)
    const ingresos = 0; // Valor fijo como en el diseño original
    document.querySelectorAll('.tarjeta-estadistica .numero')[3].textContent = `$${ingresos.toLocaleString('es-CL')}`;
}