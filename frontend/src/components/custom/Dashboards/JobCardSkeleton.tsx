import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; 

export default function JobCardSkeleton() {
  return (
    <Card className="w-full rounded-xl shadow border border-gray-200">
      <CardContent className="p-5 flex items-center gap-6">

        <div className="w-14 h-14 bg-gray-200 rounded-xl shadow-sm flex items-center justify-center text-blue-600 text-2xl shrink-0">
          <Skeleton className="w-8 h-8" /> 
        </div>

        <div className="flex flex-col flex-grow gap-1">
          <div className="flex justify-between items-start">
            <div>
  
              <Skeleton className="h-4 w-32 bg-gray-300" />
 
              <Skeleton className="h-5 w-48 bg-gray-300 mt-1" /> 
            </div>
          </div>

          <Skeleton className="h-4 w-full bg-gray-300 mt-2" /> 

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-2">

            <Skeleton className="h-3 w-20 bg-gray-300" /> 

            <Skeleton className="h-3 w-20 bg-gray-300" />

            <Skeleton className="h-3 w-32 bg-gray-300" /> 
          </div>

          <Skeleton className="h-3 w-20 bg-gray-300 mt-1" /> 

          <Skeleton className="h-3 w-32 bg-gray-300 mt-2" /> 
        </div>

        <Skeleton className="h-8 w-24 bg-gray-300 mt-3 ml-4" />
      </CardContent>
    </Card>
  );
}
