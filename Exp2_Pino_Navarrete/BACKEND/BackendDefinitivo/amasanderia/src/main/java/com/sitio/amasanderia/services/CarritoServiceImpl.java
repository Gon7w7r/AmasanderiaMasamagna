package com.sitio.amasanderia.services;

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
    @Transactional(readOnly = true)
    public Carrito obtenerCarritoActivo(Usuario usuario) {
        List<Carrito> carritosActivos = carritoRepo.findByUsuarioAndEstado(usuario, "activo");
        if (carritosActivos.isEmpty()) {
            return crearCarrito(usuario);
        } else {
            return carritosActivos.get(0); // tomamos el primero
        }
    }

    @Override
    @Transactional
    public void cambiarEstadoCarrito(Carrito carrito, String estado) {
        carrito.setEstado(estado);
        carritoRepo.save(carrito);
    }
}
