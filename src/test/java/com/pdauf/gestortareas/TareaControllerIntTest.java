package com.pdauf.gestortareas;

import com.pdauf.gestortareas.model.Tarea;
import com.pdauf.gestortareas.repository.TareaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TareaControllerIntTest {

    @Autowired
    private TareaRepository tareaRepository;

    @BeforeEach
    void limpiarBD() {
        tareaRepository.deleteAll();
    }

    @Test
    void crearTarea_seGuardaEnBD() {
        Tarea nueva = new Tarea("Integración", "Test completo", false);
        Tarea guardada = tareaRepository.save(nueva);

        assertNotNull(guardada.getId());
        assertEquals("Integración", guardada.getTitulo());
    }

    @Test
    void listarTareas_retornaTodasLasGuardadas() {
        tareaRepository.save(new Tarea("Tarea 1", "Desc", false));
        tareaRepository.save(new Tarea("Tarea 2", "Desc", true));

        List<Tarea> todas = tareaRepository.findAll();

        assertEquals(2, todas.size());
    }

    @Test
    void eliminarTarea_yaNoExiste() {
        Tarea guardada = tareaRepository.save(new Tarea("A eliminar", "Desc", false));
        Long id = guardada.getId();

        tareaRepository.deleteById(id);

        assertFalse(tareaRepository.findById(id).isPresent());
    }

    @Test
    void actualizarTarea_cambiosSeReflejan() {
        Tarea guardada = tareaRepository.save(new Tarea("Original", "Desc", false));
        guardada.setTitulo("Actualizada");
        guardada.setCompletada(true);

        Tarea actualizada = tareaRepository.save(guardada);

        assertEquals("Actualizada", actualizada.getTitulo());
        assertTrue(actualizada.isCompletada());
    }
}
