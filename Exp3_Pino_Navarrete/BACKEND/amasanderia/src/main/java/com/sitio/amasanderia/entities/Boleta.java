package com.sitio.amasanderia.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "boletas")
public class Boleta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String emailUsuario;

    @Column(nullable = false)
    private String direccionUsuario;

    @Column(nullable = false)
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    @OneToMany(mappedBy = "boleta", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("boleta-detalles") 
    private List<DetalleBoleta> detalles = new ArrayList<>();

    @Column(nullable = false)
    private double subtotal;

    @Column(nullable = false)
    private double iva;

    @Column(nullable = false)
    private double montoFinal;

    // Método para calcular totales
    public void calcularTotales() {
        this.subtotal = detalles.stream()
                .mapToDouble(DetalleBoleta::getSubtotal)
                .sum();
        this.iva = this.subtotal * 0.19; // 19% de IVA
        this.montoFinal = this.subtotal + this.iva;
    }
}