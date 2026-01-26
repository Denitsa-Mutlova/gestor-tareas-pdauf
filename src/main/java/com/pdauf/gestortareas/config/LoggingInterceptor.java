package com.pdauf.gestortareas.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Interceptor para registrar todas las peticiones HTTP
 * 
 * Se ejecuta ANTES de que llegue al controlador
 * Util para debugging y auditoria
 */
public class LoggingInterceptor implements HandlerInterceptor {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    /**
     * Se ejecuta antes de procesar la peticion
     * 
     * @return true para continuar con la peticion, false para detenerla
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String timestamp = LocalDateTime.now().format(formatter);
        String method = request.getMethod();
        String uri = request.getRequestURI();
        String clientIp = request.getRemoteAddr();
        
        System.out.println(String.format("[%s] %s %s - IP: %s", 
            timestamp, method, uri, clientIp));
        
        return true; // Continuar con la peticion
    }

    /**
     * Se ejecuta despues de procesar la peticion (opcional)
     * Aqui podrias registrar el tiempo de respuesta, etc.
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, 
                                Object handler, Exception ex) {
        if (ex != null) {
            System.err.println("Error en la peticion: " + ex.getMessage());
        }
    }
}
