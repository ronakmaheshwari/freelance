import { Clock4 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface JobCardProps {
  company: string;
  title: string;
  description: string;
  location: string;
  salaryRange: { min: number; max: number }; 
  jobType: string;
  postedDate: string;
  creator: string;
  companyLogo?: React.ReactNode;
  onClick: () => void;
}

export default function JobCard({
  company,
  title,
  description,
  location,
  salaryRange,
  jobType,
  postedDate,
  creator,
  companyLogo,
  onClick,
}: JobCardProps) {
  return (
    <Card className="w-full rounded-xl shadow border border-gray-200">
      <CardContent className="p-5 flex items-center gap-6">

        <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 text-2xl shrink-0">
          {companyLogo}
        </div>

        <div className="flex flex-col flex-grow gap-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-blue-600 font-medium">{company}</p>
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-2">{description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-2">
            <Badge variant="secondary" className="px-3 py-0.5 text-xs">
              {location}
            </Badge>

            <div className="flex items-center gap-1">
              <Clock4 className="w-4 h-4 text-blue-500" />
              <span>{jobType}</span>
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-600">
              <span>Salary: ₹{salaryRange.min.toLocaleString()} - ₹{salaryRange.max.toLocaleString()}</span>
            </div>

            <span className="ml-auto text-xs text-gray-400">{postedDate}</span>
          </div>

          <p className="mt-2 text-sm text-gray-400">Posted by: {creator}</p>
        </div>

        <Button
          size="sm"
          onClick={onClick}
          className="ml-4 whitespace-nowrap text-sm font-medium"
        >
          Apply Now
        </Button>
      </CardContent>
    </Card>
  );
}
