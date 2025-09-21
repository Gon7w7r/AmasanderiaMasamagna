// js/productos.js - CON funciones editar y eliminar
document.addEventListener('DOMContentLoaded', function() {
    cargarProductos();
    document.getElementById('btn-nuevo-producto').addEventListener('click', function() {
        mostrarFormularioProducto(null);
    });
    
    // Cerrar modal
    document.querySelector('.cerrar-modal').addEventListener('click', cerrarModal);
});

function cargarProductos() {
    const productos = obtenerDatos('productos');
    const lista = document.getElementById('lista-productos');
    lista.innerHTML = '';
    
    productos.forEach(producto => {
        const productoHTML = `
            <div class="producto-item">
                <h4>${producto.nombre}</h4>
                <p>Precio: $${producto.precio} - Stock: ${producto.stock}</p>
                <p>Categoría: ${producto.categoria}</p>
                <div class="acciones">
                    <button onclick="editarProducto(${producto.id})" class="btn-secundario">Editar</button>
                    <button onclick="eliminarProducto(${producto.id})" class="btn-peligro">Eliminar</button>
                </div>
            </div>
        `;
        lista.innerHTML += productoHTML;
    });
}

function mostrarFormularioProducto(productoEditar) {
    const contenidoModal = document.getElementById('contenido-modal');
    const esEdicion = productoEditar !== null;
    
    contenidoModal.innerHTML = `
        <h3>${esEdicion ? 'Editar' : 'Nuevo'} Producto</h3>
        <form id="form-producto">
            <input type="hidden" id="producto-id" value="${esEdicion ? productoEditar.id : ''}">
            
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" value="${esEdicion ? productoEditar.nombre : ''}" required maxlength="100">
            
            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" maxlength="500">${esEdicion ? productoEditar.descripcion : ''}</textarea>
            
            <label for="precio">Precio:</label>
            <input type="number" id="precio" value="${esEdicion ? productoEditar.precio : ''}" required min="0" step="0.01">
            
            <label for="stock">Stock:</label>
            <input type="number" id="stock" value="${esEdicion ? productoEditar.stock : ''}" required min="0">
            
            <label for="categoria">Categoría:</label>
            <select id="categoria" required>
                <option value="torta" ${esEdicion && productoEditar.categoria === 'torta' ? 'selected' : ''}>Tortas</option>
                <option value="pie" ${esEdicion && productoEditar.categoria === 'pie' ? 'selected' : ''}>Pie</option>
                <option value="masa" ${esEdicion && productoEditar.categoria === 'masa' ? 'selected' : ''}>Masas</option>
            </select>
            
            <button type="submit" class="btn-primario">${esEdicion ? 'Actualizar' : 'Crear'} Producto</button>
        </form>
    `;
    
    document.getElementById('form-producto').addEventListener('submit', function(e) {
        e.preventDefault();
        guardarProducto(esEdicion);
    });
    
    document.getElementById('modal-formulario').style.display = 'block';
}

function guardarProducto(esEdicion) {
    const productos = obtenerDatos('productos');
    const productoId = document.getElementById('producto-id').value;
    
    const productoData = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        precio: parseFloat(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value),
        categoria: document.getElementById('categoria').value
    };
    
    if (esEdicion) {
        // EDITAR producto existente
        const index = productos.findIndex(p => p.id === parseInt(productoId));
        if (index !== -1) {
            productos[index] = { ...productos[index], ...productoData };
        }
    } else {
        // CREAR nuevo producto
        productoData.id = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
        productos.push(productoData);
    }
    
    guardarDatos('productos', productos);
    cerrarModal();
    cargarProductos();
    alert(`Producto ${esEdicion ? 'actualizado' : 'creado'} correctamente`);
}

function editarProducto(id) {
    const productos = obtenerDatos('productos');
    const producto = productos.find(p => p.id === id);
    if (producto) {
        mostrarFormularioProducto(producto);
    }
}

function eliminarProducto(id) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        const productos = obtenerDatos('productos').filter(prod => prod.id !== id);
        guardarDatos('productos', productos);
        cargarProductos();
        alert('Producto eliminado correctamente');
    }
}

function cerrarModal() {
    document.getElementById('modal-formulario').style.display = 'none';
}

// Cerrar modal al hacer clic fuera
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal-formulario');
    if (event.target === modal) {
        cerrarModal();
    }
});