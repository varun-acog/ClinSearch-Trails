"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { FilterIcon, ChevronDown } from "lucide-react"
import { PhaseFilter } from "./PhaseFilter"
import { SexFilter } from "./SexFilter"
import { AgeGroupFilter } from "./AgeGroupFilter"
import { StatusFilter } from "./StatusFilter"
import { StudyTypeFilter } from "./StudyTypeFilter"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

interface FiltersSectionProps {
  selectedPhase: string
  onPhaseChange: (phase: string) => void
  selectedSex: string
  onSexChange: (sex: string) => void
  selectedAgeGroup: string
  onAgeGroupChange: (ageGroup: string) => void
  selectedStatuses: string[]
  onStatusChange: (statuses: string[]) => void
  selectedStudyTypes: string[]
  onStudyTypeChange: (types: string[]) => void
  onResetPhase: () => void
  onResetSex: () => void
  onResetAgeGroup: () => void
  onResetStatus: () => void
  onResetStudyType: () => void
}

export function FiltersSection({
  selectedPhase,
  onPhaseChange,
  selectedSex,
  onSexChange,
  selectedAgeGroup,
  onAgeGroupChange,
  selectedStatuses,
  onStatusChange,
  selectedStudyTypes,
  onStudyTypeChange,
  onResetPhase,
  onResetSex,
  onResetAgeGroup,
  onResetStatus,
  onResetStudyType,
}: FiltersSectionProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FilterIcon className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px] lg:w-[600px] max-w-full">
        <div className="flex flex-col h-full">
          <div className="px-1 py-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <p className="text-sm text-muted-foreground mt-1">Apply filters to refine your search results.</p>
            <Button
              variant="outline"
              onClick={() => {
                onResetPhase()
                onResetSex()
                onResetAgeGroup()
                onResetStatus()
                onResetStudyType()
              }}
              className="w-full mt-4"
            >
              Reset Filters
            </Button>
          </div>

          <Separator />

          <div className="flex-1 overflow-y-auto">
            <div className="space-y-6 py-6">
              {/* Phase Filter */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold px-1">Phase</h3>
                <PhaseFilter selectedPhase={selectedPhase} onPhaseChange={onPhaseChange} />
              </div>

              {/* Sex Filter */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold px-1">Sex</h3>
                <SexFilter selectedSex={selectedSex} onSexChange={onSexChange} />
              </div>

              {/* Age Group Filter */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold px-1">Age Group</h3>
                <AgeGroupFilter selectedAgeGroup={selectedAgeGroup} onAgeGroupChange={onAgeGroupChange} />
              </div>

              {/* Study Status */}
              <Accordion type="single" collapsible>
                <AccordionItem value="study-status" className="border-none">
                  <AccordionTrigger className="text-sm font-semibold hover:no-underline py-0">
                    Study Status
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-4">
                      <StatusFilter selectedStatuses={selectedStatuses} onStatusChange={onStatusChange} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Study Type */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold px-1">Study Type</h3>
                <Accordion type="multiple" className="space-y-2">
                  <AccordionItem value="primary-types" className="border-none">
                    <AccordionTrigger className="text-sm hover:no-underline py-2 px-4 rounded-md bg-muted">
                      Primary Types
                    </AccordionTrigger>
                    <AccordionContent className="pt-2">
                      <div className="space-y-2">
                        <StudyTypeFilter
                          selectedTypes={selectedStudyTypes}
                          onTypeChange={onStudyTypeChange}
                          filterType="primary"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="specialized-types" className="border-none">
                    <AccordionTrigger className="text-sm hover:no-underline py-2 px-4 rounded-md bg-muted">
                      Specialized Types
                    </AccordionTrigger>
                    <AccordionContent className="pt-2">
                      <div className="space-y-2">
                        <StudyTypeFilter
                          selectedTypes={selectedStudyTypes}
                          onTypeChange={onStudyTypeChange}
                          filterType="specialized"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

