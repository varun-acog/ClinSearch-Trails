import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const sexOptions = [
  { value: "all", label: "All" },
  { value: "m", label: "Male" },
  { value: "f", label: "Female" },
]

interface SexFilterProps {
  selectedSex: string
  onSexChange: (sex: string) => void
}

export function SexFilter({ selectedSex, onSexChange }: SexFilterProps) {
  return (
    <Select value={selectedSex} onValueChange={onSexChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Select sex" />
      </SelectTrigger>
      <SelectContent>
        {sexOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

