import { useEffect, useState } from "react";
import axios from "axios";
import Backend_Url from "@/config";
import JobCardSkeleton from "./JobCardSkeleton";
import AppliedCard from "./AppliedCard";

export default function AppliedContent() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await axios.get(`${Backend_Url}/user/applied`, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        });
        setApplications(response.data.applications || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return (
    <div className="w-full h-full bg-zinc-50 shadow-md rounded-xl p-6 flex justify-center items-start overflow-y-scroll">
      <div className="w-full max-w-4xl flex flex-col gap-4">
        {loading ? (
          Array(5).fill(0).map((_, idx) => <JobCardSkeleton key={idx} />)
        ) : applications.length > 0 ? (
          applications.map((app) => (
            <AppliedCard
              key={app._id}
              jobId={app.jobId}
              resumeUrl={app.users[0]?.resume_url || ""}
              status={app.users[0]?.status || "pending"}
              appliedAt={app.users[0]?.appliedAt || ""}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg font-semibold">No job applications found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
