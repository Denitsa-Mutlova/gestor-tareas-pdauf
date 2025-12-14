package com.pdauf.gestortareas.rest;

import com.pdauf.gestortareas.model.Tarea;
import com.pdauf.gestortareas.repository.TareaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
public class TareaController {

    private final TareaRepository tareaRepository;

    public TareaController(TareaRepository tareaRepository) {
        this.tareaRepository = tareaRepository;
    }

    // CREATE
    @PostMapping
    public Tarea crearTarea(@RequestBody Tarea tarea) {
        return tareaRepository.save(tarea);
    }

    // READ (listar todas)
    @GetMapping
    public List<Tarea> listarTareas() {
        return tareaRepository.findAll();
    }

    // UPDATE
    @PutMapping("/{id}")
    public Tarea actualizarTarea(@PathVariable Long id, @RequestBody Tarea tareaActualizada) {
        Tarea tarea = tareaRepository.findById(id).orElseThrow();
        tarea.setTitulo(tareaActualizada.getTitulo());
        tarea.setDescripcion(tareaActualizada.getDescripcion());
        tarea.setCompletada(tareaActualizada.isCompletada());
        return tareaRepository.save(tarea);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void eliminarTarea(@PathVariable Long id) {
        tareaRepository.deleteById(id);
    }
}

