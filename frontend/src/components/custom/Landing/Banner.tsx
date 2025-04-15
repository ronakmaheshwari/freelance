import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();
    return (
        <section className="relative bg-blue-800 py-30 px-6 text-white text-center shadow-lg overflow-hidden">
            {/* Mountain Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute bottom-[-5rem] left-0 w-full h-3/4 bg-white opacity-20 skew-y-[-10deg]"></div>
            </div>

            <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left Text Section */}
                <div className="text-left w-3/7">
                    <h2 className="text-5xl font-bold mb-2">Grow Your Team with Top Talent!</h2>
                    <p className="text-xl mt-10">Register your company and start hiring from a pool of skilled professionals.</p>
                </div>

                {/* Input Field + Button */}
                <div className="w-full relative md:w-1/2 flex items-center bg-white rounded-full shadow-md">
                    <Input
                        type="email"
                        placeholder="Enter your company email"
                        className="flex-1 px-4 py-8 text-gray-800 focus:outline-none rounded-full border-none"
                    />
                    <Button className="absolute right-0 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-8 rounded-full shadow-lg" onClick={()=>{navigate("/admin/signup")}}>
                        Register
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Banner
