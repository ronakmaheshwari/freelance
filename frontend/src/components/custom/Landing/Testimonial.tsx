import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Testimonial = () => {
  return (
    <section className=" bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-8 py-16">
        {/* Left Content */}
        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 leading-relaxed">
            Trusted by over{" "}
            <span className="text-blue-600 underline">10,000 users</span> around
            the world
          </h2>
          <p className="mt-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla
            nunc, amet vitae senectus. A consequat duis nec eu quis faucibus.
          </p>
        </div>

        {/* Testimonial Card */}
        <Card className="w-full max-w-lg shadow-lg rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Mark Norman"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-semibold text-gray-900">Mark Norman</h4>
                <p className="text-sm text-blue-600">SEO Lead at Studio</p>
              </div>
            </div>

            <p className="mt-4 text-gray-700 text-sm">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique
              pellentesque tincidunt facilisi ut purus, in. Turpis pellentesque
              commodo eleifend bibendum aliquam.”
            </p>

            <hr className="my-4 border-gray-200" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-600 font-semibold">
                <span className="text-xl">🌐</span>
                <span>studio</span>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-blue-600">
                  <FaArrowLeft />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <FaArrowRight />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </section>
  );
};

export default Testimonial;
