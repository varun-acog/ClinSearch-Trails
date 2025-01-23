'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { PhaseFilter } from './PhaseFilter'
import { SexFilter } from './SexFilter'
import { AgeGroupFilter } from './AgeGroupFilter'

interface FilterWidgetProps {
  selectedPhase: string
  onPhaseChange: (phase: string) => void
  selectedSex: string
  onSexChange: (sex: string) => void
  selectedAgeGroup: string
  onAgeGroupChange: (ageGroup: string) => void
}

export function FilterWidget({
  selectedPhase,
  onPhaseChange,
  selectedSex,
  onSexChange,
  selectedAgeGroup,
  onAgeGroupChange
}: FilterWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          Filters
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle filters</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          <div className="flex flex-wrap gap-4">
            <PhaseFilter selectedPhase={selectedPhase} onPhaseChange={onPhaseChange} />
            <SexFilter selectedSex={selectedSex} onSexChange={onSexChange} />
            <AgeGroupFilter selectedAgeGroup={selectedAgeGroup} onAgeGroupChange={onAgeGroupChange} />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

