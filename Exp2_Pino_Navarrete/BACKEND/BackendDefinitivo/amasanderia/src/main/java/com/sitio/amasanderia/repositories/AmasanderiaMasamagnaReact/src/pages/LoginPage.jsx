import React from "react";
import Login from "../components/loginFormulario";
import logo from "../../public/images/logo.jpg";
import { Link } from "react-router-dom";
function LoginPage({ agregarCarrito }) {
  return (
    <main id="main-login">
        <div id="switch-admin">
            <Link to="/adminLogin">Cambiar a Admin</Link>
        </div>
        <div className="login-page">
            <img src={logo}  alt="Main Logo" className="imagen-centro"/>
            <Login />
        </div>
    </main>
    
  );
}

export default LoginPage;
