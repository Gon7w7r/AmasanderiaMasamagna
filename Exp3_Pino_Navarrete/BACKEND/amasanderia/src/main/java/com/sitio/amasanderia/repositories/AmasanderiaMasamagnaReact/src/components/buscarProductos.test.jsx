// buscadorProductos.test.jsx - VERSIÓN SIMPLE
import { render, screen, fireEvent } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import BuscadorProductos from './buscadorProductos'
import '@testing-library/jest-dom'

test('buscador funciona correctamente', () => {
  const mockSetBusqueda = vi.fn()
  
  render(<BuscadorProductos busqueda="" setBusqueda={mockSetBusqueda} />)
  
  // Verificar que se renderiza
  const input = screen.getByPlaceholderText(/buscar productos/i)
  expect(input).toBeInTheDocument()
  
  // Verificar que se puede escribir
  fireEvent.change(input, { target: { value: 'pastel' } })
  expect(mockSetBusqueda).toHaveBeenCalledWith('pastel')
})