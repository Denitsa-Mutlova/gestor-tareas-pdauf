import { useEffect, useState } from "react";
import { obtenerTareas, crearTarea, borrarTarea } from "../services/tareasApi";

function Tareas() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [completada, setCompletada] = useState(false);

  useEffect(() => {
    cargarTareas();
  }, []);

  async function cargarTareas() {
    const datos = await obtenerTareas();
    setTareas(datos);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!titulo) return; // evitar título vacío
    await crearTarea({
      titulo: titulo,
      descripcion: descripcion,
      completada: completada,
    });
    // limpiar formulario
    setTitulo("");
    setDescripcion("");
    setCompletada(false);
    cargarTareas();
  }

  async function eliminar(id) {
    await borrarTarea(id);
    cargarTareas();
  }

  return (
    <div>
      <h2>Gestor de Tareas</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título de la tarea"
          required
        />
        <input
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
        />
        <label>
          Completada:
          <input
            type="checkbox"
            checked={completada}
            onChange={(e) => setCompletada(e.target.checked)}
          />
        </label>
        <button>Añadir</button>
      </form>

      <ul>
        {tareas.map((t) => (
          <li key={t.id}>
            <strong>{t.titulo}</strong> - {t.descripcion} -{" "}
            {t.completada ? "✅" : "❌"}
            <button onClick={() => eliminar(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tareas;
