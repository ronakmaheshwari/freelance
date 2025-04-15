import type * as React from "react"

import { cn } from "@/lib/utils"

interface TableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function TableRow({ className, children, ...props }: TableRowProps) {
  return (
    <div className={cn("flex hover:bg-zinc-50 transition-colors", className)} role="row" {...props}>
      {children}
    </div>
  )
}
