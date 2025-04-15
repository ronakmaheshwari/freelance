import { useNavigate } from "react-router-dom";
import Buttons from "./buttons";
import {BriefcaseBusiness, Building2, ShieldUser, SquarePen } from "lucide-react";

export default function AdminDash(){
    const navigate = useNavigate();
    return(
        <>
            <div className="flex flex-col gap-4 mt-3">
                <Buttons title="Admins" icon={<ShieldUser />} onClick={() => navigate("/admin/dashboard")} />
                <Buttons title="Create" icon={<SquarePen />} onClick={() => navigate("/admin/create")} />
                <Buttons title="Company Jobs" icon={<Building2 />} onClick={() => navigate("/admin/companyjob")} />
                <Buttons title="Admin Jobs" icon={<BriefcaseBusiness />} onClick={() => navigate("/admin/adminjob")}/>
            </div>
        </>
    )
}