package com.sitio.amasanderia.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sitio.amasanderia.entities.Carrito;
import com.sitio.amasanderia.entities.Usuario;

@Repository
public interface CarritoRepository extends CrudRepository<Carrito, Long> {

    // Obtener todos los carritos de un usuario
    List<Carrito> findByUsuario(Usuario usuario);

    // Obtener carritos activos de un usuario
    List<Carrito> findByUsuarioAndEstado(Usuario usuario, String estado);

}
