import { useState } from "react";
import Inputbox from "@/components/ui/inputbox";
import AdminContentHead from "./AdminCardHead";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Backend_Url from "@/config";
import { Slide, toast } from "react-toastify";

export default function CreateJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [jobType, setJobType] = useState("full-time");
  const [department, setDepartment] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Mid Level");

  const handleSubmit = async() => {
    try{
        await axios.post(`${Backend_Url}/admin/create`, {
            title,
            description,
            location,
            jobType,
            salaryRange: {
              min: minSalary,
              max: maxSalary,
            },
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            }
          });
        toast.success('Job Successfully Created', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Slide,
            });
    }catch(error){
        toast.error(`${error}`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        })
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-6 gap-4 bg-white">
      <AdminContentHead title="Create New Job Posting" subtitle="Fill in the details to create a new job posting for your company" />

      <div className="text-lg font-semibold text-zinc-800">Basic Information</div>

      <Inputbox
        label="Job Title*"
        type="text"
        placeholder="e.g. Senior AI/ML Engineer"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Inputbox
          label="Department"
          type="text"
          placeholder="e.g. Engineering"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <Inputbox
          label="Location*"
          type="text"
          placeholder="e.g. San Francisco, Remote"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="text-lg font-semibold text-zinc-800">Job Details</div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-700">Job Description*</label>
        <textarea
          placeholder="Describe the job responsibilities, skills, and expectations..."
          className="w-full min-h-[120px] px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700">Job Type</label>
          <select
            className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700">Experience Level</label>
          <select
            className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-700">Salary Range</label>
        <div className="grid grid-cols-2 gap-4">
          <Inputbox
            label="$ Min"
            type="number"
            placeholder="50000"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
          />
          <Inputbox
            label="$ Max"
            type="number"
            placeholder="100000"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
          />
        </div>
      </div>

      <div className="pt-4">
        <Button variant="default" size="default" onClick={handleSubmit}>
          Submit Job
        </Button>
      </div>
    </div>
  );
}
