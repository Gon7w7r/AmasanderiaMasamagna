// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";
import LayoutPrincipal from "./layouts/LayoutPrincipal";
import torta from "../public/images/torta.jpg";

// Páginas...
import ProductosPage from "./pages/ProductosPage";
import ContactoPage from "./pages/ContactoPage";
import RegistroPage from "./pages/RegistroPage";
import LoginPage from "./pages/LoginPage";
import ResumenCarritoPage from "./pages/ResumenCarritoPage";
import LoginAdminPage from "./pages/LoginAdminPage";
import IndexAdminPage from "./pages/IndexAdminPage";
import AdminProductosPage from "./pages/AdminProductosPage";
import AdminUsuariosPage from "./pages/AdminUsuariosPage";
import AdminPedidosPage from "./pages/AdminPedidosPage";
import AdminConfiguracionPage from "./pages/AdminConfiguracionPage";
import MisPedidosPage from "./pages/MisPedidosPage";


// Componente que muestra loading mientras se valida la autenticación
function AuthLoading() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <p>Cargando...</p>
    </div>
  );
}

// Componente wrapper que tiene acceso al AuthContext
function AppWithAuth() {
  const { user, token, loading, checkTokenExpiration, logout } = useAuth(); // ← AGREGAR loading AQUÍ
  
  // Mostrar loading mientras se valida la autenticación
  if (loading) {
    return <AuthLoading />;
  }
  
  return (
    <CarritoProvider auth={{ user, token, checkTokenExpiration, logout }}>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutPrincipal>
              <br></br>
              <br></br>
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
              <ProductosPage />
            </LayoutPrincipal>
          }
        />

        <Route
          path="/productos"
          element={
            <LayoutPrincipal>
              <ProductosPage />
            </LayoutPrincipal>
          }
        />

        <Route
          path="/contacto"
          element={
            <LayoutPrincipal>
              <ContactoPage />
            </LayoutPrincipal>
          }
        />

        <Route
          path="/registro"
          element={
            <LayoutPrincipal>
              <RegistroPage />
            </LayoutPrincipal>
          }
        />

        <Route
          path="/login"
          element={
            <LayoutPrincipal>
              <LoginPage />
            </LayoutPrincipal>
          }
        />

        <Route
          path="/carritoResumen"
          element={
            <LayoutPrincipal>
              <ResumenCarritoPage />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/pedidos"
          element={
            <LayoutPrincipal>
              <MisPedidosPage />
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
    </CarritoProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppWithAuth />
    </AuthProvider>
  );
}