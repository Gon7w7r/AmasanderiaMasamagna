// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  mostrarCarrito();
  mostrarResumenCarrito();
  console.log("DOM cargado: Carrito y resumen inicializados");

  // Mostrar/ocultar carrito al hacer clic en el ícono
  const btnCarrito = document.getElementById("btn-carrito");
  if (btnCarrito) {
    btnCarrito.addEventListener("click", function (e) {
      e.preventDefault();
      const carritoDiv = document.getElementById("carrito");
      if (carritoDiv) {
        carritoDiv.classList.toggle("oculto");
        console.log("Carrito mostrado/ocultado");
      }
    });
  }
});

// Funciones de carrito
function obtenerCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  console.log("Carrito obtenido:", carrito);
  return carrito;
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  console.log("Carrito guardado:", carrito);
}

// Función para agregar productos al carrito
function agregarCarrito(nombre, precio, imagen) {
  let carrito = obtenerCarrito();
  let producto = carrito.find(p => p.nombre === nombre);
  if (producto) {
    producto.cantidad++;
    console.log(`Incrementado: ${nombre}, nueva cantidad: ${producto.cantidad}`);
  } else {
    carrito.push({ nombre, precio, imagen, cantidad: 1 });
    console.log(`Agregado al carrito: ${nombre}`);
  }
  guardarCarrito(carrito);
  mostrarCarrito();
  mostrarResumenCarrito();
}

// Función para mostrar el carrito en pantalla
function mostrarCarrito() {
  let carrito = obtenerCarrito();
  let lista = document.getElementById("lista-carrito");
  let total = 0;

  if (!lista) return; // por si el elemento no existe

  lista.innerHTML = ""; // limpiar lista

  carrito.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.nombre} (x${item.cantidad}) - $${item.precio * item.cantidad}`;
    lista.appendChild(li);
    total += item.precio * item.cantidad;
  });

  const totalSpan = document.getElementById("total");
  if (totalSpan) {
    totalSpan.textContent = total;
  }

  console.log("Carrito mostrado en pantalla. Total:", total);
}

function mostrarResumenCarrito() {
  let carrito = obtenerCarrito();
  let resumenLista = document.getElementById("resumen-lista");
  let totalResumen = 0;

  if (!resumenLista) return;

  resumenLista.innerHTML = ""; // Limpiar

  carrito.forEach((item, index) => {
    let li = document.createElement("li");

    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.justifyContent = "space-between";
    li.style.marginBottom = "10px";

    li.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <img src="${item.imagen}" alt="${item.nombre}" style="width:50px; height:50px; object-fit:cover;">
        <span>${item.nombre}</span>
      </div>
      <div style="display:flex; align-items:center; gap:5px;">
        <button onclick="modificarCantidad(${index}, -1)">-</button>
        <span>${item.cantidad}</span>
        <button onclick="modificarCantidad(${index}, 1)">+</button>
        <span>$${item.precio * item.cantidad}</span>
      </div>
    `;

    resumenLista.appendChild(li);
    totalResumen += item.precio * item.cantidad;
  });

  const totalResumenSpan = document.getElementById("total-resumen");
  if (totalResumenSpan) totalResumenSpan.textContent = totalResumen;

  console.log("Resumen del carrito actualizado. Total resumen:", totalResumen);
}

// Función para vaciar todo el carrito
function vaciarCarrito() {
  localStorage.removeItem("carrito");
  console.log("Carrito vaciado");
  mostrarCarrito();
  mostrarResumenCarrito();
}

function modificarCantidad(index, cambio) {
  let carrito = obtenerCarrito();
  if (!carrito[index]) return;

  carrito[index].cantidad += cambio;

  // Si la cantidad baja a 0, eliminar el producto
  if (carrito[index].cantidad <= 0) {
    console.log(`Eliminado del carrito: ${carrito[index].nombre}`);
    carrito.splice(index, 1);
  } else {
    console.log(`Cantidad modificada: ${carrito[index].nombre}, nueva cantidad: ${carrito[index].cantidad}`);
  }

  guardarCarrito(carrito);
  mostrarCarrito();          // Actualiza el carrito desplegable
  mostrarResumenCarrito();   // Actualiza el resumen
}

// Exponer funciones al scope global para que los botones onclick las encuentren
window.agregarCarrito = agregarCarrito;
window.vaciarCarrito = vaciarCarrito;
