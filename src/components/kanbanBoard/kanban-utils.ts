export type HU = {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  assignee: string
  deliveryDate: string
  dueDate: string
  sprint: string
  status: "todo" | "inProgress" | "done"
}
