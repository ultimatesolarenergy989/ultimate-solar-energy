"use client";
import Image from "next/image";
import { Check } from "lucide-react";

const benefits = [
  {
    text: "HIGH SOLAR FEED-IN-TARIFF",
    color: "bg-[#E84D8A]", // Pink
  },
  {
    text: "FAST ROI WITH BOTH SOLAR AND STORAGE",
    color: "bg-[#FF8C42]", // Orange
  },
  {
    text: "DIY ENERGY TRADING PLATFORM",
    color: "bg-[#9ACD32]", // Lime Green
  },
  {
    text: "COMPETITIVE ENERGY PLAN",
    color: "bg-[#3ECFB0]", // Turquoise
  },
  {
    text: "FREE MONITORING INSIGHT MOBILE APP",
    color: "bg-[#E84D8A]", // Pink
  },
  {
    text: "COMPATIBLE WITH AMAZON ECHO",
    color: "bg-[#FF8C42]", // Orange
  },
];

export default function VppPlanBenefits() {
  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002866] text-center mb-12">
          WHY AN ULTIMATE SOLAR VPP PLAN
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`relative shadow-lg overflow-visible transition-all duration-300 h-[200px] ${benefit.color} border-2 border-transparent hover:border-[#002866] group`}
            >
              {/* Left Side - White Section with Icon (with diagonal edge) */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-[50%]  z-10"
                
              >
                  <div className="flex items-center justify-center ">
                    <div className="relative flex items-center justify-center ">
                      {/* Icon Background Image */}
                      <Image
                        src="/img/solar-battery/icon-bg.png"
                        alt=""
                        width={96}
                        height={96}
                        className="w-[398px] h-[198px] ml-[-2px] mt-[-1px] object-contain"
                      />
                      
                      {/* Circle Border around checkmark - smaller size */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-20 h-20 rounded-full border-[3px] border-gray-300 group-hover:border-[#002866] transition-colors duration-300 flex items-center justify-center">
                          {/* Checkmark Icon */}
                          <Check size={40} strokeWidth={3} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
              </div>

              {/* Right Side - Colored Text Section */}
              <div className="absolute inset-0 flex items-center justify-end pr-6 pl-[52%]">
                <p className="text-white font-bold text-sm md:text-base lg:text-lg leading-tight text-center uppercase">
                  {benefit.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

