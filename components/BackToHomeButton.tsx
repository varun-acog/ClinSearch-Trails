import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

interface BackToHomeButtonProps {
  onClick: () => void
}

export function BackToHomeButton({ onClick }: BackToHomeButtonProps) {
  return (
    <Button variant="ghost" onClick={onClick} size="icon">
      <Home className="h-4 w-4" />
      <span className="sr-only">Back to Home</span>
    </Button>
  )
}

