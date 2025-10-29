package com.sitio.amasanderia.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sitio.amasanderia.entities.Carrito;
import com.sitio.amasanderia.entities.ItemCarrito;
import com.sitio.amasanderia.entities.Producto;
import com.sitio.amasanderia.entities.Usuario;
import com.sitio.amasanderia.services.CarritoService;
import com.sitio.amasanderia.services.ItemCarritoService;
import com.sitio.amasanderia.services.ProductoService;
import com.sitio.amasanderia.services.UsuarioService;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/carrito")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    @Autowired
    private ItemCarritoService itemService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ProductoService productoService;

    // Obtener carrito activo de un usuario
    @GetMapping("/{rut}")
    public ResponseEntity<?> obtenerCarrito(@PathVariable String rut) {
        Usuario usuario = usuarioService.findById(rut).orElse(null);
        if (usuario == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");

        Carrito carrito = carritoService.obtenerCarritoActivo(usuario);
        List<ItemCarrito> items = itemService.obtenerItemsCarrito(carrito);
        carrito.setItems(items);

        return ResponseEntity.ok(carrito);
    }

    // Agregar producto al carrito
    @PostMapping("/{rut}/agregar")
    public ResponseEntity<?> agregarProducto(@PathVariable String rut, @RequestParam Long productoId, @RequestParam int cantidad) {
        Usuario usuario = usuarioService.findById(rut).orElse(null);
        if (usuario == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");

        Producto producto = productoService.obtenerId(productoId);
        if (producto == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");

        Carrito carrito = carritoService.obtenerCarritoActivo(usuario);
        ItemCarrito item = itemService.agregarProducto(carrito, producto, cantidad);

        return ResponseEntity.ok(item);
    }

    // Eliminar item del carrito
    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<?> eliminarItem(@PathVariable Long itemId) {
        ItemCarrito item = itemService.obtenerItemPorId(itemId);
        if (item == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item no encontrado");
    itemService.eliminarItem(item);
    return ResponseEntity.ok("Item eliminado correctamente");
}


    // Vaciar carrito
    @DeleteMapping("/{rut}/vaciar")
    public ResponseEntity<?> vaciarCarrito(@PathVariable String rut) {
        Usuario usuario = usuarioService.findById(rut).orElse(null);
        if (usuario == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");

        Carrito carrito = carritoService.obtenerCarritoActivo(usuario);
        itemService.vaciarCarrito(carrito);
        return ResponseEntity.ok("Carrito vaciado correctamente");
    }

    // Proceder al pago (disminuye stock y cambia estado del carrito)
    @PostMapping("/{rut}/pagar")
    public ResponseEntity<?> pagarCarrito(@PathVariable String rut) {
        Usuario usuario = usuarioService.findById(rut).orElse(null);
        if (usuario == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");

        Carrito carrito = carritoService.obtenerCarritoActivo(usuario);
        List<ItemCarrito> items = itemService.obtenerItemsCarrito(carrito);

        for (ItemCarrito item : items) {
            Producto producto = item.getProducto();
            if (producto.getStock() < item.getCantidad()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Stock insuficiente para: " + producto.getNombre());
            }
            producto.setStock(producto.getStock() - item.getCantidad());
            productoService.save(producto);
        }

        carritoService.cambiarEstadoCarrito(carrito, "procesado");
        return ResponseEntity.ok("Pago realizado y stock actualizado");
    }
}
