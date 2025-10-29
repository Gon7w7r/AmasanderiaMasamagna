import "../assets/css/estilos.css";
import { Link } from "react-router-dom";

export default function LoginRegister(){
    return(
        <div id="registro">

            <Link to="/login">Iniciar sesión</Link>
            <h1>|</h1>
            <Link to="/registro">Registrarse</Link>
        </div>
    );
}