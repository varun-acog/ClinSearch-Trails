"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const diseases = [
  "Asthma",
  "Hidradenitis Suppurativa",
  "Prurigo Nodularis",
  "Atopic Dermatitis",
  "Atopic Eczema",
  "Chronic Idiopathic Urticaria",
]

interface DiseaseSelectorProps {
  onSearch: (selectedDiseases: string[]) => void
  darkModeClasses?: string
}

export function DiseaseSelector({ onSearch, darkModeClasses }: DiseaseSelectorProps) {
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([])

  const toggleDisease = (disease: string) => {
    setSelectedDiseases((prev) => (prev.includes(disease) ? prev.filter((d) => d !== disease) : [...prev, disease]))
  }

  const handleSearch = () => {
    if (selectedDiseases.length > 0) {
      onSearch(selectedDiseases)
    } else {
      alert("Please select at least one disease")
    }
  }

  return (
    <div className="space-y-8 w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {diseases.map((disease) => (
          <Card
            key={disease}
            className={cn(
              "cursor-pointer transition-all",
              "hover:bg-blue-50 dark:hover:bg-blue-900",
              selectedDiseases.includes(disease) && "ring-2 ring-blue-500 dark:ring-blue-400",
              darkModeClasses,
            )}
            onClick={() => toggleDisease(disease)}
          >
            <CardContent className="flex items-center justify-center h-16 text-center p-1">
              <span className="text-sm font-medium">{disease}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center pt-4">
        <Button
          onClick={handleSearch}
          disabled={selectedDiseases.length === 0}
          className="w-full max-w-xs mx-auto rounded-full text-sm py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          Search Selected Diseases
        </Button>
      </div>
    </div>
  )
}

