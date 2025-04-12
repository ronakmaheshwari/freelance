import type React from "react";
import { Calendar, MapPin, Briefcase, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  jobId?: {
    _id: string;
    title: string;
    location: string;
    jobType: string;
  };
  resumeUrl?: string;
  status?: string;
  appliedAt?: string;
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
    );
  }

  const formattedDate = new Date(appliedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });


  const getBadgeVariant = () => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "secondary"; 
    }
  };

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

        <Button variant="outline" size="sm" asChild>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Resume"
            className="flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            View Resume
          </a>
        </Button>
      </div>
    </div>
  );
};

export default AppliedCard;
