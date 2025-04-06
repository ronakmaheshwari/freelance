import Techjobs from "@/components/custom/Landing/Techjobs"
import Hero from "../components/custom/Landing/Hero"
import Navbar from "../components/custom/utils/Navbar"
import Testimonial from "@/components/custom/Landing/Testimonial"
import JobBoardSection from "@/components/custom/Landing/JobBoardSelection"
import Banner from "../components/custom/Landing/Banner"
import Footer from "@/components/custom/utils/Footer"


const Landing = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Techjobs/>
        <Banner/>
        <JobBoardSection/>
        <Testimonial/>
        <Footer/>
    </div>
  )
}

export default Landing