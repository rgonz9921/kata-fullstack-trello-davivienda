"use client"

import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {BookOpen} from "lucide-react"
import {useRouter} from "next/navigation"
import KanbanBoard from "@/components/kanbanBoard"
import {fetchTasks} from "@/services/tasksService";

export default function Page() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  //Mostrar correo de usuario conectado
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      try {
        const parsed = JSON.parse(user)
        setUserName(parsed.email)
      } catch {
        setUserName("")
      }
    }
  }, [])

  //Redireccion malintencionada
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      router.replace("/auth/login")
    } else {
      fetchTasks().then(setTasks).finally(() => setLoading(false))
    }
  }, [])
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"/>
      </div>
    )
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-full">
              <BookOpen className="h-6 w-6 text-white"/>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">FakeTrello.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-800 dark:text-white font-medium">{userName}</span>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
            >
              Cerrar sesión
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 ml-5 text-gray-800 dark:text-white">Proyecto FakeFacebook</h1>
        <KanbanBoard tasks={tasks}/>
      </main>
    </div>
  )
}
