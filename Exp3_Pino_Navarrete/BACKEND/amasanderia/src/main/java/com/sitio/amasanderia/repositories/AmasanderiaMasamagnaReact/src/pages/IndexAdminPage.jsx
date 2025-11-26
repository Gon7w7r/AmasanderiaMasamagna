// src/pages/IndexAdminPage.jsx
import React from "react";
import AdminLayout from "../layouts/AdminLayout.jsx";
import AdminDashboard from "../components/adminDashboard.jsx";

export default function IndexAdminPage() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}
