import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface QuickStatCardProps {
  icon: LucideIcon
  value: string
  label: string
}

export function QuickStatCard({ icon: Icon, value, label }: QuickStatCardProps) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <Icon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
        <div className="text-3xl font-bold mb-2">{value}</div>
        <div className="text-gray-600 dark:text-gray-400">{label}</div>
      </CardContent>
    </Card>
  )
}

