
import type * as React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

interface TableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function TableHeader({ className, children, ...props }: TableHeaderProps) {
  return (
    <div className={cn("bg-zinc-100 text-zinc-700 uppercase text-sm", className)} role="rowgroup" {...props}>
      {children}
    </div>
  )
}

interface SortableHeaderCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  isSorted?: boolean
  sortDirection?: "asc" | "desc" | null
  onSort?: () => void
}

export function SortableHeaderCell({
  className,
  children,
  isSorted = false,
  sortDirection = null,
  onSort,
  ...props
}: SortableHeaderCellProps) {
  return (
    <div
      className={cn("px-4 py-2 border-b flex-1 font-semibold flex items-center gap-1 cursor-pointer", className)}
      role="columnheader"
      onClick={onSort}
      {...props}
    >
      <span>{children}</span>
      {isSorted && (
        <span className="inline-flex items-center">
          {sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      )}
    </div>
  )
}
