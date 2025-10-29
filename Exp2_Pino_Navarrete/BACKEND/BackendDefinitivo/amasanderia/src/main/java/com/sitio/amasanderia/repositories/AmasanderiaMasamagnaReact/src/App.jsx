import React, { useState, useEffect } from "react";
import ListaProductos from "./components/ListaProductos.jsx";
import LayoutPrincipal from "./layouts/LayoutPrincipal.jsx";
import LoginRegister from "./components/loginRegister.jsx";
import torta from "../public/images/torta.jpg";
import { Routes, Route } from "react-router-dom";

// Páginas
import ProductosPage from "./pages/ProductosPage.jsx";
import ContactoPage from "./pages/ContactoPage.jsx";
import RegistroPage from "./pages/RegistroPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ResumenCarritoPage from "./pages/ResumenCarritoPage.jsx";
import LoginAdminPage from "./pages/LoginAdminPage.jsx";
import IndexAdminPage from "./pages/IndexAdminPage.jsx";
import AdminProductosPage from "./pages/AdminProductosPage.jsx";
import AdminUsuariosPage from "./pages/AdminUsuariosPage.jsx";
import AdminPedidosPage from  "./pages/AdminPedidosPage.jsx";
import AdminConfiguracionPage from  "./pages/AdminConfiguracionPage.jsx";



export default function App() {
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito del localStorage al iniciar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(stored);
  }, []);

  // Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Función para agregar producto al carrito respetando stock
  const agregarCarrito = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      const cantidadEnCarrito = existente ? existente.cantidad : 0;

      // Verificar stock disponible
      if (cantidadEnCarrito >= producto.stock) {
        alert("No puedes agregar más unidades de este producto, stock insuficiente.");
        return prev;
      }

      if (existente) {
        // Incrementar cantidad
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Agregar nuevo producto al carrito
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LayoutPrincipal carrito={carrito} vaciarCarrito={vaciarCarrito}>
            <LoginRegister />
            <div id="articulo">
              <a href="#">
                <img src={torta} alt="torta" className="articuloTorta" />
              </a>
              <div className="texto-articulo">
                <h2>PRÓXIMAMENTE PRUEBA NUESTRA TORTA DE CHOCOLATE</h2>
                <p>
                  Prueba próximamente nuestra deliciosa y esponjosa torta de
                  chocolate, rellena con una mezcla exquisita de chocolate,
                  decorada con crema de chocolate.
                </p>
              </div>
            </div>
            <ListaProductos carrito={carrito} agregarCarrito={agregarCarrito} />
          </LayoutPrincipal>
        }
      />

      <Route
        path="/productos"
        element={
          <LayoutPrincipal carrito={carrito} vaciarCarrito={vaciarCarrito}>
            <ProductosPage carrito={carrito} agregarCarrito={agregarCarrito} />
          </LayoutPrincipal>
        }
      />

      <Route
        path="/contacto"
        element={
          <LayoutPrincipal carrito={carrito} vaciarCarrito={vaciarCarrito}>
            <ContactoPage />
          </LayoutPrincipal>
        }
      />

      <Route
        path="/registro"
        element={
          <LayoutPrincipal carrito={carrito} vaciarCarrito={vaciarCarrito}>
            <RegistroPage />
          </LayoutPrincipal>
        }
      />

      <Route
        path="/login"
        element={
          <LayoutPrincipal carrito={carrito} vaciarCarrito={vaciarCarrito}>
            <LoginPage />
          </LayoutPrincipal>
        }
      />

      <Route
        path="/carritoResumen"
        element={
          <LayoutPrincipal carrito={carrito} vaciarCarrito={vaciarCarrito}>
            <ResumenCarritoPage carrito={carrito} />
          </LayoutPrincipal>
        }
      />

      {/* Rutas de administración */}
      <Route path="/adminLogin" element={<LoginAdminPage />} />
      <Route path="/adminIndex" element={<IndexAdminPage />} />
      <Route path="/adminProductos" element={<AdminProductosPage />} />
      <Route path="/adminUsuarios" element={<AdminUsuariosPage />} />
      <Route path="/adminPedidos" element={<AdminPedidosPage />} />
      <Route path="/adminConfiguracion" element={<AdminConfiguracionPage />} />
      
    </Routes>
  );
}
