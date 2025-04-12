import { useNavigate } from "react-router-dom";
import Buttons from "./buttons";
import { Briefcase, FileCheck2, UserCog } from "lucide-react";

export default function UserDash(){
    const navigate = useNavigate();
    return(
        <>
            <div className="flex flex-col gap-4 mt-3">
                <Buttons title="Jobs" icon={<Briefcase />} onClick={() => {navigate("/dashboard")}} />
                <Buttons title="Applied" icon={<FileCheck2 />} onClick={() => {navigate("/applied")}} />
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Buttons title="Update Profile" icon={<UserCog />} onClick={() => {navigate("/update")}} />
            </div>
        </>
    )
}