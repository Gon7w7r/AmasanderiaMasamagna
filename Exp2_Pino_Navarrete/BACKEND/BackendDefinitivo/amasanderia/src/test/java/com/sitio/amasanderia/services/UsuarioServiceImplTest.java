package com.sitio.amasanderia.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.sitio.amasanderia.entities.Usuario;
import com.sitio.amasanderia.repositories.UsuarioRepository;

public class UsuarioServiceImplTest {

    @InjectMocks
    private UsuarioServiceImpl service;

    @Mock
    private UsuarioRepository repo;

    private Usuario usuario1;
    private Usuario usuario2;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
        cargarUsuarios();
    }

    // TEST 1: Buscar todos los usuarios
    @Test
    public void buscarTodosTest() {

        List<Usuario> usuariosMock = Arrays.asList(usuario1, usuario2);
        when(repo.findAll()).thenReturn(usuariosMock);

        List<Usuario> response = service.findByAll();

        assertNotNull(response);
        assertEquals(2, response.size());
        assertEquals("19011022K", response.get(0).getRut());
        assertEquals("123456789", response.get(1).getRut());
        verify(repo, times(1)).findAll();
    }

    // TEST 2: Buscar usuario por RUT existente
    @Test
    public void buscarPorRutTest() {

        when(repo.findById("19011022K")).thenReturn(Optional.of(usuario1));

        Optional<Usuario> response = service.findById("19011022K");

        assertTrue(response.isPresent());
        assertEquals("Admin", response.get().getNombre());
        assertEquals("admin@duoc.cl", response.get().getEmail());
        verify(repo, times(1)).findById("19011022K");
    }

    // TEST 3: Eliminar usuario existente
    @Test
    public void eliminarUsuarioTest() {

        when(repo.findById("19011022K")).thenReturn(Optional.of(usuario1));
        doNothing().when(repo).delete(usuario1);

        Optional<Usuario> response = service.delete(usuario1);

        assertTrue(response.isPresent());
        assertEquals("19011022K", response.get().getRut());
        verify(repo, times(1)).findById("19011022K");
        verify(repo, times(1)).delete(usuario1);
    }

    public void cargarUsuarios() {
        usuario1 = new Usuario("19011022K", "Admin", "admin@duoc.cl", "password123", "administrador", "activo", LocalDateTime.now());
        usuario2 = new Usuario("123456789", "Juan Pérez", "juan@gmail.com", "pass123", "cliente", "activo", LocalDateTime.now());
    }
}