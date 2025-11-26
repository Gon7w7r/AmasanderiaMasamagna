import React from 'react';
import ContactoFormulario from '../components/contactoFormulario';
// import logo from "../public/images/logo.jpg";
import LoginRegister from '../components/loginRegister.jsx'
export default function ContactoPage ({ agregarCarrito }) {
    return (
        <main id="main-contacto">
            <LoginRegister />
            <div className="contacto-page">
            <img src="/images/logo.jpg"  alt="Main Logo" className="imagen-centro"/>
            <ContactoFormulario />
            </div>

        </main>
        
    );
};
