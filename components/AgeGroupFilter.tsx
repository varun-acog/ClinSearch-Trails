import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ageGroupOptions = [
  { value: "all", label: "All" },
  { value: "child", label: "Child" },
  { value: "adult", label: "Adult" },
  { value: "older", label: "Older Adult" },
]

interface AgeGroupFilterProps {
  selectedAgeGroup: string
  onAgeGroupChange: (ageGroup: string) => void
}

export function AgeGroupFilter({ selectedAgeGroup, onAgeGroupChange }: AgeGroupFilterProps) {
  return (
    <Select value={selectedAgeGroup} onValueChange={onAgeGroupChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select age" />
      </SelectTrigger>
      <SelectContent>
        {ageGroupOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

