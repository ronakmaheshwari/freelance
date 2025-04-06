import { Button } from "@/components/ui/button";
import Inputbox from "@/components/ui/inputbox";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Backend_Url from "@/config";
import { Slide, toast } from "react-toastify";

interface SignupCardProps {
  type: "signup" | "signin";
}

export default function SignupCard({ type }: SignupCardProps) {
  const [isHuman, setIsHuman] = useState(false);
  const [fullname , setFullname] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [bio , setBio] = useState("");
  const navigate = useNavigate();

  const sendSignup = useCallback(async ()=>{
    try{
      const response = await axios.post(`${Backend_Url}/user/signup`,{fullName:fullname, email, password, bio})
      if(response.status === 200){
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/jobs");
      }
      toast.success('Signup Successful', {
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
    }catch(error){
      toast.error(`${error}`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Slide,
        })
    }
  },[fullname, email, password, bio])

  const sendSignin = useCallback(async ()=>{
    try{
      const response = await axios.post(`${Backend_Url}/user/signin`,{email, password})
      if(response.status === 200){
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/jobs");
      }
      toast.success('Signin Successfull', {
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
    }catch(error){
      toast.error(`${error}`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Slide,
        })
    }
  },[email, password])

  const heading = type === "signup" ? "Create an Account" : "Sign in to your Account";
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
        {type==="signup" ? <Inputbox
          label="Full Name"
          type="text"
          value={fullname}
          placeholder="Ronak Maheshwari"
          onChange={(e) => {setFullname(e.target.value)}}
        /> : null}
        <Inputbox
          label="Email"
          type="text"
          value={email}
          placeholder="ronak@gmail.com"
          onChange={(e) => {setEmail(e.target.value)}}
        />
        <Inputbox
          label="Password"
          type="password"
          value={password}
          placeholder="Pass@123"
          onChange={(e) => {setPassword(e.target.value)}}
        />
        {type === "signup" ? <Inputbox
          label="Bio"
          type="text"
          value={bio}
          placeholder="Full Stack Developer"
          onChange={(e) => {setBio(e.target.value)}}
        /> : null}

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
            onClick={type==="signup" ? sendSignup : sendSignin}
          >
            {type === "signup" ? "Sign Up" : "Sign In"}
          </Button>
        </div>

        <div className="w-full flex justify-center items-center gap-1 ">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {type === "signup" ? "Already have an account?" : "Don't have an account?"}
          </p>
          <button
            onClick={() => navigate(type === "signup" ? "/signin" : "/signup")}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            {type === "signup" ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
