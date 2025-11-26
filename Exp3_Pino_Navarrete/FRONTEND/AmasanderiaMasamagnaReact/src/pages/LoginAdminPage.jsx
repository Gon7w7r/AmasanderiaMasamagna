import { useState } from "react";
import "../assets/css/estilos.css";
import LoginAdmin from "../components/loginAdminFormulario";

export default function LoginAdminPage() {
  return(
        <div id="adminLoginBody">
            <div id="adminLoginMain">

                <LoginAdmin/>
            </div>
        </div>

  );
   
  
}
