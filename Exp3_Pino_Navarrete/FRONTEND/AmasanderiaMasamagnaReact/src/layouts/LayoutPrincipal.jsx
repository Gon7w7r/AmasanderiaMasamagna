// src/layouts/LayoutPrincipal.jsx
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

export default function LayoutPrincipal({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}