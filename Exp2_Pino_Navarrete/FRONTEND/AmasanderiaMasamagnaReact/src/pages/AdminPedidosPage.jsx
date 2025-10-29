import React from "react";
import AdminLayout from "../layouts/AdminLayout.jsx";
import PedidosLista from "../components/adminPedidos.jsx"; // Ajusta la ruta según tu proyecto

export default function PedidosPage() {
  return (
    <AdminLayout>
      <h1>Gestión de Pedidos</h1>
      <PedidosLista />
    </AdminLayout>
  );
}
