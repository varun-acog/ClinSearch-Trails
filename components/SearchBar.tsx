"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ConditionSearch } from "./ConditionSearch"
import { InterventionSearch } from "./InterventionSearch"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  onSearch: (condition: string, intervention: string) => void
  buttonClassName?: string
}

export function SearchBar({ onSearch, buttonClassName }: SearchBarProps) {
  const [condition, setCondition] = useState("")
  const [intervention, setIntervention] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (condition.trim() || intervention.trim()) {
      setIsSearching(true)
      await onSearch(condition.trim(), intervention.trim())
      setIsSearching(false)
    } else {
      alert("Please enter a condition/disease or intervention/treatment")
    }
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="w-full sm:w-1/2">
          <ConditionSearch value={condition} onChange={setCondition} />
        </div>
        <div className="w-full sm:w-1/2">
          <InterventionSearch value={intervention} onChange={setIntervention} />
        </div>
      </div>
      <div className="flex justify-center w-full">
        <Button
          type="submit"
          className={cn(
            "w-full max-w-xs rounded-full text-sm py-2 px-4",
            "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
            "text-white font-semibold transition-all duration-200 ease-in-out transform hover:scale-105",
            buttonClassName,
          )}
          disabled={isSearching}
        >
          {isSearching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            "Search"
          )}
        </Button>
      </div>
    </form>
  )
}

