import React from "react";
import AdminLayout from "../layouts/AdminLayout.jsx";
import AdminProductos from "../components/adminProductos.jsx";

export default function AdminProductosPage() {
  return (
    <AdminLayout>
      <AdminProductos />
    </AdminLayout>
  );
}
