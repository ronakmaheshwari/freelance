import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import Backend_Url from "@/config";

interface Props {
  jobId: string;
  users: {
    userId: { _id: string; fullName: string };
    resume_url: string;
    status: string;
    appliedAt: string;
    _id: string;
  }[];
}

export default function ApplicationTable({ users, jobId }: Props) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleStatusUpdate = async (
    applicationId: string,
    userId: string,
    newStatus: string
  ) => {
    try {
      setLoading(applicationId);
      await axios.post(
        `${Backend_Url}/admin/selection`,
        {
          jobId,
          userId,
          status: newStatus,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      toast.success(`Application ${newStatus}`, {
        position: "bottom-right",
        autoClose: 1500,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Error updating status", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "dark",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 rounded-md">
        <thead className="bg-zinc-200 text-zinc-700">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Resume</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Applied At</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="px-4 py-2 border">{user.userId.fullName}</td>
              <td className="px-4 py-2 border">
                <a
                  href={user.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              </td>
              <td className="px-4 py-2 border capitalize">{user.status}</td>
              <td className="px-4 py-2 border">
                {new Date(user.appliedAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border flex flex-col gap-2 items-center">
                <button
                  onClick={() =>
                    handleStatusUpdate(user._id, user.userId._id, "accepted")
                  }
                  disabled={loading === user._id}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 disabled:opacity-50"
                >
                  {loading === user._id ? "Updating..." : "Accept"}
                </button>
                <button
                  onClick={() =>
                    handleStatusUpdate(user._id, user.userId._id, "rejected")
                  }
                  disabled={loading === user._id}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 disabled:opacity-50"
                >
                  {loading === user._id ? "Updating..." : "Reject"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
