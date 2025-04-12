import { useEffect, useState } from "react";
import axios from "axios";
import Backend_Url from "@/config";
import Profile from "./Profile";

interface UserDetails {
  fullName: string;
  email: string;
  bio: string;
}

export default function UpdatedProfile() {
  const [content, setContent] = useState<UserDetails | null>(null); 

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await axios.get(`${Backend_Url}/user/getdetail`, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        });
        setContent(response.data.detail); 
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    }

    fetchUserDetails();
  }, []);


  return (
    <div className="w-full h-full bg-zinc-50 shadow-md rounded-xl p-16 flex justify-center items-start ">
      <div className="w-full flex flex-col gap-4 justify-center">
        {content && (
          <Profile
            fullName={content.fullName}
            email={content.email}
            bio={content.bio}
          />
        )}
      </div>
    </div>
  );
}
