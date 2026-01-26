package com.pdauf.gestortareas.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

/**
 * Configuracion Web para Produccion
 * Incluye CORS, Interceptores y optimizaciones
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Lee la variable de entorno FRONTEND_URL o usa localhost por defecto
    @Value("${cors.allowed.origins:http://localhost:3000,http://localhost:4200}")
    private String allowedOrigins;

    /**
     * Registra interceptores personalizados
     * El LoggingInterceptor registra cada peticion HTTP
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoggingInterceptor());
    }

    /**
     * Configuracion de CORS para permitir peticiones desde el frontend
     * CORS = Cross-Origin Resource Sharing
     * Permite que tu frontend (en otro dominio) pueda consumir esta API
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(allowedOrigins.split(","))
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600); // Cache preflight por 1 hora
    }

    /**
     * Configuracion de recursos estaticos (opcional)
     * Si sirves frontend desde Spring Boot
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Servir archivos estaticos desde /static
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/")
                .setCachePeriod(3600); // Cache de 1 hora en produccion
    }
}
