// registroFormulario.test.jsx - VERSIÓN SIMPLE
import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import RegistroPage from './registroFormulario'
import '@testing-library/jest-dom'

// Mocks básicos
vi.mock('../data/regionesComunas', () => ({
  default: {
    'Test Region': ['Test Comuna']
  }
}))

global.fetch = vi.fn()

test('formulario de registro se renderiza correctamente', () => {
  render(
    <BrowserRouter>
      <RegistroPage />
    </BrowserRouter>
  )
  
  expect(screen.getByText(/registro/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/rut/i)).toBeInTheDocument()
  expect(screen.getByText(/registrarse/i)).toBeInTheDocument()
})