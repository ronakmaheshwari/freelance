import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-12">
        
        {/* Newsletter Section - Expands More */}
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-2xl font-semibold text-blue-700">
            Find your next great opportunity!
          </h2>
          <p className="text-gray-600 mt-2 max-w-md">
            Join our newsletter and receive the best job openings every week in your inbox.
          </p>
          <div className="mt-4 flex items-center bg-gray-100 rounded-lg relative shadow-lg max-w-lg">
            <Input type="email" placeholder="Enter your email" className="flex-1 px-6 py-6 bg-transparent border-none focus:ring-0" />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-6 absolute right-0">Subscribe</Button>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex-1 grid grid-cols-2 gap-12">
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Menu</h3>
            <ul className="space-y-2 text-gray-600">
              {["Home Sales", "Home V1", "Home V2", "About Us", "Companies", "Job Single"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-500">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Utility Pages */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Utility Pages</h3>
            <ul className="space-y-2 text-gray-600">
              {["Password Protected", "404 Not Found", "Styleguide", "Licenses", "Start Here"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-500">{item}</a>
                </li>
              ))}
              <li>
                <a href="#" className="text-blue-700 font-semibold underline hover:text-blue-500">
                  More webflow templates
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Categories</h3>
            <ul className="grid grid-cols-2 gap-2 text-gray-600">
              {["Development", "Design", "Marketing", "Business", "Support"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-500">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-500"><Facebook size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-blue-500"><Twitter size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-blue-500"><Instagram size={20} /></a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;