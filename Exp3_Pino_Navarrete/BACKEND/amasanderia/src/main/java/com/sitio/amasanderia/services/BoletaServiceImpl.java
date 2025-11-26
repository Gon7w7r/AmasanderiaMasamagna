package com.sitio.amasanderia.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sitio.amasanderia.entities.Boleta;
import com.sitio.amasanderia.entities.Carrito;
import com.sitio.amasanderia.entities.DetalleBoleta;
import com.sitio.amasanderia.entities.ItemCarrito;
import com.sitio.amasanderia.entities.Usuario;
import com.sitio.amasanderia.repositories.BoletaRepository;

@Service
public class BoletaServiceImpl implements BoletaService {

    @Autowired
    private BoletaRepository boletaRepository;

    @Autowired
    private ItemCarritoService itemCarritoService;

    @Override
    @Transactional
    public Boleta crearBoletaDesdeCarrito(Carrito carrito, Usuario usuario) {
        // Crear nueva boleta
        Boleta boleta = new Boleta();
        boleta.setEmailUsuario(usuario.getEmail());
        boleta.setDireccionUsuario(usuario.getDireccion());

        // Obtener items del carrito
        List<ItemCarrito> itemsCarrito = itemCarritoService.obtenerItemsCarrito(carrito);

        // Convertir items del carrito a detalles de boleta
        for (ItemCarrito itemCarrito : itemsCarrito) {
            DetalleBoleta detalle = new DetalleBoleta();
            detalle.setBoleta(boleta);
            detalle.setProducto(itemCarrito.getProducto());
            detalle.setCantidad(itemCarrito.getCantidad());
            detalle.setPrecioUnitario(itemCarrito.getPrecioUnitario());
            boleta.getDetalles().add(detalle);
        }

        // Calcular totales
        boleta.calcularTotales();

        // Guardar boleta
        return boletaRepository.save(boleta);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Boleta> obtenerTodasBoletas() {
        return boletaRepository.findAllByOrderByFechaCreacionDesc();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Boleta> obtenerBoletasPorUsuario(String emailUsuario) {
        return boletaRepository.findByEmailUsuario(emailUsuario);
    }

    @Override
    @Transactional(readOnly = true)
    public Boleta obtenerBoletaPorId(Long id) {
        return boletaRepository.findById(id).orElse(null);
    }
}