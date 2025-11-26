package com.sitio.amasanderia.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sitio.amasanderia.entities.Carrito;
import com.sitio.amasanderia.entities.ItemCarrito;
import com.sitio.amasanderia.entities.Producto;
import com.sitio.amasanderia.repositories.ItemCarritoRepository;

@Service
public class ItemCarritoServiceImpl implements ItemCarritoService {

    @Autowired
    private ItemCarritoRepository itemRepo;

    @Override
    @Transactional
    public ItemCarrito agregarProducto(Carrito carrito, Producto producto, int cantidad) {
        ItemCarrito existente = itemRepo.findByCarritoAndProducto(carrito, producto);
        if (existente != null) {
            existente.setCantidad(existente.getCantidad() + cantidad);
            return itemRepo.save(existente);
        }
        ItemCarrito item = new ItemCarrito();
        item.setCarrito(carrito);
        item.setProducto(producto);
        item.setCantidad(cantidad);
        item.setPrecioUnitario(producto.getPrecio());
        return itemRepo.save(item);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ItemCarrito> obtenerItemsCarrito(Carrito carrito) {
        return itemRepo.findByCarrito(carrito);
    }

    @Override
    @Transactional
    public void eliminarItem(ItemCarrito item) {
        itemRepo.delete(item);
    }

    @Override
    @Transactional
    public void vaciarCarrito(Carrito carrito) {
        itemRepo.deleteByCarrito(carrito);
    }

    @Override
    @Transactional(readOnly = true)
    public ItemCarrito obtenerItemPorId(Long id) {
        return itemRepo.findById(id).orElse(null);
    }
}
