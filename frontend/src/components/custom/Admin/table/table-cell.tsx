import type * as React from "react"

import { cn } from "@/lib/utils"

interface TableCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function TableCell({ className, children, ...props }: TableCellProps) {
  return (
    <div className={cn("px-4 py-2 border-b flex-1", className)} role="cell" {...props}>
      {children}
    </div>
  )
}
