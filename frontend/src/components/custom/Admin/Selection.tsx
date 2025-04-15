import Sidebar from "../Dashboards/Sidebar";
import Navbar from "../utils/Navbar";
import AdminWrapper from "./AdminWrapper";
import ApplicationCard from "./SelectionCard";

export default function SelectionPage(){
    return(
        <div className="flex flex-col w-screen h-screen p-2">
            <Navbar  type="login"/>
            <div className="flex w-full h-full overflow-hidden p-3 gap-4">
                <Sidebar type="admin" />
                <AdminWrapper children={<ApplicationCard />} />
            </div>
        </div>
    )
}