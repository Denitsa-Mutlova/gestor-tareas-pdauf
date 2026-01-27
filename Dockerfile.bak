# ===================================================
# Dockerfile para Gestor de Tareas - Spring Boot 4.0.0
# ===================================================
# Construccion multi-etapa para optimizar tamano de imagen

# ETAPA 1: CONSTRUCCION
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copiar archivos de configuracion de Maven primero (para aprovechar cache)
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Descargar dependencias (se cachea si pom.xml no cambia)
RUN mvn dependency:go-offline -B

# Copiar codigo fuente
COPY src ./src

# Compilar la aplicacion (sin tests para acelerar)
RUN mvn clean package -DskipTests

# ETAPA 2: EJECUCION
FROM eclipse-temurin:21-jre-alpine

# Informacion de la imagen
LABEL maintainer="tu-email@ejemplo.com"
LABEL description="Gestor de Tareas API - Spring Boot"
LABEL version="1.0.0"

# Crear usuario no-root por seguridad
RUN addgroup -S spring && adduser -S spring -G spring

# Establecer directorio de trabajo
WORKDIR /app

# Copiar el JAR compilado desde la etapa de build
COPY --from=build /app/target/*.jar app.jar

# Cambiar a usuario no-root
USER spring:spring

# Exponer puerto
EXPOSE 8080

# Variables de entorno por defecto
ENV SPRING_PROFILES_ACTIVE=prod
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Health check (Railway lo usara para verificar que la app esta funcionando)
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Comando para ejecutar la aplicacion
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
