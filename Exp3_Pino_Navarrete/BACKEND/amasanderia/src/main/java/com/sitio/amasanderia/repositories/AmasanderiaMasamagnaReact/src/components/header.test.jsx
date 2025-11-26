// header.test.jsx - VERSIÓN QUE SÍ FUNCIONA
import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Header from './header'
import '@testing-library/jest-dom'

// Mock de los contextos que el header NECESITA
vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({
    getCantidadTotal: () => 0 // Carrito vacío
  })
}))

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    logout: vi.fn()
  })
}))

test('Header muestra elementos básicos', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  )
  
  expect(screen.getByAltText('Main Logo')).toBeInTheDocument()
  expect(screen.getByText('Inicio')).toBeInTheDocument()
  expect(screen.getByText('Productos')).toBeInTheDocument()
  expect(screen.getByText('Contacto')).toBeInTheDocument()
})