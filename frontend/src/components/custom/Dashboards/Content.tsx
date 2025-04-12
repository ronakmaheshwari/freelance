import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Backend_Url from "@/config";
import JobCard from "./JobCard";
import { Briefcase } from "lucide-react"; 
import JobCardSkeleton from "./JobCardSkeleton";

export default function Content() {
  const navigate = useNavigate();
  const [content, setContent] = useState<any[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await axios.get(`${Backend_Url}/jobs/`, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        });
        setContent(response.data.jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    }
    setTimeout(()=>{
      fetchJobs();
    },)
  }, []);

  return (
    <div className="w-full h-full bg-zinc-50 shadow-md rounded-xl p-6 flex justify-center items-start overflow-y-scroll">
      <div className="w-full max-w-4xl flex flex-col gap-4">
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
            onClick={() => navigate(`/apply/${job._id}`)}
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
    </div>
  );
}
