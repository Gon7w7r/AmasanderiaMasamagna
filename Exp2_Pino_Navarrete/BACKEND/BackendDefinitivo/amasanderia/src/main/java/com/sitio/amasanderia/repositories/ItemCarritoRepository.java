package com.sitio.amasanderia.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sitio.amasanderia.entities.Carrito;
import com.sitio.amasanderia.entities.ItemCarrito;
import com.sitio.amasanderia.entities.Producto;

@Repository
public interface ItemCarritoRepository extends CrudRepository<ItemCarrito, Long> {

    // Obtener todos los items de un carrito
    List<ItemCarrito> findByCarrito(Carrito carrito);

    // Buscar un item por carrito y producto (para actualizar cantidad si ya existe)
    ItemCarrito findByCarritoAndProducto(Carrito carrito, Producto producto);

    // Eliminar todos los items de un carrito
    void deleteByCarrito(Carrito carrito);

}
