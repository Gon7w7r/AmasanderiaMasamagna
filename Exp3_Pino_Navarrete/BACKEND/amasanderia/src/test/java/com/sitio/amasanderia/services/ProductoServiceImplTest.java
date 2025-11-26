package com.sitio.amasanderia.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.sitio.amasanderia.entities.Producto;
import com.sitio.amasanderia.repositories.ProductoRepository;

public class ProductoServiceImplTest {

    @InjectMocks
    private ProductoServiceImpl service;

    @Mock
    private ProductoRepository repository;

    List<Producto> list = new ArrayList<>();

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
        cargarProductos();
    }

    //TEST 1: Buscar todos los productos
    @Test
    public void buscarTodosTest() {
        when(repository.findAll()).thenReturn(list);

        List<Producto> response = service.listarTodas();

        assertEquals(3, response.size());
        verify(repository, times(1)).findAll();
    }

    //TEST 2: Buscar producto por ID
    @Test
    public void buscarPorIdTest() {
        Producto producto = new Producto(2L, "Pie de Limón", "Pie casero de limón", 15000, 6, "pie", "pie_limon.jpg", true, LocalDateTime.now());
        when(repository.findById(2L)).thenReturn(Optional.of(producto));

        Producto response = service.obtenerId(2L);

        assertNotNull(response);
        assertEquals("Pie de Limón", response.getNombre());
        verify(repository, times(1)).findById(2L);
    }

    //TEST 3: Buscar producto por ID no existente
    @Test
    public void buscarPorIdNoExistenteTest() {
        when(repository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            service.obtenerId(999L);
        });

        assertEquals("Producto no encontrado", exception.getMessage());
        verify(repository, times(1)).findById(999L);
    }

    //TEST 4: Crear nuevo producto
    @Test
    public void crearProductoTest() {
        Producto productoSinId = new Producto(null, "Nueva Torta", "Torta especial", 12000, 10, "torta", "nueva.jpg", null, null);
        Producto productoConId = new Producto(10L, "Nueva Torta", "Torta especial", 12000, 10, "torta", "nueva.jpg", true, LocalDateTime.now());

        when(repository.save(productoSinId)).thenReturn(productoConId);

        Producto response = service.crear(productoSinId);

        assertNotNull(response);
        assertEquals(10L, response.getId());
        assertEquals("Nueva Torta", response.getNombre());
        assertTrue(response.getEstado()); // Estado automático por stock > 0
        verify(repository, times(1)).save(productoSinId);
    }

    //TEST 5: Crear producto con stock 0
    @Test
    public void crearProductoStockCeroTest() {
        Producto productoSinId = new Producto(null, "Torta Agotada", "Sin stock", 10000, 0, "torta", "agotada.jpg", null, null);
        Producto productoConId = new Producto(11L, "Torta Agotada", "Sin stock", 10000, 0, "torta", "agotada.jpg", false, LocalDateTime.now());

        when(repository.save(productoSinId)).thenReturn(productoConId);

        Producto response = service.crear(productoSinId);

        assertNotNull(response);
        assertFalse(response.getEstado()); // Estado automático por stock = 0
        verify(repository, times(1)).save(productoSinId);
    }

    //TEST 6: Modificar producto existente
    @Test
    public void modificarProductoTest() {
        Producto productoOriginal = new Producto(3L, "Queque Simple", "Queque básico", 5000, 8, "masa", "queque.jpg", true, LocalDateTime.now());
        Producto productoModificado = new Producto(3L, "Queque Especial", "Queque con mejoras", 6000, 12, "masa_especial", "queque_especial.jpg", true, LocalDateTime.now());

        when(repository.findById(3L)).thenReturn(Optional.of(productoOriginal));
        when(repository.save(any(Producto.class))).thenReturn(productoModificado);

        // Crear producto con datos actualizados
        Producto productoActualizado = new Producto();
        productoActualizado.setNombre("Queque Especial");
        productoActualizado.setDescripcion("Queque con mejoras");
        productoActualizado.setPrecio(6000);
        productoActualizado.setStock(12);
        productoActualizado.setCategoria("masa_especial");
        productoActualizado.setImagenUrl("queque_especial.jpg");

        Producto updatedProduct = service.actualizar(3L, productoActualizado);

        assertNotNull(updatedProduct);
        assertEquals("Queque Especial", updatedProduct.getNombre());
        assertEquals("Queque con mejoras", updatedProduct.getDescripcion());
        assertEquals(6000, updatedProduct.getPrecio());

        verify(repository, times(1)).findById(3L);
        verify(repository, times(1)).save(any(Producto.class));
    }

    //TEST 7: Eliminar producto existente
    @Test
    public void eliminarProductoTest() {
        when(repository.existsById(4L)).thenReturn(true);
        doNothing().when(repository).deleteById(4L);

        service.eliminar(4L);

        verify(repository, times(1)).existsById(4L);
        verify(repository, times(1)).deleteById(4L);
    }

    //TEST 8: Eliminar producto no existente
    @Test
    public void eliminarProducto_NoExistenteTest() {
        when(repository.existsById(999L)).thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            service.eliminar(999L);
        });

        assertEquals("Producto no encontrado", exception.getMessage());
        verify(repository, times(1)).existsById(999L);
        verify(repository, never()).deleteById(999L);
    }

    //TEST 9: Desactivar producto
    @Test
    public void desactivarProductoTest() {
        Producto producto = new Producto(5L, "Torta Activa", "Torta para desactivar", 8000, 5, "torta", "activa.jpg", true, LocalDateTime.now());
        Producto productoDesactivado = new Producto(5L, "Torta Activa", "Torta para desactivar", 8000, 5, "torta", "activa.jpg", false, LocalDateTime.now());

        when(repository.findById(5L)).thenReturn(Optional.of(producto));
        when(repository.save(any(Producto.class))).thenReturn(productoDesactivado);

        Producto response = service.desactivar(5L);

        assertNotNull(response);
        assertFalse(response.getEstado());
        verify(repository, times(1)).findById(5L);
        verify(repository, times(1)).save(any(Producto.class));
    }

    //TEST 10: Buscar producto por ID - caso alternativo
    @Test
    public void findByIdTest() {
        Producto producto = new Producto(6L, "Producto Test", "Descripción test", 7000, 3, "test", "test.jpg", true, LocalDateTime.now());
        when(repository.findById(6L)).thenReturn(Optional.of(producto));

        Optional<Producto> response = service.findById(6L);

        assertTrue(response.isPresent());
        assertEquals("Producto Test", response.get().getNombre());
        verify(repository, times(1)).findById(6L);
    }

    //TEST 11: Guardar producto
    @Test
    public void saveTest() {
        Producto productoSinId = new Producto(null, "Producto Save", "Test save", 9000, 7, "save", "save.jpg", null, null);
        Producto productoConId = new Producto(7L, "Producto Save", "Test save", 9000, 7, "save", "save.jpg", true, LocalDateTime.now());

        when(repository.save(productoSinId)).thenReturn(productoConId);

        Producto response = service.save(productoSinId);

        assertNotNull(response);
        assertEquals(7L, response.getId());
        assertTrue(response.getEstado()); // Estado automático por stock > 0
        verify(repository, times(1)).save(productoSinId);
    }

    public void cargarProductos() {
        list.add(new Producto(1L, "Torta Chocolate", "Chocolate y manjar", 25000, 10, "torta", "/public/images/torta.jpg", true, LocalDateTime.now()));
        list.add(new Producto(2L, "Pie de Limón", "Limón y leche condensada", 15000, 6, "pie", "/public/images/torta.jpg", true, LocalDateTime.now()));
        list.add(new Producto(3L, "Torta de Bizcocho y Crema", "Bizcocho de FrutillaTibaleno", 12000, 20, "torta", "/public/images/torta.jpg", true, LocalDateTime.now()));
    }
}