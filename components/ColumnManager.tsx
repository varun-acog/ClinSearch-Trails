"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Lock, MoveUp, MoveDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface Column {
  id: string
  title: string
  isVisible: boolean
  isLocked?: boolean
  group?: string
}

interface ColumnGroup {
  id: string
  name: string
}

interface ColumnManagerProps {
  columns: Column[]
  columnGroups: ColumnGroup[]
  onColumnsChange: (columns: Column[]) => void
  open: boolean
  onClose: () => void
}

export function ColumnManager({ columns, columnGroups, onColumnsChange, open, onClose }: ColumnManagerProps) {
  const visibleColumns = columns.filter((col) => col.isVisible)
  const hiddenColumns = columns.filter((col) => !col.isVisible)

  const toggleColumn = (columnId: string) => {
    const updatedColumns = columns.map((col) => (col.id === columnId ? { ...col, isVisible: !col.isVisible } : col))
    onColumnsChange(updatedColumns)
  }

  const moveColumn = (columnId: string, direction: "up" | "down") => {
    const currentIndex = columns.findIndex((col) => col.id === columnId)
    if ((direction === "up" && currentIndex === 0) || (direction === "down" && currentIndex === columns.length - 1))
      return

    const newColumns = [...columns]
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
    const [movedColumn] = newColumns.splice(currentIndex, 1)
    newColumns.splice(targetIndex, 0, movedColumn)
    onColumnsChange(newColumns)
  }

  const toggleGroup = (groupId: string, visible: boolean) => {
    const updatedColumns = columns.map((col) =>
      col.group === groupId && !col.isLocked ? { ...col, isVisible: visible } : col,
    )
    onColumnsChange(updatedColumns)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            <VisuallyHidden>Manage Columns</VisuallyHidden>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 max-h-[60vh] overflow-y-auto">
          <div>
            <div className="flex justify-between mb-1">
              <h3 className="font-semibold text-sm">Selected ({visibleColumns.length})</h3>
              <Button
                variant="link"
                onClick={() =>
                  onColumnsChange(columns.map((col) => ({ ...col, isVisible: col.isLocked ? true : false })))
                }
                className="h-auto p-0 text-xs"
              >
                De-select all
              </Button>
            </div>
            <div className="space-y-3">
              {columnGroups.map((group) => {
                const groupColumns = visibleColumns.filter((col) => col.group === group.id)
                if (groupColumns.length === 0) return null

                return (
                  <div key={group.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-medium text-muted-foreground">{group.name}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleGroup(group.id, false)}
                        className="h-auto py-1 px-2 text-xs"
                      >
                        Hide all
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {groupColumns.map((column) => (
                        <div key={column.id} className="flex items-center gap-2 p-1 bg-muted/50 rounded-md">
                          <Checkbox
                            checked={column.isVisible}
                            onCheckedChange={() => !column.isLocked && toggleColumn(column.id)}
                            disabled={column.isLocked}
                          />
                          <span className="flex-grow text-sm">{column.title}</span>
                          {column.isLocked ? (
                            <Lock className="h-3 w-3 text-muted-foreground" />
                          ) : (
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveColumn(column.id, "up")}
                                className="h-6 w-6"
                              >
                                <MoveUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveColumn(column.id, "down")}
                                className="h-6 w-6"
                              >
                                <MoveDown className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <h3 className="font-semibold text-sm">Not Selected ({hiddenColumns.length})</h3>
              <Button
                variant="link"
                onClick={() => onColumnsChange(columns.map((col) => ({ ...col, isVisible: true })))}
                className="h-auto p-0 text-xs"
              >
                Select all
              </Button>
            </div>
            <div className="space-y-3">
              {columnGroups.map((group) => {
                const groupColumns = hiddenColumns.filter((col) => col.group === group.id)
                if (groupColumns.length === 0) return null

                return (
                  <div key={group.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-medium text-muted-foreground">{group.name}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleGroup(group.id, true)}
                        className="h-auto py-1 px-2 text-xs"
                      >
                        Show all
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {groupColumns.map((column) => (
                        <div key={column.id} className="flex items-center gap-2 p-1 bg-background rounded-md border">
                          <Checkbox checked={column.isVisible} onCheckedChange={() => toggleColumn(column.id)} />
                          <span className="text-sm">{column.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

