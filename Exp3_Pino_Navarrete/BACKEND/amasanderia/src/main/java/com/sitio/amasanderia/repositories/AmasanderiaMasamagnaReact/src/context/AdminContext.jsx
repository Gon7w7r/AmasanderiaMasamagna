import { createContext, useContext, useState, useEffect } from "react";
import { productos as productosBase } from "../data/productos.js";

const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [ingresos, setIngresos] = useState(0);

  // Inicializar desde localStorage o valores base
  useEffect(() => {
    setProductos(JSON.parse(localStorage.getItem("productos")) || productosBase);
    setUsuarios(JSON.parse(localStorage.getItem("usuarios")) || [
      {
        id: 1,
        run: "19011022K",
        nombre: "Admin",
        apellidos: "Principal",
        correo: "admin@duoc.cl",
        tipoUsuario: "administrador",
      },
    ]);
    setPedidos(JSON.parse(localStorage.getItem("pedidos")) || []);
    setIngresos(JSON.parse(localStorage.getItem("ingresos")) || 0);
  }, []);

  // Guardar cambios
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    localStorage.setItem("ingresos", JSON.stringify(ingresos));
  }, [pedidos, ingresos]);

  // Cuando el usuario paga
  const registrarPedido = (carrito, total) => {
    const nuevoPedido = {
      id: pedidos.length + 1,
      productos: carrito,
      total,
      fecha: new Date().toLocaleString("es-CL"),
    };
    setPedidos([...pedidos, nuevoPedido]);
    setIngresos((prev) => prev + total);
  };

  return (
    <AdminContext.Provider
      value={{
        productos,
        usuarios,
        pedidos,
        ingresos,
        registrarPedido,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
