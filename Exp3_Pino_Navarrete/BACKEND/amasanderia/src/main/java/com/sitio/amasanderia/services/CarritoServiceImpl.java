package com.sitio.amasanderia.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sitio.amasanderia.entities.Carrito;
import com.sitio.amasanderia.entities.Usuario;
import com.sitio.amasanderia.repositories.CarritoRepository;

@Service
public class CarritoServiceImpl implements CarritoService {

    @Autowired
    private CarritoRepository carritoRepo;

    @Override
    @Transactional
    public Carrito crearCarrito(Usuario usuario) {
        Carrito carrito = new Carrito();
        carrito.setUsuario(usuario);
        carrito.setEstado("activo");
        return carritoRepo.save(carrito);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Carrito> obtenerCarritosUsuario(Usuario usuario) {
        return carritoRepo.findByUsuario(usuario);
    }

    @Override
    @Transactional
    public Carrito obtenerCarritoActivo(Usuario usuario) {
        // Si el usuario está inactivo, no devolver carrito activo
        if (usuario != null && !usuario.getEstado()) {
            return null;
        }
        
        List<Carrito> carritosActivos = carritoRepo.findByUsuarioAndEstado(usuario, "activo");
        if (carritosActivos.isEmpty()) {
            return crearCarrito(usuario);
        } else {
            return carritosActivos.get(0);
        }
    }

    @Override
    @Transactional
    public void cambiarEstadoCarrito(Carrito carrito, String estado) {
        carrito.setEstado(estado);
        carritoRepo.save(carrito);
    }



    // En CarritoServiceImpl.java - agrega este método
    @Override
    @Transactional
    public void desactivarCarritosDeUsuario(Usuario usuario) {
        List<Carrito> carritosActivos = carritoRepo.findByUsuarioAndEstado(usuario, "activo");
        for (Carrito carrito : carritosActivos) {
            carrito.setEstado("inactivo");
            carrito.setFechaActualizacion(LocalDateTime.now());
            carritoRepo.save(carrito);
        }
        System.out.println("Desactivados " + carritosActivos.size() + " carritos para usuario: " + usuario.getRut());
    }


    // En CarritoServiceImpl.java
    @Override
    @Transactional(readOnly = true)
    public List<Carrito> obtenerTodosCarritos() {
        return (List<Carrito>) carritoRepo.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Carrito> obtenerCarritosPorEstado(String estado) {
        return carritoRepo.findByEstado(estado);
}
}
