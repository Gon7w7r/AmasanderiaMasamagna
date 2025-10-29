package com.sitio.amasanderia.entities;

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
    //ATRIBUTOS
    @Id
    private String rut;
    private String nombre;
    private String email;
    private String contrasena;
    private String rol;
    private String estado;
    private LocalDateTime fechaCreacion;
}
