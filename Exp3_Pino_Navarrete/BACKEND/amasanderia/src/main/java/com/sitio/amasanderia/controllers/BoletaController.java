package com.sitio.amasanderia.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sitio.amasanderia.entities.Boleta;
import com.sitio.amasanderia.services.BoletaService;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/boletas")
public class BoletaController {

    @Autowired
    private BoletaService boletaService;

    @GetMapping
    public ResponseEntity<List<Boleta>> obtenerTodasBoletas() {
        List<Boleta> boletas = boletaService.obtenerTodasBoletas();
        return ResponseEntity.ok(boletas);
    }

    @GetMapping("/usuario/{email}")
    public ResponseEntity<List<Boleta>> obtenerBoletasPorUsuario(@PathVariable String email) {
        List<Boleta> boletas = boletaService.obtenerBoletasPorUsuario(email);
        return ResponseEntity.ok(boletas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerBoletaPorId(@PathVariable Long id) {
        Boleta boleta = boletaService.obtenerBoletaPorId(id);
        if (boleta != null) {
            return ResponseEntity.ok(boleta);
        }
        return ResponseEntity.notFound().build();
    }
}