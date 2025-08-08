"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { HU } from "../kanban-utils"

type DraggableCardProps = {
  hu: HU
}

export default function DraggableCard({ hu }: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: hu.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const users = [
    { _id: "64fc1234abc1234567890abc", name: "Roberth Gonzalez" },
    { _id: "64fc1234abc1234567890abd", name: "Jane Doe" },
  ]
  const user = users.find((u) => u._id === hu.assignee)

  const priorityColor = {
    low: "text-blue-500 dark:text-blue-300",
    medium: "text-blue-700 dark:text-blue-200",
    high: "text-blue-900 dark:text-blue-100 font-bold",
  }[hu.priority]

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-2 cursor-grab border border-blue-200 bg-white dark:bg-gray-800 shadow"
    >
      <CardContent className="p-4 text-gray-800 dark:text-gray-100 space-y-1">
        <h3 className="text-lg font-semibold">{hu.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Assigned to: <span className="font-medium">{user?.name || "Unknown"}</span>
        </p>
        <p className={`text-sm ${priorityColor}`}>
          Priority: {hu.priority.charAt(0).toUpperCase() + hu.priority.slice(1)}
        </p>
      </CardContent>
    </Card>
  )
}
