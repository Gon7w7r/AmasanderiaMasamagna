package com.sitio.amasanderia.repositories;

import org.springframework.data.repository.CrudRepository;

import com.sitio.amasanderia.entities.Producto;

public interface ProductoRepository extends CrudRepository<Producto, Long> {

}
