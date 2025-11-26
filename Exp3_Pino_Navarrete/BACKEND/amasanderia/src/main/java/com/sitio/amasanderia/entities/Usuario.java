package com.sitio.amasanderia.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    private String rut;

    private String nombre;
    private String apellido;
    private LocalDate fechaNacimiento;

    private String email;

    private String region;
    private String comuna;
    private String direccion;

    private String contrasena;
    private String rol;

    private Boolean estado;
    private LocalDateTime fechaCreacion;
}
