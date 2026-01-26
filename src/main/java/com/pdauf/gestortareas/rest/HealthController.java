package com.pdauf.gestortareas.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Controlador de Health Check
 * Permite verificar que la aplicacion este funcionando correctamente
 * Railway y otras plataformas usan este endpoint para monitoreo
 */
@RestController
@RequestMapping("/health")
public class HealthController {

    @Autowired
    private DataSource dataSource;

    /**
     * Endpoint basico de salud
     * GET /health
     * 
     * Responde con estado UP y informacion basica
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", LocalDateTime.now());
        health.put("service", "Gestor de Tareas API");
        health.put("version", "1.0.0");
        
        return ResponseEntity.ok(health);
    }

    /**
     * Endpoint de salud detallado con verificacion de BD
     * GET /health/detailed
     * 
     * Verifica tambien la conexion a la base de datos
     */
    @GetMapping("/detailed")
    public ResponseEntity<Map<String, Object>> detailedHealth() {
        Map<String, Object> health = new HashMap<>();
        health.put("timestamp", LocalDateTime.now());
        health.put("service", "Gestor de Tareas API");
        health.put("version", "1.0.0");
        
        // Verificar conexion a base de datos
        boolean dbHealthy = checkDatabaseConnection();
        health.put("database", dbHealthy ? "UP" : "DOWN");
        
        // Estado general
        String overallStatus = dbHealthy ? "UP" : "DEGRADED";
        health.put("status", overallStatus);
        
        // Informacion del sistema
        Map<String, Object> system = new HashMap<>();
        system.put("java.version", System.getProperty("java.version"));
        system.put("os.name", System.getProperty("os.name"));
        system.put("processors", Runtime.getRuntime().availableProcessors());
        health.put("system", system);
        
        return ResponseEntity.ok(health);
    }

    /**
     * Verifica la conexion a la base de datos
     * @return true si la conexion es valida, false en caso contrario
     */
    private boolean checkDatabaseConnection() {
        try (Connection connection = dataSource.getConnection()) {
            return connection.isValid(2); // timeout de 2 segundos
        } catch (Exception e) {
            System.err.println("Error al verificar conexion a BD: " + e.getMessage());
            return false;
        }
    }
}
