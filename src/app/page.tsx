import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function Home() {
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
            <Link href="/auth/login">
              <Button
                variant="ghost"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Registrarse</Button>
            </Link>
          </div>
        </nav>
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-[240px]">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Organiza tus proyectos con facilidad
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-6">
            FakeTrello es tu herramienta de gestión de tareas simple, rápida y gratuita.
            Crea tableros, organiza tus ideas y trabaja en equipo como un profesional.
          </p>
          <div className="flex gap-4">
            <Link href="/auth/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                ¡Comienza Gratis!
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              >
                Ya tengo cuenta
              </Button>
            </Link>
          </div>
        </main>
      </header>
    </div>
  );
}
