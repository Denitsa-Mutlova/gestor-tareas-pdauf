package com.pdauf.gestortareas.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControladorRestSimple {

    // Endpoint "/" que devuelve "Hola Denitsa"

    @GetMapping("/")
    public String saludar() {
        return "Hola Denitsa!";
    }
}
