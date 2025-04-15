import { Button } from "@/components/ui/button";
import Inputbox from "@/components/ui/inputbox";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Backend_Url from "@/config";
import { Slide, toast } from "react-toastify";

interface SignupCardProps {
  type: "signup" | "signin";
}

export default function AdminSignupCard({ type }: SignupCardProps) {
  const [isHuman, setIsHuman] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [companyId, setCompanyId] = useState("");
  const navigate = useNavigate();

  const sendSignup = useCallback(async () => {
    try {
      const response = await axios.post(`${Backend_Url}/admin/signup`, {
        fullName: fullname,
        email,
        password,
        bio,
        name,
        description,
        web_url: link,
      });

      if (response.status === 200) {
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/admin/dashboard");

        toast.success("Signup Successful", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Signup Failed", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  }, [fullname, email, password, bio, name, description, link, navigate]);

  const sendSignin = useCallback(async () => {
    try {
      const response = await axios.post(`${Backend_Url}/admin/signin`, {
        email,
        password,
        companyId,
      });

      if (response.status === 200) {
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/admin/dashboard");

        toast.success("Signin Successful", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Signin Failed", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  }, [email, password, companyId, navigate]);

  const heading = type === "signup" ? "Partner Your Company" : "Sign in to your Company";
  const subtext =
    type === "signup"
      ? "Enter your details below to create your account"
      : "Enter your credentials below to sign in";

  return (
    <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white px-6 py-8 sm:px-8 rounded-2xl shadow-xl space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">{heading}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{subtext}</p>
      </div>

      <div className="space-y-5">
        {type === "signup" && (
          <Inputbox
            label="Full Name"
            type="text"
            value={fullname}
            placeholder="Ronak Maheshwari"
            onChange={(e) => setFullname(e.target.value)}
          />
        )}

        <Inputbox
          label="Email"
          type="text"
          value={email}
          placeholder="ronak@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Inputbox
          label="Password"
          type="password"
          value={password}
          placeholder="Pass@123"
          onChange={(e) => setPassword(e.target.value)}
        />

        {type === "signup" && (
          <>
            <Inputbox
              label="Bio"
              type="text"
              value={bio}
              placeholder="Full Stack Developer"
              onChange={(e) => setBio(e.target.value)}
            />
            <Inputbox
              label="Company Name"
              type="text"
              value={name}
              placeholder="Google"
              onChange={(e) => setName(e.target.value)}
            />
            <Inputbox
              label="Company Description"
              type="text"
              value={description}
              placeholder="We are Leading Web Search Engine"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Inputbox
              label="Company Link"
              type="text"
              value={link}
              placeholder="google.com"
              onChange={(e) => setLink(e.target.value)}
            />
          </>
        )}

        {type !== "signup" && (
          <Inputbox
            label="Company Id"
            type="text"
            value={companyId}
            placeholder="google.com"
            onChange={(e) => setCompanyId(e.target.value)}
          />
        )}

        <div className="space-y-4 pt-2">
          <div className="flex gap-3 rounded-lg border border-gray-200 dark:border-zinc-700 p-4 bg-gray-50 dark:bg-zinc-800">
            <input
              id="robot-check"
              type="checkbox"
              checked={isHuman}
              onChange={() => setIsHuman(!isHuman)}
              className="mt-1 w-4 h-4 text-blue-600 bg-white dark:bg-zinc-900 border-gray-300 dark:border-zinc-600 rounded-sm focus:ring-2 focus:ring-blue-500"
            />
            <div className="space-y-1">
              <label
                htmlFor="robot-check"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                I am not a robot
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By checking this box, you agree to our{" "}
                <a href="#" className="text-blue-600 dark:text-blue-400 underline">
                  terms of service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 dark:text-blue-400 underline">
                  privacy policy
                </a>
                .
              </p>
            </div>
          </div>

          <Button
            variant="default"
            size="lg"
            className="w-full"
            disabled={!isHuman}
            onClick={type === "signup" ? sendSignup : sendSignin}
          >
            {type === "signup" ? "Sign Up" : "Sign In"}
          </Button>
        </div>

        <div className="w-full flex justify-center items-center gap-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {type === "signup" ? "Already have an account?" : "Don't have an account?"}
          </p>
          <button
            onClick={() =>
              navigate(type === "signup" ? "/admin/signin" : "/admin/signup")
            }
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            {type === "signup" ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
