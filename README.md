# Gestor de Tareas — Proyecto PDAUF

Aplicación full-stack de gestión de tareas (CRUD), desarrollada como proyecto del módulo **Programación de Aplicaciones Utilizando Frameworks (PDAUF)** del ciclo de Desarrollo de Aplicaciones Multiplataforma (DAM).

Permite crear, listar y eliminar tareas desde una interfaz web (React) conectada a una API REST (Spring Boot).

## 🛠️ Tecnologías

**Backend** (`tarea-ut5.1`)
- Java 21 + Spring Boot 4
- Spring Data JPA
- PostgreSQL (producción) / H2 (desarrollo y tests)
- Tests unitarios y de integración (JUnit)

**Frontend** (`tarea-ut5.1-front`)
- React 19 + Vite
- Bootstrap 5
- Tests unitarios con Vitest + Testing Library
- Tests end-to-end con Playwright

**DevOps / Infraestructura**
- Docker (build multi-etapa) y Docker Compose
- Integración continua con GitHub Actions (compilación, tests, build y publicación de imagen Docker)
- Despliegue en Railway

## 🌿 Estructura del repositorio

El proyecto se desarrolló de forma incremental, unidad a unidad del módulo, y **el backend y el frontend viven en ramas separadas** en vez de en una sola rama combinada:

| Rama | Contenido |
|---|---|
| `tarea-ut1.2` / `tarea-ut2.1` | Primeras versiones del backend (API REST básica) |
| `tarea-ut2.2` | Primera versión del frontend |
| `tarea-ut3.1-postgresql` | Migración de la base de datos a PostgreSQL |
| `tarea-ut3.1-robusta` | Dockerización, GitHub Actions y despliegue en Railway |
| `tarea-ut4.1` | Bootstrap y rediseño de la interfaz (UI) |
| `tarea-ut5.1` | **Backend final** — API REST + tests |
| `tarea-ut5.1-front` | **Frontend final** — interfaz + tests unitarios y e2e |

> Para ejecutar el proyecto completo, hace falta clonar/combinar `tarea-ut5.1` (backend) y `tarea-ut5.1-front` (frontend). No hay todavía una única rama con ambos.

## 🚀 Cómo ejecutar el proyecto

### Backend (rama `tarea-ut5.1`)
```bash
./mvnw spring-boot:run
```
Por defecto usa el perfil de desarrollo (`application.properties`, con PostgreSQL local). Copia `.env.example` como referencia de las variables necesarias en producción.

### Frontend (rama `tarea-ut5.1-front`)
```bash
npm install
npm run dev
```

### Con Docker (backend)
```bash
docker-compose up --build
```
Levanta la API junto con una base de datos PostgreSQL en contenedores.

## ✅ Tests

```bash
# Backend
./mvnw test

# Frontend — unitarios
npm run test

# Frontend — end-to-end (Playwright)
npm run test:e2e
```

## 🔐 Nota sobre seguridad

El cliente (`tareasApi.js`) está preparado para enviar un token en las peticiones (`Authorization: Bearer`), pero el backend aún no valida ese token — la autenticación de usuarios no está implementada todavía en el servidor. Es uno de los siguientes pasos pendientes del proyecto.

## 📌 Autora

Denitsa Mutlova — [GitHub](https://github.com/Denitsa-Mutlova) · [LinkedIn](https://www.linkedin.com/in/denitsa-mutlova-6a43a8143/)
