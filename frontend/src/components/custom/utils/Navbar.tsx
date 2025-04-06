import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate =useNavigate();
  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left - Brand Logo */}
        <div className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-blue-600" />
          <span className="text-2xl font-semibold text-gray-900">Jobs</span>
        </div>

        {/* Center - Navigation Links */}
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            <NavigationMenuItem className="flex space-x-6">
            <NavigationMenuLink className="font-medium text-blue-600">
                <Link to="/">Home</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className="font-medium">
                <Link to="/jobs">Jobs</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Categories Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-md">Categories</NavigationMenuTrigger>
              <NavigationMenuContent className="p-6 grid grid-cols-2 gap-6 min-w-[400px] bg-white shadow-lg rounded-lg">
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-gray-600">Development</h4>
                  <NavigationMenuLink className="block px-3 py-2 hover:bg-gray-100 rounded">
                    Web Development
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block px-3 py-2 hover:bg-gray-100 rounded">
                    Mobile Apps
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block px-3 py-2 hover:bg-gray-100 rounded">
                    API Integration
                  </NavigationMenuLink>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-gray-600">Design</h4>
                  <NavigationMenuLink className="block px-3 py-2 hover:bg-gray-100 rounded">
                    UI/UX Design
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block px-3 py-2 hover:bg-gray-100 rounded">
                    Prototyping
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block px-3 py-2 hover:bg-gray-100 rounded">
                    Brand Identity
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* About Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-md">About</NavigationMenuTrigger>
              <NavigationMenuContent className="p-6 grid grid-cols-2 gap-6 min-w-[400px] bg-white shadow-lg rounded-lg">
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-gray-600">Company</h4>
                  <NavigationMenuLink className="block px-3 py-2 hover:bg-gray-100 rounded">
                    Our Story
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block px-3 py-2 hover:bg-gray-100 rounded">
                    Mission & Vision
                  </NavigationMenuLink>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-gray-600">Team</h4>
                  <NavigationMenuLink className="block px-3 py-2 hover:bg-gray-100 rounded">
                    Meet the Team
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block px-3 py-2 hover:bg-gray-100 rounded">
                    Careers
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right - Buttons*/}
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={()=>{navigate('/signin')}}>
            Log in
          </Button>
          <Button className="bg-blue-600 text-white shadow-lg hover:bg-blue-700" onClick={()=>{navigate('/signup')}}>
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
