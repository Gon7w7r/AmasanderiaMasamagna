package com.sitio.amasanderia.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sitio.amasanderia.entities.Producto;
import com.sitio.amasanderia.repositories.ProductoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoServiceImpl implements ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Override
    public Producto crear(Producto producto){
        producto.setEstado(producto.getStock() > 0);
        return productoRepository.save(producto);
    }


    @Override
    public Producto obtenerId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    @Override
    public List<Producto> listarTodas() {
        return (List<Producto>) productoRepository.findAll();
    }

    @Override
    public void eliminar(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new RuntimeException("Producto no encontrado");
        }
       productoRepository.deleteById(id);
    }

    @Override
    public Producto actualizar(Long id, Producto productoActualizado) {
        Producto existente = obtenerId(id);
        existente.setNombre(productoActualizado.getNombre());
        existente.setStock(productoActualizado.getStock());
        existente.setImagenUrl(productoActualizado.getImagenUrl());
        existente.setCategoria(productoActualizado.getCategoria());

        existente.setFechaCreacion(productoActualizado.getFechaCreacion());
        existente.setDescripcion(productoActualizado.getDescripcion());
        existente.setPrecio(productoActualizado.getPrecio());

        existente.setEstado(productoActualizado.getStock() > 0);

        return productoRepository.save(existente);
    }

    @Override
    public Producto desactivar(Long id){
        Producto producto = obtenerId(id);
        producto.setEstado(false);
        return productoRepository.save(producto);
    }


    @Override
    public Optional<Producto> findById(Long id) {
        return productoRepository.findById(id);
    }


    @Override
    public Producto save(Producto unProducto) {
        unProducto.setEstado(unProducto.getStock() > 0);
        return productoRepository.save(unProducto);    
    }
    
}
