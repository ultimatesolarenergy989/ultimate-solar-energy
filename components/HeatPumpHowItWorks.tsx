import Link from "next/link";

export default function HeatPumpHowItWorks() {
  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002866] text-center mb-12 md:mb-16">
          How it works?
        </h2>

        {/* Three Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 mb-12 md:mb-16">
          {/* Step 1 - Register */}
          <div className="relative flex flex-col items-start text-left  p-6 rounded-lg">
            {/* Large Number Background */}
            <div className="absolute top-0 left-0 w-full h-full flex items-start justify-start pointer-events-none opacity-10">
              <span className="text-[120px] md:text-[140px] lg:text-[160px] font-bold text-[#FFD700] leading-none pl-2 pt-2">
                1
              </span>
            </div>
            
            {/* Content */}
            <div className="relative z-10 pl-12">
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                <span className="font-bold text-[#002866]">Register:</span> Fill out the{" "}
                <Link href="/get-a-quote" className="text-[#FFD700] font-semibold hover:underline">
                  Free Quote
                </Link>{" "}
                form to see if you qualify.
              </p>
            </div>
          </div>

          {/* Step 2 - Confirm */}
          <div className="relative flex flex-col items-start text-left  p-6 rounded-lg">
            {/* Large Number Background */}
            <div className="absolute top-0 left-0 w-full h-full flex items-start justify-start pointer-events-none opacity-10">
              <span className="text-[120px] md:text-[140px] lg:text-[160px] font-bold text-[#FFD700] leading-none pl-2 pt-2">
                2
              </span>
            </div>
            
            {/* Content */}
            <div className="relative z-10 pl-[80px]">
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                <span className="font-bold text-[#002866]">Confirm:</span> Expect a call from our team to confirm eligibility.
              </p>
            </div>
          </div>

          {/* Step 3 - Install */}
          <div className="relative flex flex-col items-start text-left  p-6 rounded-lg">
            {/* Large Number Background */}
            <div className="absolute top-0 left-0 w-full h-full flex items-start justify-start pointer-events-none opacity-10">
              <span className="text-[120px] md:text-[140px] lg:text-[160px] font-bold text-[#FFD700] leading-none pl-2 pt-2">
                3
              </span>
            </div>
            
            {/* Content */}
            <div className="relative z-10 pl-[85px]">
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                <span className="font-bold text-[#002866]">Install:</span> Schedule your installation with our expert plumbers or electricians on a convenient date.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[#002866] rounded-lg px-6 py-6 md:py-8 text-center">
          <p className="text-white text-base md:text-lg lg:text-xl font-semibold">
            It's that simple! Say goodbye to cold showers and hello to comfort with ease!
          </p>
        </div>
      </div>
    </section>
  );
}

