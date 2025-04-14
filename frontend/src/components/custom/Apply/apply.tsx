import Backend_Url from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../utils/Navbar";
import Sidebar from "../Dashboards/Sidebar";
import MainApply from "./MainApply";

// Define a proper JobDetails type
interface JobDetails {
    _id: string;
    title: string;
    description: string;
    location: string;
    jobType: string;
    salaryRange: {
        min: number;
        max: number;
    };
    companyId: {
        _id: string;
        name: string;
    };
    creatorId: {
        _id: string;
        fullName: string;
    };
}

export default function Apply() {
    const { jobId } = useParams<{ jobId: string }>(); // Make sure 'id' is typed as a string
    console.log(jobId); // Check if 'id' is being correctly passed

    const [details, setDetails] = useState<JobDetails | null>(null); // Correct type for details

    useEffect(() => {
        async function handle() {
            if (!jobId) {
                console.log("ID not found");
                return;
            }

            try {
                const response = await axios.get(`${Backend_Url}/jobs/?filter=${jobId}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                console.log(response.data); // To inspect the full API response

                // Assuming the API returns an array of jobs, set the first job as details
                if (response.data.jobs && response.data.jobs.length > 0) {
                    setDetails(response.data.jobs[0]);
                } else {
                    console.log("No job found.");
                }
            } catch (error) {
                console.log(error);
            }
        }

        handle();
    }, [jobId]); // Make sure the effect runs when 'id' changes

    return (
        <div className="flex flex-col w-screen h-screen p-2">
            <Navbar  type="login"/>
            <div className="flex w-full h-full overflow-hidden p-4 gap-2">
                <Sidebar type="user" />
                <MainApply job={details} />
            </div>
        </div>
    );
}
