import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const phases = [
  { value: "phase-0", label: "Early Phase 1" },
  { value: "phase-1", label: "Phase 1" },
  { value: "phase-2", label: "Phase 2" },
  { value: "phase-3", label: "Phase 3" },
  { value: "phase-4", label: "Phase 4" },
]

interface PhaseFilterProps {
  selectedPhase: string
  onPhaseChange: (phase: string) => void
  includeAllOption?: boolean
}

export function PhaseFilter({ selectedPhase, onPhaseChange, includeAllOption = false }: PhaseFilterProps) {
  const phaseOptions = includeAllOption ? phases : phases.slice(1)

  return (
    <Select value={selectedPhase} onValueChange={onPhaseChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select phase..." />
      </SelectTrigger>
      <SelectContent>
        {phaseOptions.map((phase) => (
          <SelectItem key={phase.value} value={phase.value}>
            {phase.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

