export type Task = {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  assignee: string
  assigneeName: string
  deliveryDate: string
  dueDate: string
  sprint: string
  status: "todo" | "inProgress" | "done"
  sprintName : string;
}
