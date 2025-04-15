import { ReactNode } from "react";

export default function AdminWrapper({children}:{children: ReactNode}){
    return(
        <div className="flex flex-col w-full h-full bg-zinc-100 shadow-md p-4 gap-4 rounded-md overflow-y-scroll">
            {children}
        </div>
    )
}