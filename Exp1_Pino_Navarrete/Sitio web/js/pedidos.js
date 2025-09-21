// js/pedidos.js
document.addEventListener('DOMContentLoaded', function() {
    cargarPedidos();
});

function cargarPedidos() {
    const pedidos = obtenerDatos('pedidos');
    const lista = document.getElementById('lista-pedidos');
    lista.innerHTML = '';
    
    if (pedidos.length === 0) {
        lista.innerHTML = '<p>No hay pedidos registrados</p>';
        return;
    }
    
    pedidos.forEach(pedido => {
        const pedidoHTML = `
            <div class="pedido-item">
                <h4>Pedido #${pedido.id || 'N/A'}</h4>
                <p>Estado: ${pedido.estado || 'Pendiente'}</p>
            </div>
        `;
        lista.innerHTML += pedidoHTML;
    });
}