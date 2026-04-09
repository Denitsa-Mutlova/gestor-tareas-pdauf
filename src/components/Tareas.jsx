import { useEffect, useState } from "react";
import { obtenerTareas, crearTarea, borrarTarea } from "../services/tareasApi";

function Tareas() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [completada, setCompletada] = useState(false);
  const [cargando, setCargando] = useState(false);

  useEffect(() => { cargarTareas(); }, []);

  async function cargarTareas() {
    const datos = await obtenerTareas();
    setTareas(datos);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!titulo) return;
    setCargando(true);
    await crearTarea({ titulo, descripcion, completada });
    setTitulo(""); setDescripcion(""); setCompletada(false);
    await cargarTareas();
    setCargando(false);
  }

  async function eliminar(id) {
    await borrarTarea(id);
    cargarTareas();
  }

  return (
    <div>

      {/* ── NAVBAR ── */}
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container">
          <span className="navbar-brand fw-bold fs-4">📝 Gestor de Tareas</span>
          <span className="badge bg-light text-primary fs-6">
            {tareas.length} tarea{tareas.length !== 1 ? "s" : ""}
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row justify-content-center">

          {/* ── FORMULARIO ── */}
          <div className="col-12 col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Nueva tarea</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Título *</label>
                    <input className="form-control" value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      placeholder="Título de la tarea" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Descripción</label>
                    <input className="form-control" value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      placeholder="Descripción (opcional)" />
                  </div>
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox"
                      id="checkCompletada" checked={completada}
                      onChange={(e) => setCompletada(e.target.checked)} />
                    <label className="form-check-label" htmlFor="checkCompletada">
                      Marcar como completada
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 boton-animar"
                    disabled={cargando}>
                    {cargando ? (
                      <><span className="spinner-border spinner-border-sm me-2" />Guardando…</>
                    ) : "➕ Añadir tarea"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* ── LISTA ── */}
          <div className="col-12 col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-secondary text-white">
                <h5 className="mb-0">Lista de tareas</h5>
              </div>
              <div className="card-body p-0">
                {tareas.length === 0 ? (
                  <p className="text-center text-muted py-4">No hay tareas. ¡Añade una!</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr><th>Título</th><th>Descripción</th><th>Estado</th><th></th></tr>
                      </thead>
                      <tbody>
                        {tareas.map((t) => (
                          <tr key={t.id} className="fila-animada">
                            <td className="fw-semibold">{t.titulo}</td>
                            <td className="text-muted">{t.descripcion}</td>
                            <td>
                              {t.completada
                                ? <span className="badge bg-success">Hecha</span>
                                : <span className="badge bg-warning text-dark">Pendiente</span>}
                            </td>
                            <td>
                              <button className="btn btn-danger btn-sm boton-animar"
                                onClick={() => eliminar(t.id)}>🗑️</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Tareas;