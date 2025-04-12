import Backend_Url from "@/config";
import axios from "axios";
import { useState } from "react";
import { Slide, toast } from "react-toastify";

interface ProfileProps {
  fullName: string;
  email: string;
  bio: string;
}

export default function Profile({ fullName, email, bio }: ProfileProps) {
  const [formData, setFormData] = useState({
    firstName: fullName.split(" ")[0] || "",
    lastName: fullName.split(" ")[1] || "",
    email: email,
    phone: "",
    website: "",
    bio: bio,
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.patch(`${Backend_Url}/user/update`, formData,{
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }
      });
      console.log("Form submitted successfully:", response.data);
      toast.success('Updated Profile Successfully', {
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
    } catch (error) {
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 mb-6 md:grid-cols-2">

        <div>
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="John"
            required
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Doe"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="123-45-678"
            required
          />
        </div>

        <div>
          <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Website URL
          </label>
          <input
            type="url"
            id="website"
            value={formData.website}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="flowbite.com"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="john.doe@company.com"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="••••••••"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="••••••••"
          required
        />
      </div>

      <div className="flex items-start mb-6">
        <input
          type="checkbox"
          id="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
          className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600"
          required
        />
        <label htmlFor="termsAccepted" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          I agree with the{" "}
          <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
            terms and conditions
          </a>.
        </label>
      </div>

      <button
        type="submit"
        className="w-full h-16 py-2 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        Submit
      </button>
    </form>
  );
}
