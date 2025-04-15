import { useCallback, useState } from "react"
import axios from "axios"
import Backend_Url from "@/config"
import { Briefcase, Building, Calendar, DollarSign, MapPin, User } from "lucide-react"
import { Slide, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

interface JobProps {
  job: {
    _id: string
    title: string
    description: string
    location: string
    jobType: string
    salaryRange: {
      min: number
      max: number
    }
    companyId: {
      _id: string
      name: string
    }
    creatorId: {
      _id: string
      fullName: string
    }
  } | null
}

export default function MainApply({ job }: JobProps) {
  const [activeTab, setActiveTab] = useState<"details" | "apply">("details")
  const [email, setMail] = useState("")
  const [resume, setResume] = useState("")
  const navigate = useNavigate();
  const handle = useCallback( async()=>{
    try{
      const response = await axios.post(`${Backend_Url}/jobs/apply`,{
        jobId:job?._id , resumeUrl:resume},{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
      if(response.status === 200){
        toast.success('Application Successfully Sent', {
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
          navigate("/applied")
      } 
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
  },[email,resume])

  if (!job) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-zinc-100 rounded-md text-gray-500 text-lg">
        <div className="animate-pulse">Loading job details...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full h-full bg-zinc-50 shadow-md p-4 gap-4 rounded-md overflow-y-scroll">
      <div className="bg-gradient-to-r from-blue-500 to-blue-500 w-full h-[200px] rounded-md flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
          <div className="flex items-center justify-center gap-2 text-blue-50">
            <Building className="h-4 w-4" />
            <span>{job.companyId.name}</span>
          </div>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab("details")}
          className={`px-4 py-2 font-medium text-sm transition-all duration-200 ${
            activeTab === "details"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Job Details
        </button>
        <button
          onClick={() => setActiveTab("apply")}
          className={`px-4 py-2 font-medium text-sm transition-all duration-200 ${
            activeTab === "apply"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Apply Now
        </button>
      </div>

      {activeTab === "details" ? (
        <div className="flex flex-col md:flex-row w-full h-full gap-6">

          <div className="flex flex-col w-full md:w-[60%] gap-4">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{job.companyId.name}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="capitalize">{job.jobType}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                  <span>
                    ₹{job.salaryRange.min.toLocaleString()} - ₹{job.salaryRange.max.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  <span>Posted 2 days ago</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Job Description</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Requirements</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Bachelor's degree in relevant field</li>
                  <li>1+ years of experience in similar role</li>
                  <li>Strong communication skills</li>
                  <li>Ability to work in a team environment</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Benefits</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Competitive salary package</li>
                  <li>Health insurance</li>
                  <li>Flexible working hours</li>
                  <li>Professional development opportunities</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full md:w-[40%] gap-4 overflow-hidden">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">About the Company</h3>
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-800 font-bold rounded-full h-12 w-12 flex items-center justify-center mr-3">
                  {job.companyId.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{job.companyId.name}</p>
                  <p className="text-sm text-gray-500">Technology</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                {job.companyId.name} is a leading company in the technology sector, providing innovative solutions to
                clients worldwide.
              </p>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="text-md font-semibold text-gray-700 mb-2">Posted By</h4>
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-500" />
                  <p className="text-gray-600">{job.creatorId.fullName}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Similar Jobs</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 border border-gray-100 rounded-md hover:bg-gray-50 cursor-pointer">
                    <p className="font-medium text-gray-800">UI/UX Designer</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Building className="h-3 w-3 mr-1" />
                      <span>{job.companyId.name}</span>
                      <span className="mx-2">•</span>
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>Bangalore</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm overflow-hidden ">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Apply for {job.title}</h2>
        <div className="mb-6">
            <label  className="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <input type="text" value={email} onChange={(e) => setMail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        </div> 
        <div className="mb-6">
            <label  className="block mb-2 text-sm font-medium text-gray-900">Resume Link</label>
            <input type="text" value={resume} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e)=>{setResume(e.target.value)}} />
        </div>     
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={()=>{handle()}}>Submit</button>
        </div>
      )}
    </div>
  )
}
