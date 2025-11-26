package com.sitio.amasanderia.services;

import java.util.List;
import java.util.Optional;

import com.sitio.amasanderia.entities.Usuario;

public interface UsuarioService {
    List<Usuario> findByAll();

    Optional<Usuario> findById(String rut);

    Usuario save(Usuario user);

    Optional<Usuario> delete(Usuario user);
        
    Optional<Usuario> findByEmail(String email);

}
