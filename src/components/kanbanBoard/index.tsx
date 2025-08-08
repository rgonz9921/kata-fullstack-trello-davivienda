"use client"
import {useEffect, useMemo, useState} from "react"
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

export default function KanbanBoard({ tasks }: { tasks: Task[] }) {
  const [selectedSprint, setSelectedSprint] = useState<string>("")
  const [columns, setColumns] = useState<Columns>({
    todo: [],
    inProgress: [],
    done: [],
  })
  const sprints: Sprint[] = useMemo(() => {
    const unique = new Map<string, string>()
    tasks.forEach((t) => {
      if (!unique.has(t.sprint)) {
        unique.set(t.sprint, t.sprintName)
      }
    })
    return Array.from(unique.entries()).map(([id, name]) => ({
      _id: id,
      name,
    }))
  }, [tasks])

  useEffect(() => {
    if (sprints.length > 0 && !selectedSprint) {
      setSelectedSprint(sprints[0]._id)
    }
  }, [sprints, selectedSprint])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const activeId = active.id as string
    const sourceColumnId = Object.keys(columns).find((key) =>
      columns[key as keyof Columns].some((task) => task.id === activeId)
    ) as keyof Columns

    const destinationColumnId = over.id as keyof Columns

    if (!sourceColumnId || !destinationColumnId) return

    const activeTask = columns[sourceColumnId].find((task) => task.id === activeId)
    if (!activeTask) return

    // Remover de columna fuente
    const sourceItems = [...columns[sourceColumnId]].filter((task) => task.id !== activeId)

    // Añadir a columna destino
    const updatedTask = { ...activeTask, status: destinationColumnId }
    const destinationItems = [...columns[destinationColumnId], updatedTask]

    setColumns({
      ...columns,
      [sourceColumnId]: sourceItems,
      [destinationColumnId]: destinationItems,
    })
  }

  useEffect(() => {
    console.log("HOLA MUNDO", tasks)
    const filtered = tasks.filter((hu) => hu.sprint === selectedSprint)
    const grouped: Columns = {
      todo: [],
      inProgress: [],
      done: [],
    }
    filtered.forEach((hu) => {
      const status = hu.status || "todo"
      if (status in grouped) {
        grouped[status as keyof Columns].push(hu)
      }
    })
    setColumns(grouped)
  }, [selectedSprint, tasks])

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <SprintSelector
        selectedSprint={selectedSprint}
        setSelectedSprint={setSelectedSprint}
        sprints={sprints}
      />
      {/* Kanban Columns*/}
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DroppableColumn columnId="todo" items={columns.todo} />
          <DroppableColumn columnId="inProgress" items={columns.inProgress} />
          <DroppableColumn columnId="done" items={columns.done} />
        </div>
      </DndContext>
    </div>
  )
}
