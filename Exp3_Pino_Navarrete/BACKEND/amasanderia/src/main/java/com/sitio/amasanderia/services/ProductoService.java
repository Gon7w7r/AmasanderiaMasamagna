package com.sitio.amasanderia.services;

import java.util.List;
import java.util.Optional;

import com.sitio.amasanderia.entities.Producto;

public interface ProductoService {
    Optional<Producto> findById(Long id);
    Producto save(Producto unProducto);
    
    Producto crear(Producto producto);
    Producto obtenerId(Long id);
    List<Producto> listarTodas();    
    void eliminar(Long id);
    Producto actualizar(Long id, Producto productoActualizado);
    Producto desactivar(Long id);
    Producto activar(Long id);

    
}
