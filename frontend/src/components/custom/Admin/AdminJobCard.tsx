import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import JobCardSkeleton from "../Dashboards/JobCardSkeleton";
import { Briefcase } from "lucide-react";
import Backend_Url from "@/config";
import AdminCard from "./AdminCard";

export default function AdminJobCard(){
    const [content, setContent] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchJobs() {
          try {
            const response = await axios.get(`${Backend_Url}/admin/job`, {
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
          <AdminCard
            key={job._id}
            title={job.title}
            description={job.description}
            location={job.location}
            salaryRange={job.salaryRange}
            jobType={job.jobType}
            postedDate={new Date().toDateString()} 
            company={job.companyId.name}  
            companyLogo={<Briefcase />} 
            onClick={() => {navigate(`/admin/adminjob/${job._id}`)}}
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