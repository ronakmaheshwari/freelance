import type * as React from "react"
import { Users } from "lucide-react"

import { cn } from "@/lib/utils"

interface TableEmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
}

export function TableEmptyState({ className, message = "No data available", ...props }: TableEmptyStateProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center p-8 text-zinc-500 text-center", className)}
      {...props}
    >
      <Users className="h-12 w-12 mb-3 opacity-20" />
      <p>{message}</p>
    </div>
  )
}
