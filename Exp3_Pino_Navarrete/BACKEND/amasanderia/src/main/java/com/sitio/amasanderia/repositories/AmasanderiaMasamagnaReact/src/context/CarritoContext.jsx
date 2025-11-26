// contexts/CarritoContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe ser usado dentro de CarritoProvider");
  }
  return context;
};

export const CarritoProvider = ({ children, auth }) => {
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(false);

  // Usar el auth que se pasa como prop
  const user = auth?.user;
  const token = auth?.token;
  const checkTokenExpiration = auth?.checkTokenExpiration;
  const logout = auth?.logout;

  // Cargar carrito desde el backend cuando el usuario cambia
  useEffect(() => {
    if (user && token) {
      cargarCarritoBackend();
    } else {
      setCarrito([]);
    }
  }, [user, token]);

  // Agrega esta función a tu CarritoContext.jsx
const modificarCantidad = async (itemId, delta) => {
  if (!token) return;

  try {
    // Primero obtener el item actual para saber la nueva cantidad
    const item = carrito.find(item => item.id === itemId);
    if (!item) return;

    const nuevaCantidad = item.cantidad + delta;
    
    if (nuevaCantidad < 1) {
      // Si la cantidad sería 0, eliminar el item
      await eliminarItem(itemId);
      return;
    }

    // Verificar stock
    const stockDisponible = item.producto?.stock || item.stock;
    if (nuevaCantidad > stockDisponible) {
      alert(`Solo hay ${stockDisponible} unidades disponibles.`);
      return;
    }

    // Actualizar en el backend - necesitarías un endpoint para esto
    // Por ahora, vamos a eliminar y agregar de nuevo
    await eliminarItem(itemId);
    await agregarCarrito(item.producto || item, nuevaCantidad);
    
  } catch (error) {
    console.error("Error modificando cantidad:", error);
    alert("Error al modificar la cantidad");
  }
};

  // Función para manejar errores de autenticación
  const handleAuthError = (error) => {
    console.error("Error de autenticación:", error);
    if (error.message.includes('401') || error.message.includes('Unauthorized') || 
        error.message.includes('Token expired')) {
      logout?.();
      alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      return true;
    }
    return false;
  };

  // Cargar carrito del backend
  // En CarritoContext.jsx - modifica cargarCarritoBackend
    const cargarCarritoBackend = async () => {
        if (!user?.rut || !token) return;
        
        // Verificar si el usuario está activo
        if (user.estado === false) {
            console.log("Usuario inactivo, no se puede cargar carrito");
            setCarrito([]);
            return;
        }
        
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/api/carrito/${user.rut}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const carritoData = await response.json();
                setCarrito(carritoData.items || []);
            } else if (response.status === 401) {
                logout?.();
                alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
                setCarrito([]);
            } else if (response.status === 404) {
                // Usuario inactivo o sin carrito
                setCarrito([]);
            } else {
                console.error("Error cargando carrito");
                setCarrito([]);
            }
        } catch (error) {
            console.error("Error:", error);
            if (!handleAuthError(error)) {
                alert("Error de conexión al cargar el carrito");
            }
            setCarrito([]);
        } finally {
            setLoading(false);
        }
    };

  // Agregar producto al carrito
  const agregarCarrito = async (producto, cantidad = 1) => {
    if (!user || !token) {
        alert("Debes iniciar sesión para agregar productos al carrito");
        return false;
    }

    // Verificar si el usuario está activo
    if (user.estado === false) {
        alert("Tu cuenta está desactivada. No puedes agregar productos al carrito.");
        return false;
    }

    // Verificar si el token sigue válido antes de la operación
    if (checkTokenExpiration) {
      const tokenValido = await checkTokenExpiration();
      if (!tokenValido) {
        return false;
      }
    }

    

    try {
      console.log("Agregando producto:", { 
        usuarioRut: user.rut, 
        productoId: producto.id, 
        cantidad 
      });

      const response = await fetch(`http://localhost:8080/api/carrito/${user.rut}/agregar?productoId=${producto.id}&cantidad=${cantidad}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      console.log("Response status:", response.status);
      
      if (response.ok) {
        await cargarCarritoBackend();
        return true;
      } else if (response.status === 401) {
        // Token expirado
        logout?.();
        alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        return false;
      } else {
        let errorMsg = "Error desconocido";
        try {
          const errorData = await response.text();
          errorMsg = errorData;
          console.error("Error response:", errorData);
        } catch (e) {
          errorMsg = `Error ${response.status}: ${response.statusText}`;
        }
        alert(`Error al agregar producto: ${errorMsg}`);
        return false;
      }
    } catch (error) {
      console.error("Error agregando producto:", error);
      if (!handleAuthError(error)) {
        alert("Error de conexión al agregar producto al carrito");
      }
      return false;
    }
  };

  // Eliminar item del carrito
  const eliminarItem = async (itemId) => {
    if (!token) return;

    // Verificar si el token sigue válido antes de la operación
    if (checkTokenExpiration) {
      const tokenValido = await checkTokenExpiration();
      if (!tokenValido) {
        return;
      }
    }

    try {
      const response = await fetch(`http://localhost:8080/api/carrito/item/${itemId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        await cargarCarritoBackend();
      } else if (response.status === 401) {
        logout?.();
        alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      } else {
        alert("Error eliminando item");
      }
    } catch (error) {
      console.error("Error:", error);
      handleAuthError(error);
    }
  };

  // Vaciar carrito
  const vaciarCarrito = async () => {
    if (!user?.rut || !token) return;

    // Verificar si el token sigue válido antes de la operación
    if (checkTokenExpiration) {
      const tokenValido = await checkTokenExpiration();
      if (!tokenValido) {
        return;
      }
    }

    try {
      const response = await fetch(`http://localhost:8080/api/carrito/${user.rut}/vaciar`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        setCarrito([]);
      } else if (response.status === 401) {
        logout?.();
        alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      } else {
        alert("Error vaciando carrito");
      }
    } catch (error) {
      console.error("Error:", error);
      handleAuthError(error);
    }
  };

  // Procesar pago
