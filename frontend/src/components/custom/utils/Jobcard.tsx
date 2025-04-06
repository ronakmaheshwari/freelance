import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Clock4 } from "lucide-react";

// Job listings data
const jobListings = [
  {
    id: 1,
    company: "Facebook",
    companyLogo: FaFacebookF,
    title: "Social Media Manager",
    category: "Marketing",
    jobType: "Full Time",
    postedDate: "April 7, 2021",
    isFeatured: true,
  },
  {
    id: 2,
    company: "LinkedIn",
    companyLogo: FaLinkedinIn,
    title: "Software Engineer",
    category: "Engineering",
    jobType: "Remote",
    postedDate: "March 15, 2022",
    isFeatured: false,
  },
  {
    id: 3,
    company: "Instagram",
    companyLogo: FaInstagram,
    title: "Graphic Designer",
    category: "Design",
    jobType: "Part Time",
    postedDate: "June 10, 2023",
    isFeatured: true,
  },
  {
    id: 4,
    company: "Google",
    companyLogo: FcGoogle,
    title: "AI Research Scientist",
    category: "Artificial Intelligence",
    jobType: "Full Time",
    postedDate: "January 5, 2024",
    isFeatured: true,
  },
];

const Jobcard = () => {
  return (
    <div className="flex flex-col gap-5 mt-10">
      {jobListings.map((job) => {
        const Logo = job.companyLogo;
        return (
          <Card key={job.id} className="relative shadow-lg border border-gray-100">
            <CardContent className="px-6 flex items-start gap-4 ">
              {/* Company Logo */}
              <div className="text-blue-500 text-3xl w-20 h-20 shadow-lg rounded-2xl flex justify-center items-center ">
                <Logo />
              </div>

              {/* Job Info */}
              <div className="flex-grow">
                <p className="text-md text-blue-600 font-semibold">{job.company}</p>
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <div className="flex items-center gap-10 mt-3">
                  <Badge variant="secondary" className="py-1 px-4 text-sm">{job.category}</Badge>
                  <div className="flex items-center gap-2 text-md text-gray-500 mt-1">
                    <Clock4 className="text-blue-600" />
                    <span>{job.jobType}</span>
                  </div>
                </div>

                <p className="absolute right-5 bottom-5 text-xs text-gray-400 mt-1">
                   {job.postedDate}
                </p>
              </div>

              {/* Featured Badge */}
              {job.isFeatured && (
                <Badge  variant="secondary" className="bg-yellow-400 text-white py-1 px-4">FEATURED</Badge>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Jobcard;
