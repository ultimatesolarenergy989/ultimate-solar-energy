import React from 'react';
import Link from 'next/link';

export default function FinancingOptions() {
  const options = [
    {
      type: "PPA",
      subtitle: "NO UPFRONT COSTS",
      benefits: [
        "Only pay for the solar energy used",
        "Discounted rate compared to grid tariff",
        "Fixed term between 10 – 20 years",
        "All O&M and insurance is included in the tariff"
      ]
    },
    {
      type: "LEASE",
      subtitle: "LIMITED UPFRONT COSTS",
      benefits: [
        "Fixed monthly payments",
        "Potentially cashflow positive from Q1",
        "Fixed term",
        "Own the system after the term"
      ]
    },
    {
      type: "PURCHASE",
      subtitle: "GREATEST SAVINGS",
      benefits: [
        "No ongoing payments",
        "Payback between 3 – 6 years",
        "Immediate ownership of system",
        "Solar panels guaranteed for 25 years"
      ]
    }
  ];

  return (
    <div className="py-8 px-4 bg-white pt-16 mb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((option, index) => (
            <div key={index} className="flex flex-col shadow-md">
              {/* Yellow Header */}
              <div className="bg-[#FFD700] py-4 text-center">
                <h2 className="text-lg font-bold text-black">{option.type}</h2>
              </div>
              
              {/* Gray Subtitle */}
              <div className="bg-[#D3D3D3] py-5 text-center">
                <h3 className="text-sm font-bold text-black">{option.subtitle}</h3>
              </div>
              
              {/* White Content Area */}
              <div className="bg-white py-10 px-5 flex-grow">
                <ul className="space-y-5">
                  {option.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      {/* Green Checkmark */}
                      <svg 
                        className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span className="text-gray-800 text-sm leading-snug">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Read More Button */}
              <Link href="/contacts" className="bg-[#D3D3D3] py-5 text-center hover:bg-[#FFD700] transition-colors cursor-pointer block">
                <span className="text-black font-semibold text-sm">READ MORE</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

