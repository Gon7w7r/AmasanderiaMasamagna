package com.sitio.amasanderia.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sitio.amasanderia.entities.Usuario;
import com.sitio.amasanderia.services.UsuarioService;

@SpringBootTest
@AutoConfigureMockMvc
public class UsuarioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UsuarioService usuarioService;

    // TEST 1: Listar todos los usuarios
    @Test
    public void listarUsuariosTest() throws Exception {

        Usuario usuario1 = new Usuario("19011022K", "Admin","ApellidoAdmin",LocalDate.of(1985, 5, 20), "admin@duoc.cl","AdminRegion","AdminComuna","AdminDireccion", "password123", "administrador", true, LocalDateTime.now());
        Usuario usuario2 = new Usuario("123456789", "Juan","Pérez",LocalDate.of(1985, 5, 20) ,"juan@gmail.com","Metropolitana","Maipu","Alaska1371", "pass123", "cliente", true, LocalDateTime.now());
        
        List<Usuario> usuariosMock = Arrays.asList(usuario1, usuario2);
        when(usuarioService.findByAll()).thenReturn(usuariosMock);

        mockMvc.perform(get("/api/usuarios")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].nombre").value("Admin"))
                .andExpect(jsonPath("$[1].nombre").value("Juan"))
                .andExpect(jsonPath("$[1].apellido").value("Pérez"));

    }

    // TEST 2: Obtener usuario por RUT existente
    @Test
    public void obtenerUsuarioPorRutTest() throws Exception {

        Usuario usuario = new Usuario("19011022K", "Admin","ApellidoAdmin",LocalDate.of(1985, 5, 20), "admin@duoc.cl","AdminRegion","AdminComuna","AdminDireccion", "password123", "administrador", true, LocalDateTime.now());
        when(usuarioService.findById("19011022K")).thenReturn(Optional.of(usuario));

        mockMvc.perform(get("/api/usuarios/19011022K")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.rut").value("19011022K"))
                .andExpect(jsonPath("$.nombre").value("Admin"))
                .andExpect(jsonPath("$.email").value("admin@duoc.cl"));
    }

    // TEST 3: Obtener usuario por RUT no existente
    @Test
    public void usuarioNoExisteTest() throws Exception {

        when(usuarioService.findById("999999999")).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/usuarios/999999999")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    // TEST 4: Crear nuevo usuario
    @Test
    public void crearUsuarioTest() throws Exception {

        Usuario usuarioNuevo = new Usuario(null, "Maria","Lopez",LocalDate.of(1985, 5, 20) ,"maria@gmail.com","Metropolitana","Maipu","Alaska1371", "password456", "cliente", true, null);
        Usuario usuarioCreado = new Usuario("987654321", "Maria","Lopez",LocalDate.of(1985, 5, 20), "maria@gmail.com","Metropolitana","Maipu","Alaska1371", "password456", "cliente", true, LocalDateTime.now());
       

        when(usuarioService.save(any(Usuario.class))).thenReturn(usuarioCreado);

        mockMvc.perform(post("/api/usuarios")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(usuarioNuevo)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.rut").value("987654321"))
                .andExpect(jsonPath("$.nombre").value("Maria"))
                .andExpect(jsonPath("$.apellido").value("Lopez"));

    }

    // TEST 5: Login exitoso
    @Test
    public void loginExitosoTest() throws Exception {

        Usuario usuarioLogin = new Usuario(null, null,null,null, "admin@duoc.cl",null,null,null, "password123", null, null, null);
        Usuario usuarioBD = new Usuario("19011022K", "Admin","ApellidoAdmin",LocalDate.of(1985, 5, 20), "admin@duoc.cl","AdminRegion","AdminComuna","AdminDireccion", "password123", "administrador", true, LocalDateTime.now());

        when(usuarioService.findByEmail("admin@duoc.cl")).thenReturn(Optional.of(usuarioBD));

        mockMvc.perform(post("/api/usuarios/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(usuarioLogin)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.rut").value("19011022K"))
                .andExpect(jsonPath("$.nombre").value("Admin"));
    }

    // TEST 6: Login con contraseña incorrecta
    @Test
    public void loginContrasenaIncorrectaTest() throws Exception {


        Usuario usuarioLogin = new Usuario(null, null,null,null, "admin@duoc.cl",null,null,null, "passwordErronea", null, null, null);
        Usuario usuarioBD = new Usuario("19011022K", "Admin","ApellidoAdmin",LocalDate.of(1985, 5, 20), "admin@duoc.cl","AdminRegion","AdminComuna","AdminDireccion", "password123", "administrador", true, LocalDateTime.now());


        when(usuarioService.findByEmail("admin@duoc.cl")).thenReturn(Optional.of(usuarioBD));

        mockMvc.perform(post("/api/usuarios/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(usuarioLogin)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Contraseña incorrecta"));
    }
}