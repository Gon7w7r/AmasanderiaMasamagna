package com.sitio.amasanderia.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "carritos")
public class Carrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_rut")
    private Usuario usuario;

    @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemCarrito> items = new ArrayList<>();

    private String estado; // ejemplo: "activo", "procesado", "cancelado"

    private LocalDateTime fechaCreacion = LocalDateTime.now();

    private LocalDateTime fechaActualizacion = LocalDateTime.now();
    
    // Método auxiliar para agregar un item al carrito
    public void agregarItem(ItemCarrito item) {
        items.add(item);
        item.setCarrito(this);
    }

    // Método auxiliar para eliminar un item del carrito
    public void eliminarItem(ItemCarrito item) {
        items.remove(item);
        item.setCarrito(null);
    }
}
