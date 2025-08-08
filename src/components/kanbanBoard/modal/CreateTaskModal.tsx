"use client"
import {useEffect, useState} from "react"
import {createTask, CreateTaskPayload} from "@/services/tasksService"
import {fetchSprints} from "@/services/sprintService";
import {fetchUsers} from "@/services/userService";

type CreateTaskModalProps = {
  isOpen: boolean
  onClose: () => void
  sprintId: string
  onTaskCreated: () => Promise<void>
}

export default function CreateTaskModal({isOpen, onClose, sprintId, onTaskCreated}: CreateTaskModalProps) {
  const [form, setForm] = useState<CreateTaskPayload>({
    title: "",
    description: "",
    priority: "medium",
    assignee: "",
    deliveryDate: "",
    dueDate: "",
    sprint: sprintId,
    status: "todo",
  })
  const [sprints, setSprints] = useState<{ _id: string; name: string }[]>([])
  const [users, setUsers] = useState<{ _id: string; name: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [notPermission, setNotPermission] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target
    setForm((prev) => ({...prev, [name]: value}))
  }

  useEffect(() => {
    if (isOpen) {
      const token = localStorage.getItem("accessToken")
      if (!token) return

      Promise.all([fetchSprints(), fetchUsers()])
        .then(([sprintsData, usersData]) => {
          setSprints(sprintsData)
          setUsers(usersData)
        })
        .catch((err) => {
          console.error(err)
          setError("Error cargando datos")
        })
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("accessToken") // o desde tu auth context
      if (!token) throw new Error("No hay token de autenticación")

      await createTask(form)
      await onTaskCreated()
      console.log("Tarea creada correctamente")
      onClose()
    } catch (err: any) {
      console.error("Error creando tarea:", err);
      if (err.response) {
        if (err.response.status === 403) {
          setNotPermission(true);
          return;
        }
        setError(err.response.data?.message || "Error creando la tarea");
      } else {
        setNotPermission(true);
        setError("Error de conexión con el servidor");
      }
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-40 flex items-center justify-center z-50">
      {notPermission ? (<>
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center border border-blue-200">
            <h2 className="text-xl font-bold mb-3 text-blue-700">
              🚫 Permisos insuficientes
            </h2>
            <p className="mb-5 text-gray-700">
              Solo los usuarios con rol <span className="font-semibold text-blue-600">ADMIN</span> pueden crear tareas.
            </p>
            <button
              onClick={onClose}
              className="bg-blue-500 text-white py-2 px-5 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </>
      ) : (<>
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Crear Nueva Tarea</h2>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              placeholder="Título"
              value={form.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            <textarea
              name="description"
              placeholder="Descripción"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
            <select
              name="sprint"
              value={form.sprint}
              onChange={handleChange}
              className="w-full border p-2"
            >
              <option value="">Selecciona Sprint</option>
              {sprints.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
            <select
              name="assignee"
              value={form.assignee}
              onChange={handleChange}
              className="w-full border p-2"
            >
              <option value="">Selecciona Responsable</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>
            <div className="flex gap-4">
              <input
                type="date"
                name="deliveryDate"
                value={form.deliveryDate}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Creando..." : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </>)
      }
    </div>
  )
}
