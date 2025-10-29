package com.sitio.amasanderia.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sitio.amasanderia.entities.Usuario;
import com.sitio.amasanderia.services.UsuarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Usuarios", description = "Operaciones relacionadas para gestionar usuarios")
@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    //LISTAR USUARIOS GET
    @Operation(summary = "Listar todos los usuarios", description = "Obtiene una lista de todos los usuarios registrados")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de usuarios obtenida exitosamente",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = Usuario.class)))
    })
    @GetMapping
    public List<Usuario> list() {
        return service.findByAll();
    }

    //OBTENER USUARIO POR RUT GET-RUT
    @Operation(summary = "Obtener usuario por RUT", description = "Obtiene los detalles de un usuario específico utilizando su RUT")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario encontrado",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = Usuario.class))),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @GetMapping("/{rut}")
    public ResponseEntity<?> verDetalle(@PathVariable String rut) {
        Optional<Usuario> usuarioOptional = service.findById(rut);
        if (usuarioOptional.isPresent()) {
            return ResponseEntity.ok(usuarioOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    //CREAR USUARIO POST
    @Operation(summary = "Crear nuevo usuario", description = "Registra un nuevo usuario en el sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Usuario creado exitosamente",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = Usuario.class)))
    })
    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Usuario user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(user));
    }

    //MODIFICAR USUARIO PUT
    @Operation(summary = "Modificar usuario", description = "Actualiza la información de un usuario existente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario modificado exitosamente",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = Usuario.class))),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @PutMapping("/{rut}")
    public ResponseEntity<?> modificar(@PathVariable String rut, @RequestBody Usuario user) {
        Optional<Usuario> usuarioOptional = service.findById(rut);
        if (usuarioOptional.isPresent()) {
            Usuario userExistente = usuarioOptional.get();
            userExistente.setNombre(user.getNombre());
            userExistente.setContrasena(user.getContrasena());
            userExistente.setRol(user.getRol());
            userExistente.setEmail(user.getEmail());
            userExistente.setEstado(user.getEstado());
            userExistente.setFechaCreacion(user.getFechaCreacion());
            Usuario userModificado = service.save(userExistente);
            return ResponseEntity.ok(userModificado);
        }
        return ResponseEntity.notFound().build();
    }

    //ELIMINAR USUARIO DELETE-RUT
    @Operation(summary = "Eliminar usuario", description = "Elimina un usuario específico utilizando su RUT")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario eliminado exitosamente",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = Usuario.class))),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @DeleteMapping("/{rut}")
    public ResponseEntity<?> eliminar(@PathVariable String rut) {
        Usuario user = new Usuario();
        user.setRut(rut);
        Optional<Usuario> userOptional = service.delete(user);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    //LOGIN USUARIO POST
    @Operation(summary = "Login de usuario", description = "Autentica a un usuario utilizando su email y contraseña")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login exitoso",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = Usuario.class))),
        @ApiResponse(responseCode = "401", description = "Contraseña incorrecta"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario user) {
        Optional<Usuario> usuarioOptional = service.findByEmail(user.getEmail());
        
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            if (usuario.getContrasena().equals(user.getContrasena())) {
                return ResponseEntity.ok(usuario);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                    .body("Contraseña incorrecta");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body("Usuario no encontrado");
    }

}
