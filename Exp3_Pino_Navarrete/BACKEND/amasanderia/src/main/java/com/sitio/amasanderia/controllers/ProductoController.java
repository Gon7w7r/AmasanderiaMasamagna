package com.sitio.amasanderia.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sitio.amasanderia.entities.Producto;
import com.sitio.amasanderia.services.ProductoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/productos")
@Tag(name = "Productos", description = "Operaciones relacionadas con productos")
public class ProductoController {
    
    @Autowired
    private ProductoService productoServices;

    //LISTAR PRODUCTOS GET
    @Operation(summary = "Listar todos los productos",
               description = "Retorna una lista de todos los productos disponibles")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de productos obtenida exitosamente",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Producto.class)))
    })
    @GetMapping
    public ResponseEntity<List<Producto>> listarProductos() {
        List<Producto> productos = productoServices.listarTodas();
        return ResponseEntity.ok(productos);
    }

    //OBTENER PRODUCTO POR ID GET-ID
    @Operation(summary = "Obtener un producto por ID",
               description = "Retorna un producto específico utilizando su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Producto encontrado",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Producto.class))),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable Long id) {
        try {
            Producto producto = productoServices.obtenerId(id);
            return ResponseEntity.ok(producto);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    } 

    //CREAR PRODUCTO POST
    @Operation(summary = "Crear un nuevo producto",
               description = "Crea un nuevo producto en el sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Producto creado exitosamente",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Producto.class))),
        @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    })
    @PostMapping
    public ResponseEntity<?> crearProducto(@RequestBody Producto unProducto) {
        Producto nuevoProducto = productoServices.crear(unProducto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
    }
    
    //ELIMINAR PRODUCTO DELETE-ID
    @Operation(summary = "Eliminar un producto por ID",
               description = "Elimina un producto específico utilizando su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Producto eliminado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        try {
            productoServices.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }
    
    //ACTUALIZAR PRODUCTO PUT-ID
    @Operation(summary = "Actualizar un producto por ID",
               description = "Actualiza los detalles de un producto específico utilizando su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Producto actualizado exitosamente",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Producto.class))),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id, @RequestBody Producto productoActualizado) {
        try{
            Producto producto = productoServices.actualizar(id, productoActualizado);
            return ResponseEntity.ok(producto);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    //DESACTIVAR PRODUCTO PATCH-ID
    @Operation(summary = "Desactivar un producto por ID",
               description = "Desactiva un producto específico utilizando su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Producto desactivado exitosamente",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Producto.class))),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    @PatchMapping("/{id}/desactivar")
    public ResponseEntity<Producto> desactivar(@PathVariable Long id) {
        try{
            return ResponseEntity.ok(productoServices.desactivar(id));
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/activar")
    public ResponseEntity<Producto> activar(@PathVariable Long id) {
        try{
            return ResponseEntity.ok(productoServices.activar(id));
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

}
