package com.pdauf.gestortareas;

import com.pdauf.gestortareas.model.Tarea;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas UNITARIAS del modelo Tarea.
 * No necesitan Spring – prueban solo la lógica del objeto.
 */
class TareaModelTest {

    @Test
    void crearTareaConConstructorCompleto() {
        Tarea tarea = new Tarea("Estudiar", "Repasar testing", false);

        assertEquals("Estudiar", tarea.getTitulo());
        assertEquals("Repasar testing", tarea.getDescripcion());
        assertFalse(tarea.isCompletada());
    }

    @Test
    void crearTareaCompletada() {
        Tarea tarea = new Tarea("Tarea hecha", "Ya terminé", true);

        assertTrue(tarea.isCompletada());
    }

    @Test
    void modificarTituloConSetter() {
        Tarea tarea = new Tarea("Título viejo", "Descripción", false);
        tarea.setTitulo("Título nuevo");

        assertEquals("Título nuevo", tarea.getTitulo());
    }

    @Test
    void modificarCompletadaConSetter() {
        Tarea tarea = new Tarea("Tarea", "Desc", false);
        assertFalse(tarea.isCompletada());

        tarea.setCompletada(true);
        assertTrue(tarea.isCompletada());
    }

    @Test
    void tareaConTituloVacio() {
        // Caso negativo: título vacío es técnicamente válido en el modelo
        Tarea tarea = new Tarea("", "", false);
        assertEquals("", tarea.getTitulo());
    }

    @Test
    void constructorVacioFunciona() {
        // JPA necesita constructor vacío – no debe lanzar excepción
        Tarea tarea = new Tarea();
        assertNotNull(tarea);
        assertNull(tarea.getId());
    }

    @Test
    void setIdFunciona() {
        Tarea tarea = new Tarea();
        tarea.setId(99L);
        assertEquals(99L, tarea.getId());
    }
}

