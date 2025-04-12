import AdminDash from "./AdminDash";
import UserDash from "./UserDash";

type Schema = "user" | "admin";

export default function Sidebar({ type }: { type: Schema }) {
  return (
    <div className="flex flex-col justify-between w-[20%] h-full p-4 bg-zinc-50 shadow-md rounded-md inset-shadow-2xs">
      {type === "user" ? <UserDash/> : <AdminDash/> }
    </div>
  );
}
