package com.sitio.amasanderia.services;

import java.util.List;

import com.sitio.amasanderia.entities.Boleta;
import com.sitio.amasanderia.entities.Carrito;
import com.sitio.amasanderia.entities.Usuario;

public interface BoletaService {
    Boleta crearBoletaDesdeCarrito(Carrito carrito, Usuario usuario);
    List<Boleta> obtenerTodasBoletas();
    List<Boleta> obtenerBoletasPorUsuario(String emailUsuario);
    Boleta obtenerBoletaPorId(Long id);
}