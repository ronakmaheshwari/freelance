import { ShieldUser } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Backend_Url from "@/config";
import { useParams } from "react-router-dom";
import ApplicationTable from "./ApplicationTable";

interface User {
  userId: {
    _id: string;
    fullName: string;
  };
  resume_url: string;
  status: string;
  appliedAt: string;
  _id: string;
}

interface ApplicationResponse {
  message: string;
  application: {
    _id: string;
    users: User[];
  };
}

export default function ApplicationCard() {
  const { jobId } = useParams();
  const [applicationData, setApplicationData] = useState<ApplicationResponse | null>(null);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${Backend_Url}/admin/application?jobId=${jobId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setApplicationData(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  return (
    <div className="flex flex-col w-full h-full px-4 py-4">
      <div className="flex items-center justify-between gap-3 bg-zinc-100 px-4 py-3 rounded-md">
        <div className="flex items-center gap-3">
          <ShieldUser className="w-6 h-6 text-zinc-700" />
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-800">
            Applications Received
          </h3>
        </div>
      </div>

      {applicationData?.application?.users?.length ? (
        <ApplicationTable users={applicationData.application.users} jobId={jobId || ""} />
      ) : (
        <p className="text-zinc-600 mt-4">No applications found or still loading...</p>
      )}
    </div>
  );
}
