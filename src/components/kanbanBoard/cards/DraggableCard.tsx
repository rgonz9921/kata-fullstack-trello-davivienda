"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Task } from "../kanban-utils"

type DraggableCardProps = {
  task: Task
}

export default function DraggableCard({ task }: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const priorityColor = {
    low: "text-blue-500 dark:text-blue-300",
    medium: "text-blue-700 dark:text-blue-200",
    high: "text-blue-900 dark:text-blue-100 font-bold",
  }[task.priority]

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-2 cursor-grab border border-blue-200 bg-white dark:bg-gray-800 shadow"
    >
      <CardContent className="p-4 text-gray-800 dark:text-gray-100 space-y-1">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Assigned to: <span className="font-medium">{task?.assigneeName || "Unknown"}</span>
        </p>
        <p className={`text-sm ${priorityColor}`}>
          Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </p>
      </CardContent>
    </Card>
  )
}
