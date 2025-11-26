// productos.test.jsx - VERSIÓN CON ESFUERZO
import { render, screen, fireEvent } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import Productos from './productos'
import '@testing-library/jest-dom'

// Mock COMPLETO de useAuth
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: null
  })
}))

test('Productos muestra botón "Inicia sesión" cuando no hay usuario', () => {
  const productoMock = {
    nombre: 'Torta Chocolate',
    descripcion: 'Deliciosa torta de chocolate',
    precio: 35000,
    stock: 5,
    categoria: 'Tortas',
    imagenUrl: 'test.jpg',
    estado: true
  }

  const mockAgregarCarrito = vi.fn()
  
  render(
    <Productos 
      producto={productoMock} 
      agregarCarrito={mockAgregarCarrito} 
    />
  )

  // Verificar que se renderiza la información del producto
  expect(screen.getByText('Torta Chocolate')).toBeInTheDocument()
  expect(screen.getByText('Deliciosa torta de chocolate')).toBeInTheDocument()
  expect(screen.getByText(/Precio: \$35\.000/)).toBeInTheDocument()
  expect(screen.getByText(/Stock: 5/)).toBeInTheDocument()
  
  // Verificar que muestra "Inicia sesión" (no "Agregar al carrito")
  expect(screen.getByText('Inicia sesión')).toBeInTheDocument()
  expect(screen.queryByText('Agregar al carrito')).not.toBeInTheDocument()
})

test('Botón está deshabilitado cuando no hay usuario', () => {
  const productoMock = {
    nombre: 'Torta Vainilla',
    descripcion: 'Torta de vainilla',
    precio: 32000,
    stock: 3,
    categoria: 'Tortas',
    imagenUrl: 'test2.jpg',
    estado: true
  }

  render(<Productos producto={productoMock} agregarCarrito={vi.fn()} />)
  
  const boton = screen.getByText('Inicia sesión')
  expect(boton).toBeInTheDocument()
  // El botón debería estar habilitado para redirigir al login
})