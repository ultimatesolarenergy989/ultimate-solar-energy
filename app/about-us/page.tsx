import { Globe, Lightbulb, CheckCircle, Heart, Star, CreditCard } from "lucide-react";
import AboutCertifications from "@/components/AboutCertifications";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Our Story & Values | Ultimate Solar Energy",
  description: "Learn about Ultimate Solar Energy - Australia's trusted solar provider. Discover our commitment to quality, sustainability, customer satisfaction, and renewable energy solutions. CEC-approved and dedicated to your energy independence.",
  keywords: [
    "about Ultimate Solar Energy",
    "solar company Australia",
    "CEC approved solar",
    "solar energy provider",
    "renewable energy company",
    "sustainable energy Australia",
    "solar installation company",
    "trusted solar provider"
  ],
  openGraph: {
    title: "About Us | Our Story & Values | Ultimate Solar Energy",
    description: "Learn about Ultimate Solar Energy - Australia's trusted solar provider committed to quality, sustainability, and renewable energy solutions.",
    url: "https://ultimatesolarenergy.com.au/about-us",
    siteName: "Ultimate Solar Energy",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutUsPage() {
  return (
    <main>
      {/* About Us Timeline Section */}
      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#002866] text-center mb-16 uppercase tracking-wide">
            ABOUT US
          </h1>

          {/* Timeline Container */}
          <div className="relative">
            {/* Vertical Line - Desktop Only */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-800 h-full hidden lg:block"></div>

            {/* Timeline Items */}
            <div className="space-y-16">
              {/* 1. ENVIRONMENT AND YOU - Right Side */}
              <div className="relative flex flex-col lg:flex-row items-center lg:items-start">
                {/* Mobile Layout: Icon centered at top */}
                <div className="flex flex-col items-center lg:hidden mb-6 relative">
                  <div className="flex-shrink-0 relative mb-4">
                    {/* Decorative Arc around Icon */}
                    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#ec4899"
                        strokeWidth="2"
                        strokeDasharray="200 283"
                        strokeDashoffset="-10"
                        opacity="0.7"
                        transform="rotate(70 50 50)"
                      />
                    </svg>
                    <div className="w-20 h-20 rounded-full bg-pink-500 border-4 border-pink-400 flex items-center justify-center relative z-10">
                      <Globe className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  {/* Timeline Dot Mobile */}
                  <div className="w-4 h-4 rounded-full bg-pink-500 mb-4 relative z-10"></div>
                  {/* Connecting Line from Dot to Content */}
                  <div className="absolute top-[6rem] w-0.5 h-[57px] bg-pink-500 left-1/2 -translate-x-1/2"></div>
                </div>

                {/* Desktop Layout: Left Icon */}
                <div className="hidden lg:block w-full lg:w-1/2 lg:pr-16">
                  <div className="relative flex items-start gap-0 lg:justify-end">
                    {/* Icon */}
                    <div className="flex-shrink-0 relative">
                      {/* Decorative Arc around Icon */}
                      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="#ec4899"
                          strokeWidth="2"
                          strokeDasharray="200 283"
                          strokeDashoffset="-10"
                          opacity="0.7"
                          transform="rotate(75 50 50)"
                        />
                      </svg>
                      <div className="w-24 h-24 rounded-full bg-pink-500 border-4 border-pink-400 flex items-center justify-center relative z-10">
                        <Globe className="w-12 h-12 text-white" strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Horizontal Line from Icon to Timeline */}
                    <div className="absolute right-0 top-12 w-[43px] h-0.5 bg-pink-500 -mr-[3.5rem]"></div>
                  </div>
                </div>

                {/* Timeline Dot - Desktop Only */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 top-12 z-10">
                  <div className="w-4 h-4 rounded-full bg-pink-500"></div>
                </div>

                {/* Content Box */}
                <div className="w-full lg:w-1/2 lg:pl-16">
                  <div className="relative lg:mt-12">
                    {/* Bracket-Shaped Connector Line from Timeline - Desktop Only */}
                    <div className="hidden lg:block absolute left-0 top-0 w-[60px] h-1 bg-pink-500 -ml-[3.5rem]"></div>
                    <div className="hidden lg:block absolute left-0 top-0 w-1 h-full bg-pink-500"></div>
                    <div className="hidden lg:block absolute left-0 bottom-0 w-full h-1 bg-pink-500"></div>

                    {/* Mobile Border */}
                    <div className="lg:hidden border-2 border-pink-500 p-4 rounded-lg">
                      <h3 className="text-2xl font-bold text-pink-500 mb-4 uppercase text-center">
                        ENVIRONMENT AND YOU
                      </h3>
                      <p className="text-gray-600 text-base leading-relaxed text-center">
                        At Ultimate Solar Energy, we strive in the realm of providing high quality solar installation services in Australia. We aim to achieve a fossil free future by providing our clients to switch to solar energy which is an effective alternative for Energy production.
                      </p>
                    </div>

                    {/* Desktop Content */}
                    <div className="hidden lg:block pl-6 py-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-pink-500 mb-4 uppercase">
                        ENVIRONMENT AND YOU
                      </h3>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        At Ultimate Solar Energy, we strive in the realm of providing high quality solar installation services in Australia. We aim to achieve a fossil free future by providing our clients to switch to solar energy which is an effective alternative for Energy production.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. EXPERTISE - Left Side */}
              <div className="relative flex flex-col lg:flex-row items-center lg:items-start">
                {/* Mobile Layout: Icon centered at top */}
                <div className="flex flex-col items-center lg:hidden mb-6 relative">
                  <div className="flex-shrink-0 relative mb-4">
                    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="2"
                        strokeDasharray="200 283"
                        strokeDashoffset="-10"
                        opacity="0.7"
                      />
                    </svg>
                    <div className="w-20 h-20 rounded-full bg-orange-500 border-4 border-orange-400 flex items-center justify-center relative z-10">
                      <Lightbulb className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-orange-500 mb-4 relative z-10"></div>
                  {/* Connecting Line from Dot to Content */}
                  <div className="absolute top-[6rem] w-0.5 h-[57px] bg-orange-500 left-1/2 -translate-x-1/2"></div>
                </div>

                {/* Desktop Layout: Left Content Box */}
                <div className="hidden lg:block w-full lg:w-1/2 lg:pr-16">
                  <div className="relative mt-12">
                    <div className="absolute right-0 top-0 w-[60px] h-1 bg-orange-500 -mr-[3.5rem]"></div>
                    <div className="absolute right-0 top-0 w-1 h-full bg-orange-500"></div>
                    <div className="absolute right-0 bottom-0 w-full h-1 bg-orange-500"></div>
                    <div className="pr-6 py-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-orange-500 mb-4 uppercase">
                        EXPERTISE
                      </h3>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        Our team consists of skilled Solar designers and installers who follow the changes in latest technology trends and innovate to provide solution to complex problems
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline Dot - Desktop Only */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 top-12 z-10">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                </div>

                {/* Desktop Layout: Right Icon */}
                <div className="hidden lg:block w-full lg:w-1/2 lg:pl-16">
                  <div className="relative flex items-start gap-0">
                    <div className="absolute left-0 top-12 w-[43px] h-0.5 bg-orange-500 -ml-[3.5rem]"></div>
                    <div className="flex-shrink-0 relative">
                      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="#f97316"
                          strokeWidth="2"
                          strokeDasharray="200 283"
                          strokeDashoffset="-10"
                          opacity="0.7"
                          transform="scale(-1,1) translate(-100,0) rotate(75 50 50)"
                        />
                      </svg>
                      <div className="w-24 h-24 rounded-full bg-orange-500 border-4 border-orange-400 flex items-center justify-center relative z-10">
                        <Lightbulb className="w-12 h-12 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Content */}
                <div className="w-full lg:hidden">
                  <div className="border-2 border-orange-500 p-4 rounded-lg">
                    <h3 className="text-2xl font-bold text-orange-500 mb-4 uppercase text-center">
                      EXPERTISE
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed text-center">
                      Our team consists of skilled Solar designers and installers who follow the changes in latest technology trends and innovate to provide solution to complex problems
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. QUALITY ASSURANCE - Right Side */}
              <div className="relative flex flex-col lg:flex-row items-center lg:items-start">
                {/* Mobile Layout */}
                <div className="flex flex-col items-center lg:hidden mb-6 relative">
                  <div className="flex-shrink-0 relative mb-4">
                    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#85BC22" strokeWidth="2" strokeDasharray="200 283" strokeDashoffset="-10" opacity="0.7" />
                    </svg>
                    <div className="w-20 h-20 rounded-full bg-[#85BC22] border-4 border-[#9CD52E] flex items-center justify-center relative z-10">
                      <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-[#85BC22] mb-4 relative z-10"></div>
                  {/* Connecting Line from Dot to Content */}
                  <div className="absolute top-[6rem] w-0.5 h-[57px] bg-[#85BC22] left-1/2 -translate-x-1/2"></div>
                </div>

                {/* Desktop: Left Icon */}
                <div className="hidden lg:block w-full lg:w-1/2 lg:pr-16">
                  <div className="relative flex items-start gap-0 lg:justify-end">
                    <div className="flex-shrink-0 relative">
                      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#85BC22" strokeWidth="2" strokeDasharray="200 283" strokeDashoffset="-10" opacity="0.7" transform="rotate(75 50 50)" />
                      </svg>
                      <div className="w-24 h-24 rounded-full bg-[#85BC22] border-4 border-[#9CD52E] flex items-center justify-center relative z-10">
                        <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="absolute right-0 top-12 w-[43px] h-0.5 bg-[#85BC22] -mr-[3.5rem]"></div>
                  </div>
                </div>

                {/* Timeline Dot - Desktop Only */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 top-12 z-10">
                  <div className="w-4 h-4 rounded-full bg-[#85BC22]"></div>
                </div>

                {/* Content Box */}
                <div className="w-full lg:w-1/2 lg:pl-16">
                  <div className="relative lg:mt-12">
                    {/* Desktop Lines */}
                    <div className="hidden lg:block absolute left-0 top-0 w-[60px] h-1 bg-[#85BC22] -ml-[3.5rem]"></div>
                    <div className="hidden lg:block absolute left-0 top-0 w-1 h-full bg-[#85BC22]"></div>
                    <div className="hidden lg:block absolute left-0 bottom-0 w-full h-1 bg-[#85BC22]"></div>
                    {/* Mobile Border */}
                    <div className="lg:hidden border-2 border-[#85BC22] p-4 rounded-lg">
                      <h3 className="text-2xl font-bold text-[#85BC22] mb-4 uppercase text-center">QUALITY ASSURANCE</h3>
                      <p className="text-gray-600 text-base leading-relaxed text-center">Our top priority is to give our valuable clients premium quality products ingrained with advance cutting-edge technology approved by the Clean Energy Council (CEC) Australia.</p>
                    </div>
                    {/* Desktop Content */}
                    <div className="hidden lg:block pl-6 py-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-[#85BC22] mb-4 uppercase">QUALITY ASSURANCE</h3>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">Our top priority is to give our valuable clients premium quality products ingrained with advance cutting-edge technology approved by the Clean Energy Council (CEC) Australia.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. CUSTOMER CARE - Left Side */}
              <div className="relative flex flex-col lg:flex-row items-center lg:items-start">
                {/* Mobile Layout */}
                <div className="flex flex-col items-center lg:hidden mb-6 relative">
                  <div className="flex-shrink-0 relative mb-4">
                    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="200 283" strokeDashoffset="-10" opacity="0.7" />
                    </svg>
                    <div className="w-20 h-20 rounded-full bg-cyan-400 border-4 border-cyan-300 flex items-center justify-center relative z-10">
                      <Heart className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-cyan-400 mb-4 relative z-10"></div>
                  {/* Connecting Line from Dot to Content */}
                  <div className="absolute top-[6rem] w-0.5 h-[57px] bg-cyan-400 left-1/2 -translate-x-1/2"></div>
                </div>

                {/* Desktop: Left Content Box */}
                <div className="hidden lg:block w-full lg:w-1/2 lg:pr-16">
                  <div className="relative mt-12">
                    <div className="absolute right-0 top-0 w-[60px] h-1 bg-cyan-400 -mr-[3.5rem]"></div>
                    <div className="absolute right-0 top-0 w-1 h-full bg-cyan-400"></div>
                    <div className="absolute right-0 bottom-0 w-full h-1 bg-cyan-400"></div>
                    <div className="pr-6 py-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4 uppercase">CUSTOMER CARE</h3>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">We recognize our responsibility to educate you about the product and provide you guidance with an End-to-End process outline which makes it easier towards decision making.</p>
                    </div>
                  </div>
                </div>

                {/* Timeline Dot - Desktop Only */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 top-12 z-10">
                  <div className="w-4 h-4 rounded-full bg-cyan-400"></div>
                </div>

                {/* Desktop: Right Icon */}
                <div className="hidden lg:block w-full lg:w-1/2 lg:pl-16">
                  <div className="relative flex items-start gap-0">
                    <div className="absolute left-0 top-12 w-[43px] h-0.5 bg-cyan-400 -ml-[3.5rem]"></div>
                    <div className="flex-shrink-0 relative">
                      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="200 283" strokeDashoffset="-10" opacity="0.7" transform="scale(-1,1) translate(-100,0) rotate(75 50 50)" />
                      </svg>
                      <div className="w-24 h-24 rounded-full bg-cyan-400 border-4 border-cyan-300 flex items-center justify-center relative z-10">
                        <Heart className="w-12 h-12 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Content */}
                <div className="w-full lg:hidden">
                  <div className="border-2 border-cyan-400 p-4 rounded-lg">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-4 uppercase text-center">CUSTOMER CARE</h3>
                    <p className="text-gray-600 text-base leading-relaxed text-center">We recognize our responsibility to educate you about the product and provide you guidance with an End-to-End process outline which makes it easier towards decision making.</p>
                  </div>
                </div>
              </div>

              {/* 5. WARRANTY - Right Side */}
              <div className="relative flex flex-col lg:flex-row items-center lg:items-start">
                {/* Mobile Layout */}
                <div className="flex flex-col items-center lg:hidden mb-6 relative">
                  <div className="flex-shrink-0 relative mb-4">
                    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="200 283" strokeDashoffset="-10" opacity="0.7" />
                    </svg>
                    <div className="w-20 h-20 rounded-full bg-pink-500 border-4 border-pink-400 flex items-center justify-center relative z-10">
                      <Star className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-pink-500 mb-4 relative z-10"></div>
                  {/* Connecting Line from Dot to Content */}
                  <div className="absolute top-[6rem] w-0.5 h-[57px] bg-pink-500 left-1/2 -translate-x-1/2"></div>
                </div>

                {/* Desktop: Left Icon */}
                <div className="hidden lg:block w-full lg:w-1/2 lg:pr-16">
                  <div className="relative flex items-start gap-0 lg:justify-end">
                    <div className="flex-shrink-0 relative">
                      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="200 283" strokeDashoffset="-10" opacity="0.7" transform="rotate(75 50 50)" />
                      </svg>
                      <div className="w-24 h-24 rounded-full bg-pink-500 border-4 border-pink-400 flex items-center justify-center relative z-10">
                        <Star className="w-12 h-12 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="absolute right-0 top-12 w-[43px] h-0.5 bg-pink-500 -mr-[3.5rem]"></div>
                  </div>
                </div>

                {/* Timeline Dot - Desktop Only */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 top-12 z-10">
                  <div className="w-4 h-4 rounded-full bg-pink-500"></div>
                </div>

                {/* Content Box */}
                <div className="w-full lg:w-1/2 lg:pl-16">
                  <div className="relative lg:mt-12">
                    {/* Desktop Lines */}
                    <div className="hidden lg:block absolute left-0 top-0 w-[60px] h-1 bg-pink-500 -ml-[3.5rem]"></div>
                    <div className="hidden lg:block absolute left-0 top-0 w-1 h-full bg-pink-500"></div>
                    <div className="hidden lg:block absolute left-0 bottom-0 w-full h-1 bg-pink-500"></div>
                    {/* Mobile Border */}
                    <div className="lg:hidden border-2 border-pink-500 p-4 rounded-lg">
                      <h3 className="text-2xl font-bold text-pink-500 mb-4 uppercase text-center">WARRANTY</h3>
                      <p className="text-gray-600 text-base leading-relaxed text-center">Ultimate Solar Energy provides backing to every Solar System installed with a full 5 year "Whole of System" warranty and on-site servicing and rectification for a period of 5 years in addition to product warranties. This shows our commitment and adherence towards sustainable policies and Australian standards.</p>
                    </div>
                    {/* Desktop Content */}
                    <div className="hidden lg:block pl-6 py-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-pink-500 mb-4 uppercase">WARRANTY</h3>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">Ultimate Solar Energy provides backing to every Solar System installed with a full 5 year "Whole of System" warranty and on-site servicing and rectification for a period of 5 years in addition to product warranties. This shows our commitment and adherence towards sustainable policies and Australian standards.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. POCKET-FRIENDLY - Left Side */}
              <div className="relative flex flex-col lg:flex-row items-center lg:items-start">
                {/* Mobile Layout */}
                <div className="flex flex-col items-center lg:hidden mb-6 relative">
                  <div className="flex-shrink-0 relative mb-4">
                    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#85BC22" strokeWidth="2" strokeDasharray="200 283" strokeDashoffset="-10" opacity="0.7" />
                    </svg>
                    <div className="w-20 h-20 rounded-full bg-[#85BC22] border-4 border-[#9CD52E] flex items-center justify-center relative z-10">
                      <CreditCard className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-[#85BC22] mb-4 relative z-10"></div>
                  {/* Connecting Line from Dot to Content */}
                  <div className="absolute top-[6rem] w-0.5 h-[57px] bg-[#85BC22] left-1/2 -translate-x-1/2"></div>
                </div>

                {/* Desktop: Left Content Box */}
                <div className="hidden lg:block w-full lg:w-1/2 lg:pr-16">
                  <div className="relative mt-12">
                    <div className="absolute right-0 top-0 w-[60] h-1 bg-[#85BC22] -mr-[3.5rem]"></div>
                    <div className="absolute right-0 top-0 w-1 h-full bg-[#85BC22]"></div>
                    <div className="absolute right-0 bottom-0 w-full h-1 bg-[#85BC22]"></div>
                    <div className="pr-6 py-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-[#85BC22] mb-4 uppercase">POCKET-FRIENDLY</h3>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">We guide you towards Rebates and incentives (STCs & LGCs) to develop packages for you that highlights affordability and price fairness.</p>
                    </div>
                  </div>
                </div>

                {/* Timeline Dot - Desktop Only */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 top-12 z-10">
                  <div className="w-4 h-4 rounded-full bg-[#85BC22]"></div>
                </div>

                {/* Desktop: Right Icon */}
                <div className="hidden lg:block w-full lg:w-1/2 lg:pl-16">
                  <div className="relative flex items-start gap-0">
                    <div className="absolute left-0 top-12 w-[43px] h-0.5 bg-[#85BC22] -ml-[3.5rem]"></div>
                    <div className="flex-shrink-0 relative">
                      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#85BC22" strokeWidth="2" strokeDasharray="200 283" strokeDashoffset="-10" opacity="0.7" transform="scale(-1,1) translate(-100,0) rotate(75 50 50)"/>
                      </svg>
                      <div className="w-24 h-24 rounded-full bg-[#85BC22] border-4 border-[#9CD52E] flex items-center justify-center relative z-10">
                        <CreditCard className="w-12 h-12 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Content */}
                <div className="w-full lg:hidden">
                  <div className="border-2 border-[#85BC22] p-4 rounded-lg">
                    <h3 className="text-2xl font-bold text-[#85BC22] mb-4 uppercase text-center">POCKET-FRIENDLY</h3>
                    <p className="text-gray-600 text-base leading-relaxed text-center">We guide you towards Rebates and incentives (STCs & LGCs) to develop packages for you that highlights affordability and price fairness.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications and Accreditations Section */}
      <AboutCertifications />
    </main>
  );
}

