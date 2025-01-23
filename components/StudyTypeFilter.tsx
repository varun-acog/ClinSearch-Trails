"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const studyTypes = {
  primary: [
    { label: "Interventional", value: "int" },
    { label: "Observational", value: "obs" },
  ],
  specialized: [{ label: "Expanded access", value: "exp" }],
}

interface StudyTypeFilterProps {
  selectedTypes: string[]
  onTypeChange: (types: string[]) => void
  filterType: "primary" | "specialized"
}

export function StudyTypeFilter({ selectedTypes, onTypeChange, filterType }: StudyTypeFilterProps) {
  const handleTypeToggle = (value: string) => {
    if (selectedTypes.includes(value)) {
      onTypeChange(selectedTypes.filter((type) => type !== value))
    } else {
      onTypeChange([...selectedTypes, value])
    }
  }

  const types = studyTypes[filterType]

  return (
    <div className="space-y-2">
      {types.map((type) => (
        <div key={type.value} className="flex items-center space-x-2">
          <Checkbox
            id={`study-type-${type.value}`}
            checked={selectedTypes.includes(type.value)}
            onCheckedChange={() => handleTypeToggle(type.value)}
          />
          <Label htmlFor={`study-type-${type.value}`} className="text-sm">
            {type.label}
          </Label>
        </div>
      ))}
    </div>
  )
}

