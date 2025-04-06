import AdminSignupCard from "@/components/custom/CompanySignup/SignupCard";

export default function CompanySignup(){
     return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <AdminSignupCard type="signup" />
          </div>
        );
}