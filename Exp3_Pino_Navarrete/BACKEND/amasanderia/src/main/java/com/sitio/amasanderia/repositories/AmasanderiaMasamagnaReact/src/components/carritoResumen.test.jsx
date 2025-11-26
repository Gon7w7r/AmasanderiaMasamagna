// carritoResumen.test.jsx - VERSIÓN SIMPLE
import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import CarritoResumen from './carritoResumen'
import '@testing-library/jest-dom'

// Mocks básicos
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn()
  }
})

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: null })
}))

vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({ 
    carrito: [],
    modificarCantidad: vi.fn(),
    eliminarItem: vi.fn(),
    procesarPago: vi.fn(),
    vaciarCarrito: vi.fn()
  })
}))

test('carrito resumen se renderiza sin usuario', () => {
  render(
    <BrowserRouter>
      <CarritoResumen />
    </BrowserRouter>
  )
  
  expect(screen.getByText(/resumen de tu pedido/i)).toBeInTheDocument()
  expect(screen.getByText(/debes iniciar sesión/i)).toBeInTheDocument()
})