// src/layouts/LayoutPrincipal.jsx
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

export default function LayoutPrincipal({ children, carrito, vaciarCarrito }) {
  return (
    <>
      <Header carrito={carrito} vaciarCarrito={vaciarCarrito} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
