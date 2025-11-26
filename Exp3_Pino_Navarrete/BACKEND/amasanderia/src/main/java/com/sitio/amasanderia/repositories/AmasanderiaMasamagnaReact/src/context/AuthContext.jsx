// contexts/AuthContext.jsx - VERSIÓN MEJORADA
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para decodificar el token y verificar expiración localmente
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // Convertir a milisegundos
      const currentTime = Date.now();
      
      console.log("⏰ Verificando expiración:", {
        expirationTime: new Date(expirationTime),
        currentTime: new Date(currentTime),
        isExpired: currentTime > expirationTime
      });
      
      return currentTime > expirationTime;
    } catch (error) {
      console.error("Error decodificando token:", error);
      return true;
    }
  };

  // Función para validar el token en el servidor
  const validateToken = async (tokenToValidate) => {
    try {
      const response = await fetch("http://localhost:8080/api/usuarios/validate-token", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${tokenToValidate}`,
          "Content-Type": "application/json"
        }
      });
      
      return response.ok;
    } catch (error) {
      console.error("Error validando token:", error);
      return false;
    }
  };

  // Verificar token al cargar la app
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        
        console.log("🔐 Inicializando autenticación...", { 
          hasToken: !!storedToken, 
          hasUser: !!storedUser 
        });
        
        if (storedToken && storedUser) {
          // Verificar expiración localmente primero
          if (isTokenExpired(storedToken)) {
            console.warn("❌ Token expirado (verificación local), limpiando sesión");
            logout();
          } else {
            // Si no está expirado localmente, validar con el servidor
            const isValid = await validateToken(storedToken);
            
            if (isValid) {
              const response = await fetch("http://localhost:8080/api/usuarios/validate-token", {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${storedToken}`,
                  "Content-Type": "application/json"
                }
              });
              
              const data = await response.json();
              console.log("✅ Token válido, usuario:", data.usuario.nombre);
              setUser(data.usuario);
              setToken(storedToken);
              localStorage.setItem("user", JSON.stringify(data.usuario));
            } else {
              console.warn("❌ Token inválido en servidor, limpiando sesión");
              logout();
            }
          }
        } else {
          console.log("🔓 No hay sesión guardada");
          setUser(null);
          setToken(null);
        }
      } catch (error) {
        console.error("💥 Error en initializeAuth:", error);
        logout();
      } finally {
        setLoading(false);
        console.log("🏁 AuthProvider listo, loading:", false);
      }
    };

    initializeAuth();
  }, []);

  // Verificación periódica cada 15 segundos (más frecuente para testing)
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      console.log("🕐 Verificando expiración del token...");
      
      if (isTokenExpired(token)) {
        console.warn("❌ Token expirado, cerrando sesión automáticamente");
        logout();
        alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      } else {
        console.log("✅ Token sigue válido");
      }
    }, 15 * 1000); // 15 segundos para testing

    return () => clearInterval(interval);
  }, [token]);

  // Verificar token antes de ciertas acciones
  const checkTokenExpiration = async () => {
    if (!token) return false;
    
    if (isTokenExpired(token)) {
      logout();
      alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      return false;
    }
    return true;
  };

  const login = (userData, authToken) => {
    console.log("🔑 Login exitoso:", userData.nombre);
    console.log("⏰ Token expira en:", new Date(JSON.parse(atob(authToken.split('.')[1])).exp * 1000));
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    console.log("🚪 Cerrando sesión");
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    checkTokenExpiration
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};