import Sidebar from "@/components/custom/Dashboards/Sidebar";
import Navbar from "../components/custom/utils/Navbar";
import Content from "@/components/custom/Dashboards/Content";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar  type="login" />

      <div className="flex w-full h-full bg-blue-50 p-4 gap-5 overflow-hidden">
        <Sidebar type="user" />
        <div className="flex-1 bg-white p-4 rounded-xl shadow-md overflow-y-auto">
          <Content />
        </div>
      </div>
    </div>
  );
}
