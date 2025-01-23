"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface InterventionSearchProps {
  value: string
  onChange: (value: string) => void
}

export function InterventionSearch({ value, onChange }: InterventionSearchProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const suggestionRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!isTyping) return

    const fetchSuggestions = async () => {
      if (value.length < 2) {
        setSuggestions([])
        setShowSuggestions(false)
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/suggestions?input=${encodeURIComponent(value)}&dictionary=InterventionName`)
        if (!response.ok) {
          throw new Error("Failed to fetch suggestions")
        }
        const data = await response.json()
        setSuggestions(data)
        setShowSuggestions(data.length > 0)
      } catch (error) {
        console.error("Error fetching suggestions:", error)
        setSuggestions([])
        setShowSuggestions(false)
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(() => {
      fetchSuggestions()
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [value, isTyping])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion)
    setShowSuggestions(false)
    setSuggestions([])
    setIsTyping(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true)
    onChange(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" && suggestionRef.current) {
      e.preventDefault()
      suggestionRef.current.querySelector("li")?.focus()
    }
  }

  return (
    <div className="relative">
      <Label htmlFor="intervention" className="text-sm font-medium">
        Intervention/Treatment
      </Label>
      <Input
        id="intervention"
        type="text"
        placeholder="Enter an intervention or treatment"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="mt-1"
        aria-autocomplete="list"
        aria-controls="intervention-suggestions-list"
        aria-expanded={showSuggestions}
      />
      {isLoading && <Loader2 className="h-4 w-4 animate-spin absolute right-3 top-[38px]" />}
      {showSuggestions && suggestions.length > 0 && (
        <ul
          id="intervention-suggestions-list"
          ref={suggestionRef}
          className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-auto"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSuggestionClick(suggestion)
                if (e.key === "ArrowDown") {
                  e.preventDefault()
                  const nextSibling = e.currentTarget.nextElementSibling as HTMLLIElement
                  if (nextSibling) nextSibling.focus()
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault()
                  const prevSibling = e.currentTarget.previousElementSibling as HTMLLIElement
                  if (prevSibling) prevSibling.focus()
                  else if (index === 0) {
                    const input = document.getElementById("intervention") as HTMLInputElement
                    input.focus()
                  }
                }
              }}
              tabIndex={0}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer focus:outline-none focus:bg-gray-100 dark:text-gray-900"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

