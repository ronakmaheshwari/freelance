import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import JobCardSkeleton from "../Dashboards/JobCardSkeleton";
import { Briefcase } from "lucide-react";
import JobCard from "../Dashboards/JobCard";
import Backend_Url from "@/config";

export default function CJobCard(){
    const [content, setContent] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchJobs() {
          try {
            const response = await axios.get(`${Backend_Url}/admin/`, {
              headers: {
                Authorization: "Bearer " + localStorage.token,
              },
            });
            setContent(response.data.jobListings);
          } catch (err) {
            console.error("Error fetching jobs:", err);
          }
        }
        setTimeout(()=>{
          fetchJobs();
        },)
      }, []);
    return(
        <div className="w-full max-w-8xl flex flex-col gap-4">
      {content.length > 0 ? (
        content.map((job) => (
          <JobCard
            key={job._id}
            title={job.title}
            description={job.description}
            location={job.location}
            salaryRange={job.salaryRange}
            jobType={job.jobType}
            postedDate={new Date().toDateString()} 
            company={job.companyId.name}  
            creator={job.creatorId.fullName} 
            companyLogo={<Briefcase />} 
            onClick={() => {navigate(`/apply/${job._id}`)}}
            type="admin"
          />
        ))
      ) : (
        <div className="w-full h-full flex flex-col gap-4">
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
        </div>
      )}

      </div>
    )
}