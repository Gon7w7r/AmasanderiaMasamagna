import { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const guardado = localStorage.getItem("carrito");
    if (guardado) setCarrito(JSON.parse(guardado));
  }, []);

  // Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Agregar producto al carrito
  const agregarCarrito = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((p) => p.id === producto.id);
      if (existente) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  // Modificar cantidad de un producto
  const modificarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, cantidad: Math.max(p.cantidad + delta, 1) } : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  // Eliminar producto del carrito
  const eliminarItem = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  // Vaciar carrito
  const vaciarCarrito = () => setCarrito([]);

  // Pagar y actualizar stock en backend
    const procesarPago = async () => {
    try {
      for (let item of carrito) {
        // Calcular nuevo stock
        const nuevoStock = item.stock - item.cantidad;
        
        const response = await fetch(`http://localhost:8080/api/productos/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            ...item, 
            stock: nuevoStock 
          })
        });
        if (!response.ok) throw new Error(`Error al actualizar stock de ${item.nombre}`);
      }
      alert("Pago realizado correctamente");
      vaciarCarrito();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarCarrito, modificarCantidad, eliminarItem, vaciarCarrito, procesarPago }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
