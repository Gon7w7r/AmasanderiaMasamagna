import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import "./assets/css/estilos.css";
import { CarritoProvider } from "./context/CarritoContext.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>  
      </AdminProvider>
    </BrowserRouter>
  </StrictMode>
)
