import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaFacebookF, FaTwitter, FaInstagram, FaFacebookMessenger } from "react-icons/fa";

const companies = [
    {
        id: 1,
        name: "Facebook",
        icon: <FaFacebookF className="text-blue-600 text-4xl" />,
        description: "Lorem ipsum dolor sit elton amet, consectetur lorem it adipiscing elit.",
        link: "#",
    },
    {
        id: 2,
        name: "Twitter",
        icon: <FaTwitter className="text-blue-400 text-4xl" />,
        description: "Lorem ipsum dolor sit elton amet, consectetur lorem it adipiscing elit.",
        link: "#",
    },
    {
        id: 3,
        name: "Instagram",
        icon: <FaInstagram className="text-pink-500 text-4xl" />,
        description: "Lorem ipsum dolor sit elton amet, consectetur lorem it adipiscing elit.",
        link: "#",
    },
    {
        id: 4,
        name: "Messenger",
        icon: <FaFacebookMessenger className="text-blue-500 text-4xl" />,
        description: "Lorem ipsum dolor sit elton amet, consectetur lorem it adipiscing elit.",
        link: "#",
    },
];

const JobBoardSection = () => {
    return (
        <section className="py-16 px-6 text-center bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <h2 className="text-3xl font-bold text-gray-900">
                    Discover great companies
                </h2>
                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                    already hiring in our <span className="text-blue-600 font-semibold underline">job board</span>
                </h2>
                <p className="text-gray-500 text-lg mt-6 max-w-lg mx-auto leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla nunc, amet vitae senectus. A consequat.
                </p>

                {/* Company Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                    {companies.map((company) => (
                        <Card key={company.id} className="shadow-sm rounded-xl p-6 border border-gray-200 bg-white">
                            <CardContent className="flex flex-col items-start">
                                <div className="bg-gray-100 p-3 rounded-lg">{company.icon}</div>
                                <h3 className="font-semibold text-2xl mt-6">{company.name}</h3>
                                <p className="text-md text-left text-gray-500 mt-2 leading-relaxed">
                                    {company.description}
                                </p>
                                <a href={company.link} className="text-blue-600 font-semibold text-md mt-16">
                                    View Company
                                </a>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* View Companies Button */}
                <div className="mt-10">
                    <Button variant="outline" className="px-6 py-3 rounded-lg border-blue-600 text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition">
                        VIEW COMPANIES
                    </Button>
                </div>
            </div>

        </section>
    );
};

export default JobBoardSection;
