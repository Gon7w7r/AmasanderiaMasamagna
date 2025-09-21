// js/datos.js
const initialData = {
    usuarios: [
        {
            id: 1,
            run: "19011022K",
            nombre: "Admin",
            apellidos: "Principal",
            correo: "admin@duoc.cl",
            tipoUsuario: "administrador"
        }
    ],
    productos: [
        {
            id: 1,
            nombre: "Torta de Chocolate",
            descripcion: "Deliciosa torta de chocolate",
            precio: 19990,
            stock: 10,
            categoria: "torta"
        }
    ],
    pedidos: [],
    configuracion: {
        nombreTienda: "Amasandería Masamagna",
        emailTienda: "contacto@gmail.com",
        telefonoTienda: "+56912345678"
    }
};

// Inicializar datos
function inicializarDatos() {
    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify(initialData.usuarios));
    }
    if (!localStorage.getItem('productos')) {
        localStorage.setItem('productos', JSON.stringify(initialData.productos));
    }
    if (!localStorage.getItem('pedidos')) {
        localStorage.setItem('pedidos', JSON.stringify(initialData.pedidos));
    }
    if (!localStorage.getItem('configuracion')) {
        localStorage.setItem('configuracion', JSON.stringify(initialData.configuracion));
    }
}

// Obtener datos
function obtenerDatos(tipo) {
    const datos = localStorage.getItem(tipo);
    return datos ? JSON.parse(datos) : [];
}

// Guardar datos
function guardarDatos(tipo, datos) {
    localStorage.setItem(tipo, JSON.stringify(datos));
}

// Iniciar
document.addEventListener('DOMContentLoaded', inicializarDatos);