import { Button } from "@/components/ui/button";
import Inputbox from "@/components/ui/inputbox";
import Backend_Url from "@/config";
import axios from "axios";
import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { Slide, toast } from "react-toastify";

interface ModalType {
  open: boolean;
  onClose: () => void;
}

export default function AddAdminModal({ open, onClose }: ModalType) {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const handle = useCallback(async () => {
    try {
       await axios.post(
        `${Backend_Url}/admin/addadmin`,
        { fullName, email, password, bio },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      toast.success("Admin Registered Successfully", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
        transition: Slide,
      });

      setFullname("");
      setEmail("");
      setPassword("");
      setBio("");
      onClose();
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
        transition: Slide,
      });
    }
  }, [fullName, email, password, bio]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-5">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 rounded-full p-2 hover:bg-zinc-100 transition"
        >
          <X className="w-5 h-5 text-zinc-600" />
        </button>

        <h2 className="text-xl font-semibold text-center text-zinc-800">Add New Admin</h2>

        <Inputbox
          label="Full Name"
          type="text"
          placeholder="Ronak Maheshwari"
          value={fullName}
          onChange={(e) => setFullname(e.target.value)}
        />
        <Inputbox
          label="Email"
          type="email"
          placeholder="ronak@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Inputbox
          label="Password"
          type="password"
          placeholder="Pass@123"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Inputbox
          label="Bio"
          type="text"
          placeholder="SDE-1 at Google"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <Button
          variant="default"
          className="w-full mt-2"
          onClick={handle}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
