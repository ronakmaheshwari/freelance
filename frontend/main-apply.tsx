import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Briefcase, IndianRupee } from "lucide-react"

// Sample job data from the provided JSON
const jobData = {
  message: "Jobs fetched successfully.",
  jobs: [
    {
      salaryRange: {
        min: 8000,
        max: 15000,
      },
      _id: "67f0e6b9b24e898175660bc4",
      companyId: {
        _id: "67f0e3db3a936a70ee1c98ba",
        name: "NextGen Tech",
      },
      creatorId: {
        _id: "67f0e3db3a936a70ee1c98b8",
        fullName: "Alice Smith",
      },
      title: "Graphic Design Intern",
      description: "Create visual assets for social media and product pages.",
      location: "Chennai, India",
      jobType: "internship",
    },
  ],
}

export default function MainApply() {
  const job = jobData.jobs[0]

  return (
    <div className="flex flex-col w-full h-full bg-zinc-50 shadow-md p-4 gap-4 rounded-md">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-full h-[200px] rounded-lg flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white">Job Application</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Building2 className="h-4 w-4 mr-1" />
                  {job.companyId.name}
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <IndianRupee className="h-4 w-4 mr-1" />₹{job.salaryRange.min.toLocaleString()} - ₹
              {job.salaryRange.max.toLocaleString()} per month
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              <p className="text-muted-foreground">{job.description}</p>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-2">About the Company</h3>
              <p className="text-muted-foreground">
                {job.companyId.name} is a leading company in the technology sector, providing innovative solutions to
                clients worldwide.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">Posted by: {job.creatorId.fullName}</div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Apply Now</CardTitle>
            <CardDescription>Fill out the form to apply for this position</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input id="email" type="email" className="w-full p-2 border rounded-md" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="resume" className="text-sm font-medium">
                Resume/CV
              </label>
              <input id="resume" type="file" className="w-full p-2 border rounded-md" />
            </div>
            <div className="space-y-2">
              <label htmlFor="cover" className="text-sm font-medium">
                Cover Letter (Optional)
              </label>
              <textarea
                id="cover"
                className="w-full p-2 border rounded-md h-24"
                placeholder="Tell us why you're a good fit for this position"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Submit Application</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Similar Jobs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">UI/UX Designer</CardTitle>
                <CardDescription>NextGen Tech</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  Bangalore, India
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="h-3 w-3 mr-1" />
                  Full-time
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
