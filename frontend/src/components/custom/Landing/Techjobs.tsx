import Jobcard from "../utils/Jobcard"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Techjobs = () => {
    return (
        <div className="bg-[#F9FAFF]">
            <div className="relative max-w-7xl mx-auto py-20">
                <div className="text-3xl font-semibold">
                    Latest <span className="text-blue-600 underline">tech jobs</span>
                </div>

                <div className=" flex gap-20">
                    {/* Job Cards List */}
                    <div className="w-3/5">
                        <Jobcard />
                    </div>
                    <div className="w-2/5">
                    <Button className="absolute bg-blue-600 py-6 px-10 right-0 top-15">POST A JOB</Button>
                    <div className="font-semibold text-2xl mt-6">Search Jobs</div>
                        <div className="relative w-full max-w-2xl mt-4">
                            <Input
                                type="text"
                                placeholder="Search for jobs"
                                className="w-full pl-12 pr-32 py-6 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 text-gray-700"
                            />
                            <div className="absolute inset-y-0 left-4 flex items-center">
                                <Search className="w-5 h-5 text-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>
                <Button className=" bg-blue-600 py-6 px-10 mt-15">BROWSE ALL JOBS</Button>
            </div>
        </div>
    )
}

export default Techjobs