"use client";
import Link from "next/link";

export default function CommercialSystems() {
  const systems = [
    {
      id: 1,
      title: "20 KW SYSTEM",
      subtitle: "Small Business",
      output: "Output (units/day)",
      outputRange: "80 to 90",
      description: "Suitable for Businesses with small to medium energy usage, who receive Energy bills of about $9000 annually.",
      quoteLink: "/get-a-quote",
      learnMoreLink: "/products/20-kw-system",
    },
    {
      id: 2,
      title: "40 KW SYSTEM",
      subtitle: "Medium To Large Organisations/NGO's",
      output: "Output (units/day)",
      outputRange: "160 to 190",
      description: "Suitable for Businesses with a medium energy usage, who receive Energy bills of about $18000 annually.",
      quoteLink: "/get-a-quote",
      learnMoreLink: "/products/40-kw-system",
    },
    {
      id: 3,
      title: "100 KW SYSTEM",
      subtitle: "Large Organisations/NGO's",
      output: "Output (units/day)",
      outputRange: "400 to 470",
      description: "Suitable for Businesses with a high energy usage, who receive Energy bills of about $48000 annually.",
      quoteLink: "/get-a-quote",
      learnMoreLink: "/products/100-kw-system",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-4xl md:text-4xl font-bold text-[#002866] text-center mb-12">
          COMMERCIAL SOLAR SYSTEMS
        </h2>

        {/* Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {systems.map((system, index) => (
            <div
              key={index}
              className="overflow-hidden transition-all duration-300 group bg-white hover:bg-[#002866] hover:z-10"
              style={{
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Card Header */}
              <div className="px-6 py-5 text-center border-b border-gray-200 group-hover:border-gray-400">
                <h3 className="text-2xl font-bold mb-1 text-[#002866] group-hover:text-white transition-colors duration-300 leading-tight">
                  {system.title}
                </h3>
                <p className="text-base text-gray-700 group-hover:text-white transition-colors duration-300 leading-tight">
                  {system.subtitle}
                </p>
              </div>

              {/* Card Body */}
              <div className="px-6 py-5">
                {/* Commercial Layout - Single column */}
                <div className="mb-4 space-y-3">
                  {/* Output */}
                  <div className="text-center pb-3 border-b border-gray-300 group-hover:border-[#FFD700] transition-colors duration-300">
                    <h4 className="font-semibold mb-1 text-sm text-[#002866] group-hover:text-white transition-colors duration-300 leading-tight">
                      {system.output}
                    </h4>
                    <p className="text-xs text-gray-700 group-hover:text-white transition-colors duration-300 leading-snug">
                      {system.outputRange}
                    </p>
                  </div>

                  {/* Suitable For - Full width paragraph */}
                  <div>
                    <p className="text-xs text-gray-700 group-hover:text-white transition-colors duration-300 leading-snug">
                      {system.description}
                    </p>
                  </div>
                </div>

                {/* Horizontal separator above buttons */}
                <div className="border-t border-gray-300 group-hover:border-[#FFD700] transition-colors duration-300 mb-4"></div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    href={system.quoteLink}
                    className="bg-[#FFD700] text-[#002866] font-bold px-4 py-2 rounded transition-all duration-300 uppercase tracking-wide text-xs shadow-lg hover:shadow-2xl relative overflow-hidden group text-center flex-1"
                  >
                    <span className="relative z-10">Get A Quote</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
                  </Link>
                  <Link
                    href={system.learnMoreLink}
                    className="font-bold px-4 py-2 rounded transition-all duration-300 uppercase tracking-wide text-xs shadow-md hover:shadow-lg text-center flex-1 bg-white text-[#002866] hover:bg-gray-100 border border-gray-300 group-hover:border-white"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Description */}
        <div className="max-w-6xl mx-auto mt-12">
          <p className="text-gray-600 text-center leading-relaxed text-lg">
            Australia is on the verge of confronting a new energy era, where the government is providing generous rebates and making energy more affordable, thus transitioning Australia towards a new energy future for both residential and commercial. This means it is the perfect time for consumers to go solar, this is because solar prices have been reduced considerably and quality has been improved drastically because of the high completion in PV Solar industry.
          </p>
        </div>
      </div>
    </section>
  );
}

