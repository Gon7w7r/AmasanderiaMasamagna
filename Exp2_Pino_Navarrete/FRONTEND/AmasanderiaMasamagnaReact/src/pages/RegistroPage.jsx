import React from "react";
import Registro from "../components/registroFormulario";
// import logo from "../../public/images/logo.jpg";
function RegistroPage({ agregarCarrito }) {
  return (
    <main id="main-registro">
        <div className="registro-page">
            <img src="/images/logo.jpg"  alt="Main Logo" className="imagen-centro"/>
            <Registro />
        </div>
    </main>
    
  );
}

export default RegistroPage;
