"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "How do I get involved?",
    answer: "you can get involved right now! Whether you are an existing Solar & storage customer or would like to add a battery system to your existing Solar system or may be starting from scratch with a new home Energy Solution, USE has got you covered."
  },
  {
    question: "How do I qualify for 20c Solar Feed-in-Tariff?",
    answer: "A Virtual Power Plant is a cloud based Network of distributor Energy Resources, such as homes and commercial Buildings that have their Solar and battery Systems all working together as a single power plant and central controlled through Wifi technology by Authorised retailers; you can treat each battery system as a micropower station. Energy retailers sometimes will force your battery system to charge or discharge to distributor energy resources for the purpose of enhancing power generation, as well as trading or selling power in the Electricity Market, as per market demand. VPPs are regarded as the future in the power market. VPP is emerging as a solution to resolve the grid power unstable issues."
  },
  {
    question: "Am I eligible to join your VPP electricity plan?",
    answer: "For joining our virtual power plant electricity plan, you will have to meet the following conditions:\n\n• Residential properties only\n• Have less than 13.2kw solar system\n• Have one of the following brands of inverters, any battery storage with Alpha ESS, Goodwe, Solaredge, Sungrow as your battery inverters."
  }
];

export default function VppPlansFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-16 xl:px-32 mt-12 mb-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#002866] text-center mb-12">
          LEARN MORE ABOUT OUR VPP PLANS
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - FAQ Section */}
          <div>
            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2">
              20c SOLAR FEED-IN TARIFF
            </h3>
            <p className="text-gray-600 text-base mb-6">
              Bundle a Ultimate Solar Energy's Solar and battery solution with a VPP and receive up to 20c Solar Feed-in-Tariff.
            </p>

            {/* Accordion Items */}
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b border-gray-300">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between py-4 text-left hover:text-[#002866] transition-colors duration-200"
                  >
                    <span className="text-[#002866] font-medium text-base md:text-lg">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-6 h-6 text-[#002866] transition-transform duration-300 flex-shrink-0 ml-4 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? "max-h-[500px] pb-4" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-600 text-sm md:text-base whitespace-pre-line">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Money Image */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-[600px] h-auto">
              <Image
                src="/img/solar-battery/money.jpg"
                alt="Australian Currency - 20c Solar Feed-in Tariff"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

