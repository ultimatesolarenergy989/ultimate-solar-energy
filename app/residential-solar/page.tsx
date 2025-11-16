"use client";
import Link from "next/link";

type SystemCard = {
  title: string;
  inverter: string;
  inverterSpecs: string;
  panel: string;
  panelSpecs: string;
  quoteLink: string;
  learnMoreLink: string;
};

const systems66kw: SystemCard[] = [
  {
    title: "ULTIMATE SYSTEM",
    inverter: "Inverter",
    inverterSpecs: "5kw Goodwe or Sungrow",
    panel: "Panel",
    panelSpecs: "18x370w Tier 1 Premium Panels",
    quoteLink: "/get-a-quote",
    learnMoreLink: "/products/6-6-kw-ultimate-system",
  },
  {
    title: "BOOST SYSTEM",
    inverter: "Inverter",
    inverterSpecs: "5KW Fimer",
    panel: "Panel",
    panelSpecs: "18x370/390 Tier 1 Premium Panels",
    quoteLink: "/get-a-quote",
    learnMoreLink: "/products/6-6-kw-boost-system",
  },
  {
    title: "PLATINUM SYSTEM",
    inverter: "Inverter",
    inverterSpecs: "5KW Fronius Primo",
    panel: "Panel",
    panelSpecs: "18x370/390 Tier 1 Premium Panels",
    quoteLink: "/get-a-quote",
    learnMoreLink: "/products/6-6-kw-platinum-system",
  },
];

const systems10kw: SystemCard[] = [
  {
    title: "ULTIMATE SYSTEM",
    inverter: "Inverter",
    inverterSpecs: "8KW Solis",
    panel: "Panel",
    panelSpecs: "26x390w Tier 1 Premium Panels",
    quoteLink: "/get-a-quote",
    learnMoreLink: "/products/10-kw-ultimate-system",
  },
  {
    title: "PLATINUM SYSTEM",
    inverter: "Inverter",
    inverterSpecs: "8.2KW Fronius Primo",
    panel: "Panel",
    panelSpecs: "118X440w High Efficiency Panels",
    quoteLink: "/get-a-quote",
    learnMoreLink: "/products/10-5-kw-platinum-system",
  },
];

const systems13kw: SystemCard[] = [
  {
    title: "ULTIMATE SYSTEM",
    inverter: "Inverter",
    inverterSpecs: "10KW Goodwe MS Inverter",
    panel: "Panel",
    panelSpecs: "24x390w Tier 1 Premium Panels",
    quoteLink: "/get-a-quote",
    learnMoreLink: "/products/13-3-kw-ultimate-system",
  },
  {
    title: "PLATINUM SYSTEM",
    inverter: "Inverter",
    inverterSpecs: "2X5KW Fronius Primo OR 1x10KW Fronius Symo",
    panel: "Panel",
    panelSpecs: "30X440w High Efficiency Panels",
    quoteLink: "/get-a-quote",
    learnMoreLink: "/products/13-3kw-platinum-system",
  },
];