const procesarPago = async () => {
    if (!user?.rut || !token) return false;

    // Verificar si el token sigue válido antes de la operación
    if (checkTokenExpiration) {
        const tokenValido = await checkTokenExpiration();
        if (!tokenValido) {
            return false;
        }
    }

    try {
        const response = await fetch(`http://localhost:8080/api/carrito/${user.rut}/pagar`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const boleta = data.boleta;
            
            // Mostrar información de la boleta
            alert(`✅ Pago realizado correctamente!\n\n📄 Boleta #${boleta.id}\n📧 Email: ${boleta.emailUsuario}\n🏠 Dirección: ${boleta.direccionUsuario}\n💰 Subtotal: $${boleta.subtotal.toLocaleString("es-CL")}\n📊 IVA (19%): $${boleta.iva.toLocaleString("es-CL")}\n💵 Total: $${boleta.montoFinal.toLocaleString("es-CL")}\n📅 Fecha: ${new Date(boleta.fechaCreacion).toLocaleDateString('es-CL')}`);
            
            await cargarCarritoBackend();
            return true;
        } else if (response.status === 401) {
            logout?.();
            alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
            return false;
        } else {
            const error = await response.text();
            alert(`Error en el pago: ${error}`);
            return false;
        }
    } catch (error) {
        console.error("Error:", error);
        if (!handleAuthError(error)) {
            alert("Error al procesar el pago");
        }
        return false;
    }
};

  // Calcular total
  const getTotal = () => {
    return carrito.reduce((total, item) => total + ((item.precioUnitario || item.precio) * item.cantidad), 0);
  };

  // Calcular cantidad total de items
  const getCantidadTotal = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  return (
    <CarritoContext.Provider value={{
      carrito,
      loading,
      agregarCarrito,
      eliminarItem,
      vaciarCarrito,
      procesarPago,
      modificarCantidad,
      getTotal,
      getCantidadTotal,
      recargarCarrito: cargarCarritoBackend
    }}>
      {children}
    </CarritoContext.Provider>
  );


  
};