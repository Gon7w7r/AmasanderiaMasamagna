package com.sitio.amasanderia.repositories;

import org.springframework.data.repository.CrudRepository;

import com.sitio.amasanderia.entities.Usuario;
import java.util.Optional;
public interface UsuarioRepository extends CrudRepository<Usuario, String> {
    Optional<Usuario> findByEmail(String email); 
}   
