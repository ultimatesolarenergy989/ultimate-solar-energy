"use client";
import { useState } from "react";
import Link from "next/link";
import { Users } from "lucide-react";

type Plan = {
  title: string;
  subtitle: string;
  output: string;
  outputRange: string;
  suitableFor: string;
  peopleCount: string;
  quoteLink: string;
  learnMoreLink: string;
};

const residentialPlans: Plan[] = [
  {
    title: "6.6 KW SYSTEM",
    subtitle: "Small Family",
    output: "Output (kwh/year)",
    outputRange: "9,100 to 10,400*",
    suitableFor: "Suitable for:",
    peopleCount: "upto 3 people",
    quoteLink: "/quote",
    learnMoreLink: "/products/residential/6.6kw",
  },
  {
    title: "10 KW SYSTEM",
    subtitle: "Medium Family/Small Business",
    output: "Output (kwh/year)",
    outputRange: "14,900 to 15,330*",
    suitableFor: "Suitable for:",
    peopleCount: "1-6 people",
    quoteLink: "/quote",
    learnMoreLink: "/products/residential/10kw",
  },
  {
    title: "13.3 KW SYSTEM",
    subtitle: "Large Family/Small Business",
    output: "Output (kwh/year)",
    outputRange: "15,800 to 18,250*",
    suitableFor: "Suitable for:",
    peopleCount: "1-10 People",
    quoteLink: "/quote",
    learnMoreLink: "/products/residential/13.3kw",
  },
];

const commercialPlans: Plan[] = [
  {
    title: "20 KW SYSTEM",
    subtitle: "Small Business",
    output: "Output (units/day)",
    outputRange: "80 to 90",
    suitableFor: "Suitable for Businesses with small to medium energy usage, who receive Energy bills of about $9000 annually.",
    peopleCount: "",
    quoteLink: "/quote",
    learnMoreLink: "/products/commercial/20kw",
  },
  {
    title: "40 KW SYSTEM",
    subtitle: "Medium To Large Organisations/NGO's",
    output: "Output (units/day)",
    outputRange: "160 to 190",
    suitableFor: "Suitable for Businesses with a medium energy usage, who receive Energy bills of about $18000 annually.",
    peopleCount: "",
    quoteLink: "/quote",
    learnMoreLink: "/products/commercial/40kw",
  },
  {
    title: "100 KW SYSTEM",
    subtitle: "Large Organisations/NGO",
    output: "Output (units/day)",
    outputRange: "400 to 470",
    suitableFor: "Suitable for Businesses with a high energy usage, who receive Energy bills of about $48000 annually.",
    peopleCount: "",
    quoteLink: "/quote",
    learnMoreLink: "/products/commercial/100kw",
  },
];

export default function ResComPlans() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const plans = activeTab === "residential" ? residentialPlans : commercialPlans;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg shadow-md">
            <button
              onClick={() => setActiveTab("residential")}
              className={`px-6 py-2 font-semibold text-base transition-all duration-300 rounded-l-lg ${
                activeTab === "residential"
                  ? "bg-gray-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Residential
            </button>
            <button
              onClick={() => setActiveTab("commercial")}
              className={`px-6 py-2 font-semibold text-base transition-all duration-300 rounded-r-lg ${
                activeTab === "commercial"
                  ? "bg-gray-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Commercial
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {plans.map((plan, index) => (
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
                  {plan.title}
                </h3>
                <p className="text-base text-gray-700 group-hover:text-white transition-colors duration-300 leading-tight">
                  {plan.subtitle}
                </p>
              </div>

              {/* Card Body */}
              <div className="px-6 py-5">
                {activeTab === "residential" ? (
                  /* Residential Layout - 2 columns with vertical separator */
                  <div className="grid grid-cols-2 gap-4 mb-4 relative">
                    {/* Output */}
                    <div className="pr-2">
                      <h4 className="font-semibold mb-1 text-sm text-[#002866] group-hover:text-white transition-colors duration-300 leading-tight">
                        {plan.output}
                      </h4>
                      <p className="text-xs text-gray-700 group-hover:text-white transition-colors duration-300 leading-snug">
                        {plan.outputRange}
                      </p>
                    </div>

                    {/* Vertical separator line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 group-hover:bg-[#FFD700] transition-colors duration-300"></div>

                    {/* Suitable For */}
                    <div className="pl-2">
                      <h4 className="font-semibold mb-1 text-sm text-[#002866] group-hover:text-white transition-colors duration-300 leading-tight">
                        {plan.suitableFor}
                      </h4>
                      <div className="flex items-center gap-1">
                        <p className="text-xs text-gray-700 group-hover:text-white transition-colors duration-300 leading-snug">
                          {plan.peopleCount}
                        </p>
                        <Users size={14} className="text-gray-700 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Commercial Layout - Single column */
                  <div className="mb-4 space-y-3">
                    {/* Output */}
                    <div className="text-center pb-3 border-b border-gray-300 group-hover:border-[#FFD700] transition-colors duration-300">
                      <h4 className="font-semibold mb-1 text-sm text-[#002866] group-hover:text-white transition-colors duration-300 leading-tight">
                        {plan.output}
                      </h4>
                      <p className="text-xs text-gray-700 group-hover:text-white transition-colors duration-300 leading-snug">
                        {plan.outputRange}
                      </p>
                    </div>

                    {/* Suitable For - Full width paragraph */}
                    <div>
                      <p className="text-xs text-gray-700 group-hover:text-white transition-colors duration-300 leading-snug">
                        {plan.suitableFor}
                      </p>
                    </div>
                  </div>
                )}

                {/* Horizontal separator above buttons */}
                <div className="border-t border-gray-300 group-hover:border-[#FFD700] transition-colors duration-300 mb-4"></div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    href={plan.quoteLink}
                    className="bg-[#FFD700] text-[#002866] font-bold px-4 py-2 rounded transition-all duration-300 uppercase tracking-wide text-xs shadow-lg hover:shadow-2xl relative overflow-hidden group text-center flex-1"
                  >
                    <span className="relative z-10">Get A Quote</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
                  </Link>
                  <Link
                    href={plan.learnMoreLink}
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

