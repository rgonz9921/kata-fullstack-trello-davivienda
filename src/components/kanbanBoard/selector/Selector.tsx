"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Sprint = {
  _id: string
  name: string
}

type Props = {
  selectedSprint: string
  setSelectedSprint: (value: string) => void
  sprints: Sprint[]
}

export default function SprintSelector({
                                         selectedSprint,
                                         setSelectedSprint,
                                         sprints,
                                       }: Props) {
  return (
    <div className="flex justify-end">
      <div className="flex items-center gap-2">
        <label className="font-semibold text-gray-800 dark:text-white">
          Select Sprint:
        </label>
        <Select value={selectedSprint} onValueChange={setSelectedSprint}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a sprint" />
          </SelectTrigger>
          <SelectContent>
            {sprints.map((sprint) => (
              <SelectItem key={sprint._id} value={sprint._id}>
                {sprint.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
