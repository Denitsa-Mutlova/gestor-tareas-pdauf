const API_URL = "http://localhost:8080/api/tareas";

export async function obtenerTareas() {
  const token = localStorage.getItem("token");

  const res = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  });

  return res.json();
}

export async function crearTarea(tarea) {
  const token = localStorage.getItem("token");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(tarea),
  });

  return res.json();
}

export async function borrarTarea(id) {
  const token = localStorage.getItem("token");

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + token
    }
  });
}
