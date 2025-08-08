import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable"
import DraggableCard from "../cards/DraggableCard"
import {useDroppable} from "@dnd-kit/core";
import type {Task} from "@/components/kanbanBoard/kanban-utils";

type DroppableColumnProps = {
  columnId: Task["status"]
  items: Task[]
}

const columnTitleMap: Record<"todo" | "inProgress" | "done", string> = {
  todo: "Por hacer",
  inProgress: "En progreso",
  done: "Hecho",
}

export default function DroppableColumn({ columnId, items }: DroppableColumnProps) {
  const { setNodeRef } = useDroppable({ id: columnId })

  return (
    <div
      ref={setNodeRef}
      className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-4 min-h-[300px] border border-blue-200 dark:border-blue-700"
    >
      <h2 className="text-lg font-semibold capitalize mb-4 text-gray-800 dark:text-white">
        {columnTitleMap[columnId]}
      </h2>
      <SortableContext items={items.map((hu) => hu.id)} strategy={rectSortingStrategy}>
        {items.map((hu) => (
          <DraggableCard key={hu.id} task={hu} />
        ))}
      </SortableContext>
    </div>
  )
}
