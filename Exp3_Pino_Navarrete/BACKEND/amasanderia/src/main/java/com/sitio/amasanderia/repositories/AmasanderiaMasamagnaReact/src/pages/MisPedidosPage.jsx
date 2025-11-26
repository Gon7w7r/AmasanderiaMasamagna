// src/pages/MisPedidosPage.jsx
import React from "react";
import MisPedidos from "../components/misPedidos.jsx";

function MisPedidosPage() {
  return (
    <main id="main-mis-pedidos">
      <div className="mis-pedidos-page">
        <img src="/images/logo.jpg" alt="Main Logo" className="imagen-centro"/>
        <MisPedidos />
      </div>
    </main>
  );
}

export default MisPedidosPage;