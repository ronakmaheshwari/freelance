import { Plus, ShieldUser } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Backend_Url from "@/config";
import AdminTable from "./Admintable";
import AddAdminModal from "./AddAdminModal"; 
import { Button } from "@/components/ui/button";

interface Admin {
  _id: string;
  fullName: string;
}

interface AdminResponse {
  message: string;
  admins: Admin[];
}

export default function AllAdmin() {
  const [adminData, setAdminData] = useState<AdminResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${Backend_Url}/admin/admins`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setAdminData(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchAdmins(); 
  };

  return (
    <div className="flex flex-col w-full h-full px-4 py-4">

      <div className="flex items-center justify-between gap-3 bg-zinc-100 px-4 py-3 rounded-md">
        <div className="flex items-center gap-3">
          <ShieldUser className="w-6 h-6 text-zinc-700" />
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-800">
            All Admins
          </h3>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-200 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Add Admin
        </Button>
      </div>

      {adminData?.admins ? (
        <AdminTable admins={adminData.admins} />
      ) : (
        <p className="text-zinc-600 mt-4">Loading admins...</p>
      )}

      {isModalOpen && <AddAdminModal open={isModalOpen} onClose={handleModalClose} />}
    </div>
  );
}
