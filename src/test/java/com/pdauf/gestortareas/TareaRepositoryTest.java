package com.pdauf.gestortareas;

import com.pdauf.gestortareas.model.Tarea;
import com.pdauf.gestortareas.repository.TareaRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TareaRepositoryTest {

    @Autowired
    private TareaRepository tareaRepository;

    @Test
    void guardarTarea_seGuardaEnBD() {
        Tarea tarea = new Tarea("Test guardado", "Descripción", false);
        Tarea guardada = tareaRepository.save(tarea);
        assertNotNull(guardada.getId());
        assertEquals("Test guardado", guardada.getTitulo());
    }

    @Test
    void buscarPorId_noExiste_retornaVacio() {
        Optional<Tarea> resultado = tareaRepository.findById(9999L);
        assertFalse(resultado.isPresent());
    }

    @Test
    void eliminarTarea_yaNoExisteEnBD() {
        Tarea guardada = tareaRepository.save(new Tarea("A eliminar", "Desc", false));
        Long id = guardada.getId();
        tareaRepository.deleteById(id);
        assertFalse(tareaRepository.findById(id).isPresent());
    }
}