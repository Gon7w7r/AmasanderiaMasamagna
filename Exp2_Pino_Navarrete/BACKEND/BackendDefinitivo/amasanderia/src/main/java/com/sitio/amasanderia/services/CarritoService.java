package com.sitio.amasanderia.services;

import java.util.List;
import com.sitio.amasanderia.entities.Carrito;
import com.sitio.amasanderia.entities.Usuario;

public interface CarritoService {

    // Crear un carrito nuevo para un usuario
    Carrito crearCarrito(Usuario usuario);

    // Obtener todos los carritos de un usuario
    List<Carrito> obtenerCarritosUsuario(Usuario usuario);

    // Obtener el carrito activo de un usuario; si no tiene, crear uno
    Carrito obtenerCarritoActivo(Usuario usuario);

    // Cambiar estado del carrito (activo, procesado, cancelado)
    void cambiarEstadoCarrito(Carrito carrito, String estado);
}
