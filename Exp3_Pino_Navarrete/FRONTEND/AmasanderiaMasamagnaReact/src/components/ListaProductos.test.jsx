// ListaProductos.test.jsx - VERSIÓN MEGA SEGURA
import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import ListaProductos from './ListaProductos'
import '@testing-library/jest-dom'

// Mock de TODO
vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({ agregarCarrito: vi.fn() })
}))

vi.mock('./Productos', () => ({ default: () => <div>Producto</div> }))
vi.mock('./buscadorProductos', () => ({ default: () => <div>Buscador</div> }))

// Mock de fetch exitoso
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]) // Array vacío
  })
)

test('ListaProductos se renderiza sin explotar', () => {
  render(<ListaProductos />)
  
  // Solo verificar que no hay errores de renderizado
  expect(screen.getByText(/cargando productos/i)).toBeInTheDocument()
})