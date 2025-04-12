import Buttons from "./buttons";
import {BriefcaseBusiness, Building2, ContactRound, ShieldUser, SquarePen } from "lucide-react";

export default function AdminDash(){
    return(
        <>
            <div className="flex flex-col gap-4 mt-3">
                <Buttons title="Admins" icon={<ShieldUser />} onClick={() => {}} />
                <Buttons title="Create" icon={<SquarePen />} onClick={() => {}} />
                <Buttons title="Company Jobs" icon={<Building2 />} onClick={() => {}} />
                <Buttons title="Admin Jobs" icon={<BriefcaseBusiness />} onClick={() => {}} />
                <Buttons title="Add Admin" icon={<ContactRound />} onClick={() => {}} />
            </div>
        </>
    )
}