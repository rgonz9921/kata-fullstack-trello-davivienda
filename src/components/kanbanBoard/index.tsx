"use client"
import { useEffect, useState } from "react"
import DroppableColumn from "./columns/DroppableColumn"
import type {Task} from "./kanban-utils"
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import SprintSelector from "@/components/kanbanBoard/selector/Selector";

type Sprint = {
  _id: string
  name: string
}

type Columns = {
  todo: Task[]
  inProgress: Task[]
  done: Task[]
}

const mockHUs: Task[] = [
  {
    id: "1",
    title: "Design login",
    description: "Design the login form",
    priority: "high",
    assignee: "64fc1234abc1234567890abc",
    deliveryDate: "2025-08-20T00:00:00Z",
    dueDate: "2025-08-25T00:00:00Z",
    sprint: "sprint1",
    status: "done"
  },
  {
    id: "2",
    title: "Create logo",
    description: "Make a new logo for the app",
    priority: "medium",
    assignee: "64fc1234abc1234567890abc",
    deliveryDate: "2025-08-22T00:00:00Z",
    dueDate: "2025-08-27T00:00:00Z",
    sprint: "sprint1",
    status: "done"
  },
  {
    id: "3",
    title: "Main page",
    description: "Build main page layout",
    priority: "low",
    assignee: "64fc1234abc1234567890abd",
    deliveryDate: "2025-08-18T00:00:00Z",
    dueDate: "2025-08-24T00:00:00Z",
    sprint: "sprint2",
    status: "done"
  },
  {
    id: "4",
    title: "Setup Tailwind",
    description: "Configure Tailwind with Next.js",
    priority: "high",
    assignee: "64fc1234abc1234567890abc",
    deliveryDate: "2025-08-15T00:00:00Z",
    dueDate: "2025-08-19T00:00:00Z",
    sprint: "sprint1",
    status: "done"
  },
]

const mockSprints: Sprint[] = [
  { _id: "sprint1", name: "Sprint 1" },
  { _id: "sprint2", name: "Sprint 2" },
]

export default function KanbanBoard() {
  const [selectedSprint, setSelectedSprint] = useState<string>("sprint1")
  const [columns, setColumns] = useState<Columns>({
    todo: [],
    inProgress: [],
    done: [],
  })
  const [tasks, setTasks] = useState<Task[]>(mockHUs)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const updatedTasks = tasks.map((task) =>
      task.id === active.id ? { ...task, status: over.id as Task["status"] } : task
    )
    setTasks(updatedTasks)
  }
  const filteredTasks = tasks.filter((task) => task.sprint === selectedSprint)
  const grouped = {
    todo: filteredTasks.filter((t) => t.status === "todo"),
    inProgress: filteredTasks.filter((t) => t.status === "inProgress"),
    done: filteredTasks.filter((t) => t.status === "done"),
  }

  useEffect(() => {
    const filtered = mockHUs.filter((hu) => hu.sprint === selectedSprint)

    const grouped: Columns = {
      todo: [],
      inProgress: [],
      done: [],
    }

    filtered.forEach((hu) => {
      const status = hu.status || "todo"
      if (status === "todo" || status === "inProgress" || status === "done") {
        grouped[status].push(hu)
      }
    })

    setColumns(grouped)
  }, [selectedSprint])

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <SprintSelector
        selectedSprint={selectedSprint}
        setSelectedSprint={setSelectedSprint}
        sprints={mockSprints}
      />
      {/* Kanban Columns*/}
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DroppableColumn columnId="todo" items={grouped.todo} />
          <DroppableColumn columnId="inProgress" items={grouped.inProgress} />
          <DroppableColumn columnId="done" items={grouped.done} />
        </div>
      </DndContext>
    </div>
  )
}
