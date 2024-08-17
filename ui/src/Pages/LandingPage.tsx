import Navbar from "@/components/Navbar/Navbar"
import Sidebar from "@/components/Sidebar/Sidebar"

const LandingPage = () => {
    return(
    <>
        <Navbar/>
        <div className="mt-20 flex">
            <Sidebar/>
            Landing Page
        </div>
    </>
    )
}

export default LandingPage