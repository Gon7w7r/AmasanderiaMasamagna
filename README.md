Amasanderia masamagna es un proyecto de una amasanderia local que quiere digitalizarse mediante un sitio web
En esta version del proyecto se abarcan las funciones de agregar items al carrito, agregar productos, registrarse, loguearse
simular compras y eliminar usuarios y productos.


Vitest como test runner principal
React Testing Library para el testing de componentes React

npm install -D vitest @vitest/ui
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npm install -D jest @testing-library/jest-dom

En package.json, agregar lo siguiente en scripts:
"test": "vitest --environment jsdom",
    "test:ui": "vitest --ui"
En vite.config.js, agregar lo siguiente en export default defineConfigure:
 test: {
    globals: true,
    environment: 'jsdom',
  }

Tecnologias implementadas
Frontend: React con componentes para Productos, Contacto, Login, Carrito.
Backend: Spring Boot con API REST (Producto, Usuario, Carrito, ItemCarrito).
Base de Datos: MySQL gestionada con XAMPP y MySQL Workbench.
Comunicación: REST API entre React y Spring Boot.


Para poder utilizar el proyecto, hay que utilizar el programa visual studio code, XAMPP y MySQL Workbench:

1.-Iniciar Apache y MySQL en XAMPP
2.-Importar base de datos en MySQL Workbench
3.-Instalar extensiones en Visual Studio Code(Extension Pack for JAVA,Springboot extension pack,ES7 React, Simple React snippets)
4.-Inicializar SpringBoot
5.-Inicializar proyecto react con npm run dev (en caso de error ejecutar npm install)



Para ejecutar funciones dentro del sitio web

AGREGAR ITEMS AL CARRITO
1.-Presionar agregar al carrito en el producto
SIMULAR PAGO
1.-Agregar items al carrito
2.-Abrir carrito desplegable haciendo click en el icono de carrito
3.-Hacer click en Ver Carrito
4.-Una vez redirigido, hacer click en Proceder al Pago
INICIAR SESION
1.-Desde el index, navegar hacia iniciar sesion haciendo click en el boton iniciar sesion
2.-Ingresar mail valido
3.-Ingresar contraseña valida
CERRAR SESION
1.-Desde el index, navegar hacia iniciar sesion haciendo click en el boton iniciar sesión
2.-Ingresar mail valido
3.-Ingresar contraseña valida
4.-Presionar cerrar sesión


Si ya hay sesión iniciada
1.-Desde el index, navegar hacia iniciar sesion haciendo click en el boton iniciar sesión
2.-Presionar cerrar sesión


REGISTRARSE
1.-Desde el index, navegar hacia registrarse haciendo click en el boton Registrarse
2.-Rellenar el formulario
IR A ADMIN DASHBOARD
1.-Iniciar sesion con email(cam.pinoo@duoc.cl) y contraseña(admin123)
AGREGAR/ELIMINAR PRODUCTOS
1.-Una vez en admin dashboard navegar a Productos
2.-Hacer click en nuevo producto y rellenar formulario o Hacer click en eliminar y eliminar el producto deseado
AGREGAR/ELIMINAR USUARIOS
1.-Una vez en admin dashboard navegar a Usuarios
2.-Hacer click en nuevo usuario y rellenar formulario o Hacer click en eliminar y eliminar el usuario deseado


DOCUMENTACION CON SWAGGER

http://localhost:8080/swagger-ui/index.html#/


