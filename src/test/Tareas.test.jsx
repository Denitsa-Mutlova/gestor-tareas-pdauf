import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tareas from '../components/Tareas'

vi.mock('../services/tareasApi', () => ({
  obtenerTareas: vi.fn(),
  crearTarea: vi.fn(),
  borrarTarea: vi.fn(),
}))

import { obtenerTareas, crearTarea } from '../services/tareasApi'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('Componente Tareas', () => {
  it('muestra el título de la aplicación', async () => {
    obtenerTareas.mockResolvedValue([])
    render(<Tareas />)
    expect(screen.getByText(/Gestor de Tareas/i)).toBeInTheDocument()
  })

  it('carga y muestra las tareas al iniciar', async () => {
    obtenerTareas.mockResolvedValue([
      { id: 1, titulo: 'Tarea de prueba', descripcion: 'Desc', completada: false },
    ])
    render(<Tareas />)
    await waitFor(() => {
      expect(screen.getByText('Tarea de prueba')).toBeInTheDocument()
    })
  })

  it('muestra mensaje cuando no hay tareas', async () => {
    obtenerTareas.mockResolvedValue([])
    render(<Tareas />)
    await waitFor(() => {
      expect(screen.getByText(/No hay tareas/i)).toBeInTheDocument()
    })
  })

  it('permite añadir una nueva tarea', async () => {
    obtenerTareas.mockResolvedValue([])
    crearTarea.mockResolvedValue({ id: 2, titulo: 'Nueva', descripcion: '', completada: false })
    const user = userEvent.setup()

    render(<Tareas />)

    const inputTitulo = screen.getByPlaceholderText('Título de la tarea')
    await user.type(inputTitulo, 'Nueva')

    const boton = screen.getByRole('button', { name: /Añadir/i })
    await user.click(boton)

    await waitFor(() => {
      expect(crearTarea).toHaveBeenCalledWith(
        expect.objectContaining({ titulo: 'Nueva' })
      )
    })
  })

  it('el formulario tiene campo de título y descripción', async () => {
    obtenerTareas.mockResolvedValue([])
    render(<Tareas />)
    expect(screen.getByPlaceholderText('Título de la tarea')).toBeInTheDocument()
  })
})
