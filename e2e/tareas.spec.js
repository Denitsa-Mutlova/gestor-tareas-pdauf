import { test, expect } from '@playwright/test'

/**
 * PRUEBAS E2E con Playwright.
 * Simulan el comportamiento real de un usuario en el navegador.
 * Recorren el sistema completo: navegador → frontend → (backend si está activo).
 */

test.describe('Gestor de Tareas - E2E', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('la página carga y muestra el título', async ({ page }) => {
    await expect(page.getByText('Gestor de Tareas')).toBeVisible()
  })

  test('el formulario de añadir tarea es visible', async ({ page }) => {
    await expect(page.getByPlaceholder('Título de la tarea')).toBeVisible()
    await expect(page.getByPlaceholder('Descripción')).toBeVisible()
    await expect(page.getByText('Añadir')).toBeVisible()
  })

  test('no se puede enviar el formulario sin título', async ({ page }) => {
    // Click en Añadir sin rellenar nada
    await page.getByText('Añadir').click()

    // La lista debe seguir vacía (no se añadió nada)
    const items = page.locator('li')
    const count = await items.count()
    expect(count).toBe(0)
  })

  test('se puede escribir en los campos del formulario', async ({ page }) => {
    const inputTitulo = page.getByPlaceholder('Título de la tarea')
    const inputDesc = page.getByPlaceholder('Descripción')

    await inputTitulo.fill('Mi tarea E2E')
    await inputDesc.fill('Descripción de prueba')

    await expect(inputTitulo).toHaveValue('Mi tarea E2E')
    await expect(inputDesc).toHaveValue('Descripción de prueba')
  })
})
