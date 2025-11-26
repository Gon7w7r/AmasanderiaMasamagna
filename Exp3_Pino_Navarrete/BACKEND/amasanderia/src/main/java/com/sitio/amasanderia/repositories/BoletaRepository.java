package com.sitio.amasanderia.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sitio.amasanderia.entities.Boleta;

@Repository
public interface BoletaRepository extends CrudRepository<Boleta, Long> {
    List<Boleta> findByEmailUsuario(String emailUsuario);
    List<Boleta> findAllByOrderByFechaCreacionDesc();
}