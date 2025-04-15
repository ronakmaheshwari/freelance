import type * as React from "react"

import { cn } from "@/lib/utils"

interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  caption?: string
}

export function Table({ className, children, caption, ...props }: TableProps) {
  return (
    <div
      className={cn("w-full overflow-x-auto rounded-lg shadow-md bg-white", className)}
      {...props}
      role="table"
      aria-label={caption}
    >
      {caption && <div className="sr-only">{caption}</div>}
      <div className="min-w-full table-auto text-left border border-zinc-200">{children}</div>
    </div>
  )
}
