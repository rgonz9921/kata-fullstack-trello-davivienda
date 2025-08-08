export const fetchTasks = async (token: string) => {
  try {
    const res = await fetch("http://localhost:8080/v1/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error("Error al obtener las tareas");
    }

    const data = await res.json();
    return data.tasks;
  } catch (error) {
    console.error(error);
    return [];
  }
};
