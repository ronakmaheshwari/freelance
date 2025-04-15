
import Sidebar from "../Dashboards/Sidebar";
import Navbar from "../utils/Navbar";
import AllAdmin from "./AddAdmins";
import AdminWrapper from "./AdminWrapper";

export default function AdminPage(){
    return(
        <div className="flex flex-col w-screen h-screen p-2">
            <Navbar  type="login"/>
            <div className="flex w-full h-full overflow-hidden p-3 gap-4">
                <Sidebar type="admin" />
                <AdminWrapper children={<AllAdmin />} />
            </div>
        </div>
    )
}