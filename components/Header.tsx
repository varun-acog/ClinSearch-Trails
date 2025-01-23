"use client"

import "@/app/globals.css"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onLogoClick: () => void
}

export function Header({ onLogoClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={onLogoClick} className="text-2xl font-bold hover:opacity-80 transition-opacity text-gradient">
          ClinSearch
        </button>
        <div className="hidden md:flex items-center space-x-4">
          <ModeToggle />
        </div>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <ModeToggle />
          </nav>
        </div>
      )}
    </header>
  )
}

