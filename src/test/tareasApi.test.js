import { describe, it, expect, vi, beforeEach } from 'vitest'
import { obtenerTareas, crearTarea, borrarTarea } from '../services/tareasApi'

/**
 * PRUEBAS UNITARIAS del servicio de API.
 * Se hace MOCKING de fetch: simulamos respuestas sin hacer peticiones reales.
 * Esto permite probar cómo reacciona el código ante éxito, errores, etc.
 */

beforeEach(() => {
  // Resetear mocks antes de cada test
  vi.stubGlobal('fetch', vi.fn())
  vi.stubGlobal('localStorage', {
    getItem: vi.fn().mockReturnValue('token-falso-para-tests'),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  })
})

// ── obtenerTareas ────────────────────────────────────────────

describe('obtenerTareas', () => {
  it('llama a la URL correcta y retorna la lista de tareas', async () => {
    const tareasMock = [
      { id: 1, titulo: 'Tarea 1', descripcion: 'Desc', completada: false },
      { id: 2, titulo: 'Tarea 2', descripcion: 'Desc 2', completada: true },
    ]
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(tareasMock),
    })

    const resultado = await obtenerTareas()

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/tareas',
      expect.objectContaining({ headers: expect.any(Object) })
    )
    expect(resultado).toHaveLength(2)
    expect(resultado[0].titulo).toBe('Tarea 1')
  })

  it('retorna lista vacía si el servidor devuelve []', async () => {
    fetch.mockResolvedValueOnce({ json: () => Promise.resolve([]) })

    const resultado = await obtenerTareas()

    expect(resultado).toEqual([])
  })

  it('simula error de red (timeout / fallo de conexión)', async () => {
    // Caso negativo: simular que fetch falla (sin conexión, timeout, etc.)
    fetch.mockRejectedValueOnce(new Error('Network Error'))

    await expect(obtenerTareas()).rejects.toThrow('Network Error')
  })
})

// ── crearTarea ───────────────────────────────────────────────

describe('crearTarea', () => {
  it('envía POST con los datos correctos y retorna la tarea creada', async () => {
    const nuevaTarea = { titulo: 'Estudiar', descripcion: 'Mucho', completada: false }
    const tareaCreada = { id: 1, ...nuevaTarea }

    fetch.mockResolvedValueOnce({ json: () => Promise.resolve(tareaCreada) })

    const resultado = await crearTarea(nuevaTarea)

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/tareas',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(nuevaTarea),
      })
    )
    expect(resultado.id).toBe(1)
    expect(resultado.titulo).toBe('Estudiar')
  })

  it('simula error 500 del servidor', async () => {
    // Caso negativo: el servidor falla internamente
    fetch.mockRejectedValueOnce(new Error('Internal Server Error'))

    await expect(crearTarea({ titulo: 'X' })).rejects.toThrow('Internal Server Error')
  })

  it('simula respuesta vacía del servidor', async () => {
    // Caso negativo: respuesta sin cuerpo válido
    fetch.mockResolvedValueOnce({ json: () => Promise.resolve(null) })

    const resultado = await crearTarea({ titulo: 'Test' })

    expect(resultado).toBeNull()
  })
})

// ── borrarTarea ──────────────────────────────────────────────

describe('borrarTarea', () => {
  it('envía DELETE a la URL correcta con el id', async () => {
    fetch.mockResolvedValueOnce({})

    await borrarTarea(5)

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/tareas/5',
      expect.objectContaining({ method: 'DELETE' })
    )
  })

  it('no lanza excepción si la respuesta es correcta', async () => {
    fetch.mockResolvedValueOnce({})

    await expect(borrarTarea(1)).resolves.not.toThrow()
  })
})
