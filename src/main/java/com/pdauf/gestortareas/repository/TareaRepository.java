package com.pdauf.gestortareas.repository;

import com.pdauf.gestortareas.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
}