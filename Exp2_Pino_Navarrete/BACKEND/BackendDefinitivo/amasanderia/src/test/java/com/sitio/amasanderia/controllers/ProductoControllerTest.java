package com.sitio.amasanderia.controllers;

import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sitio.amasanderia.entities.Producto;
import com.sitio.amasanderia.services.ProductoService;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductoControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ProductoService productoService;

    private List<Producto> productosLista;

    //TEST 1: Ver todos los productos
    @Test
    public void verProductosTest() throws Exception {
        Producto producto1 = new Producto();
        producto1.setId(1L);
        producto1.setNombre("Torta Chocolate");
        producto1.setPrecio(25000);
        producto1.setStock(10);

        Producto producto2 = new Producto();
        producto2.setId(2L);
        producto2.setNombre("Torta de Bizcocho y Crema");
        producto2.setPrecio(12000);
        producto2.setStock(20);

        productosLista = Arrays.asList(producto1, producto2);

        when(productoService.listarTodas()).thenReturn(productosLista);

        mockMvc.perform(get("/api/productos")
                .contentType(MediaType.APPLICATION_JSON))
               .andExpect(status().isOk())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON))
               .andExpect(jsonPath("$.length()").value(productosLista.size()))
               .andExpect(jsonPath("$[0].nombre").value("Torta Chocolate"))
               .andExpect(jsonPath("$[1].nombre").value("Torta de Bizcocho y Crema"));
    }

    // TEST 2: Ver un producto por ID
    @Test
    public void verUnProductoTest() throws Exception {
        Producto unProducto = new Producto();
        unProducto.setId(1L);
        unProducto.setNombre("Torta Chocolate");
        unProducto.setPrecio(25000);
        unProducto.setStock(10);

        try {
            when(productoService.obtenerId(1L)).thenReturn(unProducto);

            mockMvc.perform(get("/api/productos/1")
                   .contentType(MediaType.APPLICATION_JSON))
                   .andExpect(status().isOk())
                   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                   .andExpect(jsonPath("$.id").value(1))
                   .andExpect(jsonPath("$.nombre").value("Torta Chocolate"));

        } catch (Exception ex) {
            fail("Error al ejecutar la prueba: " + ex.getMessage());
        }
    }

    // TEST 3: Producto no existe
    @Test
    public void productoNoExisteTest() throws Exception {
        when(productoService.obtenerId(20L))
            .thenThrow(new RuntimeException("Producto no encontrado"));
        
            mockMvc.perform(get("/api/productos/20")
                    .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isNotFound());
    }

    // TEST 4: Crear nuevo producto
    @Test
    public void crearProductoTest() throws Exception {
        Producto productoNuevo = new Producto();
        productoNuevo.setNombre("Nueva Torta");
        productoNuevo.setDescripcion("Torta de vainilla");
        productoNuevo.setPrecio(12000);
        productoNuevo.setStock(8);
        productoNuevo.setCategoria("torta");

        Producto productoCreado = new Producto();
        productoCreado.setId(4L);
        productoCreado.setNombre("Nueva Torta");
        productoCreado.setPrecio(12000);
        productoCreado.setStock(8);
        productoCreado.setCategoria("torta");

        when(productoService.crear(any(Producto.class))).thenReturn(productoCreado);

        mockMvc.perform(post("/api/productos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(productoNuevo)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(4))
                .andExpect(jsonPath("$.nombre").value("Nueva Torta"));
    }

    // TEST 5: Modificar producto existente
    @Test
    public void modificarProductoTest() throws Exception {

        Producto productoModificado = new Producto();
        productoModificado.setNombre("Torta Actualizada");
        productoModificado.setDescripcion("Descripción actualizada");
        productoModificado.setPrecio(16000);
        productoModificado.setStock(12);
        productoModificado.setCategoria("torta");

        Producto productoRespuesta = new Producto();
        productoRespuesta.setId(5L);
        productoRespuesta.setNombre("Torta Actualizada");
        productoRespuesta.setPrecio(16000);
        productoRespuesta.setStock(12);

        when(productoService.actualizar(any(Long.class), any(Producto.class)))
            .thenReturn(productoRespuesta);

        mockMvc.perform(put("/api/productos/5")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(productoModificado)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(5))
                .andExpect(jsonPath("$.nombre").value("Torta Actualizada"));
    }

    // TEST 6: Eliminar producto existente
    @Test
    public void eliminarProductoTest() throws Exception {
        doNothing().when(productoService).eliminar(5L);

        mockMvc.perform(delete("/api/productos/5")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }
}
