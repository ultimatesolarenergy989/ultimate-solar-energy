"use client";
import Image from "next/image";

const reasons = [
  {
    text: "Ultimate Solar Energy offers high-end maintenance services by Clean Energy Council (CEC) certified technicians. This includes solar system analysis and testing, and solar panel cleaning, ensuring you get the most from your solar system and enjoy years of trouble-free use."
  },
  {
    text: "While solar panel systems are generally low maintenance, it's crucial to have reliable support when issues arise. At USE, we provide trusted advice on everything from installation to cleaning and maintenance. As Australia's leading solar installers and service company, we take care of every aspect of maintenance and repair for your peace of mind."
  },
  {
    text: "Our solar system analysis helps identify potential performance issues such as dead cells, dirty cells, or aging components. Whether you have a small family home or a large commercial operation, our detailed solar service can optimize energy generation and ensure access to sustainable solar power for years."
  }
];

export default function SolarServiceWhyChoose() {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#002866] text-center mb-6 leading-tight">
          Harness The Power Of The Sun And Experience Peak Performance With Our Expert Solar Services And Cleaning
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center max-w-5xl mx-auto mb-12">
          At Ultimate Solar Energy, we specialize in complete solar service and cleaning solutions, ensuring your solar panels operate at their best. Our dedicated team of certified professional solar technicians and electricians excels in maintaining and optimizing solar panels for maximum efficiency and longevity.
        </p>

        {/* Why Choose Us Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#002866] text-center mb-10">
          Why Choose Us?
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div key={index} className="flex flex-col shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Top Yellow Section with Icon */}
              <div className="bg-[#FFD700] flex items-center justify-center py-8 px-4">
                <Image
                  src="/img/solar-services/icon/solar-servcie-icon.png"
                  alt="Solar Service Icon"
                  width={120}
                  height={120}
                  className="w-24 h-24 md:w-28 md:h-28 object-contain"
                />
              </div>

              {/* Bottom Navy Blue Section with Text */}
              <div className="bg-[#002866] flex-1 p-6 flex items-center">
                <p className="text-white text-sm md:text-base leading-relaxed text-justify">
                  {reason.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