export default function ResidentialSolarPage() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-4xl font-bold text-[#002866] mb-6 uppercase tracking-wide">
            RESIDENTIAL SOLAR SYSTEMS
          </h1>
          <p className="text-base md:text-base text-gray-700 max-w-4xl mx-auto leading-relaxed">
            CONTENT TBA – Solar system is basically a set of several components. It is the quality of the components used that determines
            the quality of a solar system. We at SolarMiner understand that every component has an importance of its own and carries a
            significant value.
          </p>
        </div>

        {/* 6.6 KW Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002866] mb-4 uppercase">
            6.6 KW SOLAR SYSTEMS
          </h2>
          <p className="text-lg md:text-xl text-gray-800 mb-2">
            <span className="font-semibold">Small Family</span> upto 3 people 👨‍👩‍👧
          </p>
          <p className="text-base md:text-lg text-gray-700">
            <span className="font-semibold">Output (kwh/year)</span> 9,100 to 10,400*
          </p>
        </div>

        {/* 6.6 KW Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 mb-16">
          {systems66kw.map((system, index) => (
            <div
              key={index}
              className="overflow-hidden transition-all duration-300 group bg-white hover:bg-[#002866] hover:z-10"
              style={{
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Card Header */}
              <div className="px-6 py-5 text-center border-b border-gray-200 group-hover:border-gray-400">
                <h3 className="text-2xl font-bold text-[#002866] group-hover:text-white transition-colors duration-300 leading-tight">
                  {system.title}
                </h3>
              </div>

              {/* Card Body */}
              <div className="px-6 py-5">
                {/* Specifications Grid - 2 columns with vertical separator */}
                <div className="grid grid-cols-2 gap-4 mb-4 relative">
                  {/* Inverter */}
                  <div className="pr-2">
                    <h4 className="font-semibold mb-2 text-sm text-[#002866] group-hover:text-white transition-colors duration-300 leading-tight">
                      {system.inverter}
                    </h4>
                    <p className="text-xs text-gray-700 group-hover:text-white transition-colors duration-300 leading-snug">
                      {system.inverterSpecs}
                    </p>
                  </div>

                  {/* Vertical separator line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 group-hover:bg-[#FFD700] transition-colors duration-300"></div>

                  {/* Panel */}
                  <div className="pl-2">
                    <h4 className="font-semibold mb-2 text-sm text-[#002866] group-hover:text-white transition-colors duration-300 leading-tight">
                      {system.panel}
                    </h4>
                    <p className="text-xs text-gray-700 group-hover:text-white transition-colors duration-300 leading-snug">
                      {system.panelSpecs}
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

        {/* 10 KW Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002866] mb-4 uppercase">
            10 KW SOLAR SYSTEMS
          </h2>
          <p className="text-lg md:text-xl text-gray-800 mb-2">
            <span className="font-semibold">Medium Family/Small Business</span> 1 - 6 people 👨‍👩‍👦‍👦👨‍👩‍👦‍👦
          </p>
          <p className="text-base md:text-lg text-gray-700">
            <span className="font-semibold">Output (kwh/year)</span> 14,900 to 15,330*
          </p>
        </div>

        {/* 10 KW Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-16 max-w-5xl mx-auto">
          {systems10kw.map((system, index) => (
            <div
              key={index}
              className="overflow-hidden transition-all duration-300 group bg-white hover:bg-[#002866] hover:z-10"
              style={{
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Card Header */}
              <div className="px-6 py-5 text-center border-b border-gray-200 group-hover:border-gray-400">
                <h3 className="text-2xl font-bold text-[#002866] group-hover:text-white transition-colors duration-300 leading-tight">
                  {system.title}
                </h3>
              </div>

              {/* Card Body */}
              <div className="px-6 py-5">
                {/* Specifications Grid - 2 columns with vertical separator */}
                <div className="grid grid-cols-2 gap-4 mb-4 relative">
                  {/* Inverter */}
                  <div className="pr-2">
                    <h4 className="font-semibold mb-2 text-sm text-[#002866] group-hover:text-white transition-colors duration-300 leading-tight">
                      {system.inverter}
                    </h4>
                    <p className="text-xs text-gray-700 group-hover:text-white transition-colors duration-300 leading-snug">
                      {system.inverterSpecs}
                    </p>
                  </div>

                  {/* Vertical separator line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 group-hover:bg-[#FFD700] transition-colors duration-300"></div>

                  {/* Panel */}
                  <div className="pl-2">
                    <h4 className="font-semibold mb-2 text-sm text-[#002866] group-hover:text-white transition-colors duration-300 leading-tight">
                      {system.panel}
                    </h4>
                    <p className="text-xs text-gray-700 group-hover:text-white transition-colors duration-300 leading-snug">
                      {system.panelSpecs}
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

        {/* 13 KW Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002866] mb-4 uppercase">
            13 KW SOLAR SYSTEMS
          </h2>
          <p className="text-lg md:text-xl text-gray-800 mb-2">
            <span className="font-semibold">Large Family/Small Business</span> 1 - 10 people 👨‍👩‍👦‍👦👨‍👩‍👦‍👦👨‍👩‍👦‍👦👨‍👩‍👦‍👦👨‍👩‍👦‍👦
          </p>
          <p className="text-base md:text-lg text-gray-700">
            <span className="font-semibold">Output (kwh/year)</span> 15,800 to 18,250*
          </p>
        </div>

        {/* 13 KW Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-5xl mx-auto">
          {systems13kw.map((system, index) => (
            <div
              key={index}
              className="overflow-hidden transition-all duration-300 group bg-white hover:bg-[#002866] hover:z-10"
              style={{
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Card Header */}
              <div className="px-6 py-5 text-center border-b border-gray-200 group-hover:border-gray-400">
                <h3 className="text-2xl font-bold text-[#002866] group-hover:text-white transition-colors duration-300 leading-tight">
                  {system.title}
                </h3>
              </div>

              {/* Card Body */}
              <div className="px-6 py-5">
                {/* Specifications Grid - 2 columns with vertical separator */}
                <div className="grid grid-cols-2 gap-4 mb-4 relative">
                  {/* Inverter */}
                  <div className="pr-2">
                    <h4 className="font-semibold mb-2 text-sm text-[#002866] group-hover:text-white transition-colors duration-300 leading-tight">
                      {system.inverter}
                    </h4>
                    <p className="text-xs text-gray-700 group-hover:text-white transition-colors duration-300 leading-snug">
                      {system.inverterSpecs}
                    </p>
                  </div>

                  {/* Vertical separator line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 group-hover:bg-[#FFD700] transition-colors duration-300"></div>

                  {/* Panel */}
                  <div className="pl-2">
                    <h4 className="font-semibold mb-2 text-sm text-[#002866] group-hover:text-white transition-colors duration-300 leading-tight">
                      {system.panel}
                    </h4>
                    <p className="text-xs text-gray-700 group-hover:text-white transition-colors duration-300 leading-snug">
                      {system.panelSpecs}
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
      </div>
    </section>
  );
}

