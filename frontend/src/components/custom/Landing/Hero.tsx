import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";


const Hero = () => {
    return (
        <div className="relative h-[80vh] flex flex-col items-center justify-center gap-10 px-6 text-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center z-[-10]"
                style={{ backgroundImage: "url('/images/Herobg.png')" }}

            />

            {/* Overlay (optional for better readability) */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-30 z-[-5]" /> */}

            {/* Hero Content */}
            <div className="flex flex-col gap-5">
                <div className="text-5xl font-semibold flex flex-col gap-5 ">
                    <div>
                        <span className="text-blue-600 underline">Tech Jobs</span> for Developers,
                    </div>
                    <div>Designers, and Marketers</div>
                </div>

                <div className="flex flex-col text-lg mt-4">
                    <div>Jobs is a curated job board of the best jobs for</div>
                    <div>developers, designers, and marketers in the tech industry.</div>
                </div>
            </div>


            {/* Input Box */}
            <div className="relative w-full max-w-2xl mt-6">
                <Input
                    type="text"
                    placeholder="Search for jobs"
                    className="w-full pl-12 pr-32 py-6 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
                <div className="absolute inset-y-0 left-4 flex items-center">
                    <Search className="w-5 h-5 text-gray-500" />
                </div>
                <Button className="absolute inset-y-1.5 right-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition">
                    SEARCH JOB
                </Button>
            </div>
        </div>
    );
};

export default Hero;
