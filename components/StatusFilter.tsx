'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface StatusOption {
  label: string
  value: string
}

const statusGroups = [
  {
    title: "Looking for participants",
    options: [
      { label: "Not yet recruiting", value: "not" },
      { label: "Recruiting", value: "rec" },
    ]
  },
  {
    title: "No longer looking for participants",
    options: [
      { label: "Active, not recruiting", value: "act" },
      { label: "Completed", value: "com" },
      { label: "Terminated", value: "ter" },
    ]
  },
  {
    title: "Other",
    options: [
      { label: "Enrolling by invitation", value: "enr"},
      { label: "Suspended", value: "sus" },
      { label: "Withdrawn", value: "wit" },
      { label: "Unknown", value: "unk" },
    ]
  }
]

interface StatusFilterProps {
  selectedStatuses: string[]
  onStatusChange: (statuses: string[]) => void
}

export function StatusFilter({ selectedStatuses, onStatusChange }: StatusFilterProps) {
  const handleStatusToggle = (value: string) => {
    if (selectedStatuses.includes(value)) {
      onStatusChange(selectedStatuses.filter(status => status !== value))
    } else {
      onStatusChange([...selectedStatuses, value])
    }
  }

  return (
    <div className="space-y-4">
       {statusGroups.map((group) => (
         <div key={group.title} className="space-y-2">
           <h4 className="text-xs font-medium text-muted-foreground">{group.title}</h4>
           <div className="grid grid-cols-1 gap-2">
             {group.options.map((option) => (
               <div key={option.value} className="flex items-center space-x-2">
                 <Checkbox
                   id={option.value}
                   checked={selectedStatuses.includes(option.value)}
                   onCheckedChange={() => handleStatusToggle(option.value)}
                 />
                 <Label htmlFor={option.value} className="text-sm">
                   {option.label}
                 </Label>
               </div>
             ))}
           </div>
         </div>
       ))}
     </div>
  )
}

