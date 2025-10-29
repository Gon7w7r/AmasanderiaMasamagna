package com.sitio.amasanderia.services;

import java.util.List;

import com.sitio.amasanderia.entities.Carrito;
import com.sitio.amasanderia.entities.ItemCarrito;
import com.sitio.amasanderia.entities.Producto;

public interface ItemCarritoService {

    ItemCarrito agregarProducto(Carrito carrito, Producto producto, int cantidad);

    List<ItemCarrito> obtenerItemsCarrito(Carrito carrito);

    void eliminarItem(ItemCarrito item);

    void vaciarCarrito(Carrito carrito);

    // Nuevo método: obtener item por id
    ItemCarrito obtenerItemPorId(Long id);
}
