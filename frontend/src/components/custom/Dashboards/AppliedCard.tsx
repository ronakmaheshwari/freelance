import type React from "react"
import { Calendar, MapPin, Briefcase, FileText } from "lucide-react"

interface JobCardProps {
  jobId?: {
    _id: string
    title: string
    location: string
    jobType: string
  }
  resumeUrl?: string
  status?: string
  appliedAt?: string
}

const Badge: React.FC<{
  variant?: "default" | "destructive" | "secondary"
  className?: string
  children: React.ReactNode
}> = ({ variant = "default", className = "", children }) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"

  const variantClasses = {
    default: "bg-green-100 text-green-800",
    destructive: "bg-red-100 text-red-800",
    secondary: "bg-gray-100 text-gray-800",
  }

  return <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>{children}</span>
}


const Button: React.FC<{
  variant?: "outline" | "default"
  size?: "sm" | "md" | "lg"
  className?: string
  children: React.ReactNode
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
  "aria-label"?: string
}> = ({
  variant = "default",
  size = "md",
  className = "",
  children,
  onClick,
  href,
  target,
  rel,
  "aria-label": ariaLabel,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50"

  const variantClasses = {
    default: "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800",
  }

  const sizeClasses = {
    sm: "h-8 rounded-md px-3 text-xs",
    md: "h-10 rounded-md px-4 py-2",
    lg: "h-11 rounded-md px-8",
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    return (
      <a href={href} target={target} rel={rel} aria-label={ariaLabel} className={classes} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  )
}

const AppliedCard: React.FC<JobCardProps> = ({
  jobId,
  resumeUrl = "#",
  status = "pending",
  appliedAt = new Date().toISOString(),
}) => {
  if (!jobId) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">Job information unavailable</p>
      </div>
    )
  }

  const formattedDate = new Date(appliedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const getBadgeVariant = () => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "default"
      case "rejected":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{jobId.title}</h2>
        <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{jobId.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            <span>{jobId.jobType}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Applied: {formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <Badge variant={getBadgeVariant()} className="capitalize">
          {status}
        </Badge>

        <Button
          variant="outline"
          size="sm"
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Resume"
          className="flex items-center gap-1"
        >
          <FileText className="h-4 w-4" />
          View Resume
        </Button>
      </div>
    </div>
  )
}

export default AppliedCard
