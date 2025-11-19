import AirconRebateBanner from "@/components/AirconRebateBanner";
import AcPartnersSlider from "@/components/AcPartnersSlider";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "USE Aircon Rebate 2024 | Government Rebates | Ultimate Solar Energy",
  description: "Learn about the USE Aircon Rebate 2024 program. Get government rebates on energy-efficient air conditioning systems when combined with solar. Save money and stay comfortable.",
  keywords: [
    "aircon rebate 2024",
    "USE aircon rebate",
    "air conditioning rebate",
    "government aircon rebate",
    "energy efficient aircon"
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function UseAirconRebate2024Page() {
  return (
    <main>
      <AirconRebateBanner />
      
      {/* Energy Savings Section */}
      <section className="w-full bg-[#FFD700] py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black text-center">
            Slash Your Energy Bills by Up to $2,000 Annually!
          </h2>
        </div>
      </section>

      {/* Fact Check and Benefits Section */}
      <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Fact Check */}
          <div className="mb-8">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              <span className="font-bold text-gray-800">Fact Check:</span> Switching to an electric reverse cycle split system is the best way to reduce your energy bills and greenhouse emissions. It's the most efficient and cost-effective heating option.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Already have both gas heating and a reverse cycle air conditioner? Just use the air conditioner for instant savings with <span className="font-bold text-gray-800">no extra cost!</span>
            </p>
          </div>

          {/* What's in it for You */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              What's in it for You?
            </h3>
            <ul className="space-y-4">
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                <span className="font-bold text-gray-800">Financial Assistance:</span> Get help upgrading old units or installing new, energy-efficient systems.
              </li>
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                <span className="font-bold text-gray-800">Lower Bills:</span> Enjoy reduced heating and cooling costs.
              </li>
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                <span className="font-bold text-gray-800">Eco-Friendly:</span> Contribute to a greener planet by using less energy.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Let's Get Started Section */}
      <section className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Yellow Heading */}
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFD700] uppercase mb-3">
              LET'S GET STARTED!
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Enhance your comfort and keep more money in your pocket
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-12">
            {/* Left Column - Text Content */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#002866] mb-6">
                What are VEU Rebates?
              </h3>

              <div className="space-y-6">
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Victorian households typically spend about a third of their energy bills on heating. The Victorian Energy Upgrades (VEU) program offers incentives for upgrading to multi-head reverse cycle air conditioners, which provide heating and cooling.
                </p>

                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Switching from old gas heating systems to energy-efficient ones lowers heating and cooling costs and reduces energy consumption, leading to ongoing savings.
                </p>

                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Are you interested in the Victorian split system air conditioner rebate? We can help you get your multi-head split system air conditioner before the VEU aircon rebates expire.
                </p>
              </div>

              <Link
                href="/contacts"
                className="inline-block mt-8 bg-[#5B6DB8] text-white font-semibold py-4 px-8 text-base md:text-lg uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Request Upgrade</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
              </Link>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <Image
                  src="/img/aircon/Asset-1@4x-727x1024.png"
                  alt="Victorian Energy Upgrades"
                  width={727}
                  height={1024}
                  className="w-[300px] h-[300px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Yellow Banner */}
      <section className="w-full bg-[#FFD700] py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-black text-center">
            Make a Switch from Gas to Energy, and Save $1,000's!
          </h3>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Introduction Text */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 text-center mb-6">
              Ducted gas heating is the most costly and polluting way to heat your home
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
              Methane gas contributes to 17% of all Victoria's greenhouse gas emissions, and most of it comes from gas home heating. The biggest barrier for households to switch to an energy-efficient reverse cycle air conditioner is the upfront cost – Fortunately, Victorian government aircon rebate, users can now receive up to $8,000 in incentives to help them upgrade.
            </p>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Reverse cycle air conditioners are much cheaper to operate better for the environment, safe for health, and reduce carbon footprint.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-[#002866] rounded-3xl p-6 md:p-10 lg:p-12">
            {/* Comparison Header */}
            <div className="text-center mb-8">
              <div className="inline-block bg-[#FFD700] px-8 py-2 mb-4">
                <span className="text-black font-semibold text-lg md:text-xl italic">
                  COMPARISON OF
                </span>
              </div>
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">
                Reverse-Cycle and Split-System Air Conditioners
              </h3>
            </div>

            {/* Comparison Table Grid */}
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Header Row */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="border-2 border-white p-4 text-center">
                    <h4 className="text-white text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wide">
                      FEATURES
                    </h4>
                  </div>
                  <div className="border-2 border-white p-4 text-center">
                    <h4 className="text-white text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wide">
                      REVERSE-CYCLE
                    </h4>
                  </div>
                  <div className="border-2 border-white p-4 text-center">
                    <h4 className="text-white text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wide">
                      SPLIT-SYSTEM
                    </h4>
                  </div>
                </div>

                {/* Functionality Row */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Functionality</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Provides both heating and cooling</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Can be either cooling-only or reverse-cycle</p>
                  </div>
                </div>

                {/* Winter Heating Row */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Winter Heating</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Absorbs heat from outside to warm interiors</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Cooling-only units cannot heat; reverse-cycle can</p>
                  </div>
                </div>

                {/* Mechanism Row */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Mechanism</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Reverses refrigerant flow to switch between heating and cooling</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Uses refrigerant for cooling (and heating in reverse-cycle)</p>
                  </div>
                </div>

                {/* Seasonal Use Row */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Seasonal Use</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Suitable for year-round use</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Suitable for year-round use</p>
                  </div>
                </div>

                {/* Temperature Adaptability Row */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Temperature Adaptability</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Ideal for areas with fluctuating temperatures</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Depends on type: cooling-only or reverse-cycle</p>
                  </div>
                </div>

                {/* Unit Composition Row */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Unit Composition</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">N/A</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Consists of two units: indoor and outdoor</p>
                  </div>
                </div>

                {/* Installation Row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Installation</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">N/A</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Usually installed on a wall inside and outside</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rebate Information Section */}
      <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Rebate Introduction */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002866] mb-6 uppercase tracking-wide">
              REBATE INTRODUCTION
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
              The new rebate offers a value of $4,000-$6,000 for AC due to its high energy efficiency. For a limited time, we have a special offer for a combo of 3 split systems (3KW + 5KW + 8KW) ideal for a lounge, master bedroom, and a standard bedroom. The{' '}
              <span className="font-bold text-gray-800">out-of-pocket</span> cost will be:
            </p>
            <ul className="list-disc list-inside space-y-3 mb-8 ml-4">
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                $0 upfront cost with an interest-free loan, approximately $22 per week for 3 years, starting after installation.
              </li>
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                This offer includes standard installation, a 5-year product warranty, and a 5-year installation warranty (VBA & COES).
              </li>
            </ul>
          </div>

          {/* Important to Note */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002866] mb-6 uppercase tracking-wide">
              IMPORTANT TO NOTE:
            </h2>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                Pricing for 4-unit and 5-unit combos is also available.
              </li>
              <li className="text-gray-700 text-base md:text-lg leading-relaxed mb-3">
                A service fee is charged for double-story homes due to the extra manpower required to address safety and technical challenges.
              </li>
            </ul>
            <ul className="list-none space-y-2 ml-8">
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                ○ Amount = $450 + ($150 per unit installed upstairs).
              </li>
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                ○ For example, for a 3-unit combo with 2 units installed upstairs, the service fee would be $450 + (2 * $150) = $750.
              </li>
            </ul>
          </div>

          {/* AC Product Introduction */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002866] mb-6 uppercase tracking-wide">
              AC PRODUCT INTRODUCTION
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              A multi-split AC system features multiple indoor units powered by a single outdoor unit. Currently, it qualifies for the highest rebate. Developed and manufactured by GD TCL Intelligent Heating and Ventilating Equipment Co. Ltd., these ACs are among the four largest AC manufacturers in the world, and AEA is the largest service provider under the VEU.
            </p>
          </div>

          {/* Key Benefits */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#002866] mb-6 uppercase tracking-wide">
              KEY BENEFITS
            </h3>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                Combined heating and cooling energy rating of 7 stars
              </li>
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                Both heating and cooling for individual rooms
              </li>
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                Premium quality at a non-premium price
              </li>
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                Immediate post-installation support
              </li>
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                Expected product lifespan of 15-20 years
              </li>
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                Savings of up to 70% on your current heating costs and up to 60% on your current cooling costs
              </li>
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                Increasing savings each year as gas prices rise faster than electricity prices
              </li>
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                Easier and cheaper ongoing maintenance compared to other central heating and cooling options.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Price Breakdown Section */}
      <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Price Table */}
          <div className="bg-[#002866] rounded-3xl p-6 md:p-10 lg:p-12">
            {/* Table Header */}
            <div className="text-center mb-8">
              <div className="inline-block bg-[#FFD700] px-8 py-2">
                <span className="text-black font-semibold text-lg md:text-xl italic">
                  CHECK THE PRICE BREAKDOWN BELOW:
                </span>
              </div>
            </div>

            {/* Pricing Table Grid */}
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Header Row */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    {/* Empty cell */}
                  </div>
                  <div className="border-2 border-white p-4 text-center">
                    <h4 className="text-white text-lg md:text-xl lg:text-2xl font-bold uppercase">
                      3 UNITS
                    </h4>
                  </div>
                  <div className="border-2 border-white p-4 text-center">
                    <h4 className="text-white text-lg md:text-xl lg:text-2xl font-bold uppercase">
                      4 UNITS
                    </h4>
                  </div>
                  <div className="border-2 border-white p-4 text-center">
                    <h4 className="text-white text-lg md:text-xl lg:text-2xl font-bold uppercase">
                      5 UNITS
                    </h4>
                  </div>
                </div>

                {/* Rebate Row */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Rebate</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$4,000</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$5,000</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$6,000</p>
                  </div>
                </div>

                {/* Promotion Row */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Promotion</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$800</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$800</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$800</p>
                  </div>
                </div>

                {/* 3KW Row */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">3KW</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$600</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$600</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$600</p>
                  </div>
                </div>

                {/* 5KW Row */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">5KW</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$800</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$800</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$800</p>
                  </div>
                </div>

                {/* 8KW Row */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">8KW</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$1,000</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$1,000</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$1,000</p>
                  </div>
                </div>

                {/* Condenser Row */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Condenser</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$3,499</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$4,199</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$4,899</p>
                  </div>
                </div>

                {/* Installation Row */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Installation ($700 per IU)</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$2,100</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$2,800</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$3,500</p>
                  </div>
                </div>

                {/* Retail (Product Only) Row */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Retail (Product Only)</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$5,899</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$7,199</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$8,499</p>
                  </div>
                </div>

                {/* Retail (Incl. Installation) Row */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Retail (Incl. Installation)</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$7,999</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$9,999</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$11,999</p>
                  </div>
                </div>

                {/* Out-of-pocket Price (Payment Plan) Row */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Out-of-pocket Price<br />(Payment Plan)</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$3,199</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$4,199</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$5,199</p>
                  </div>
                </div>

                {/* Out-of-pocket Price (Upfront) Row */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Out-of-pocket Price<br />(Upfront w/ $200 discount)</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$2,999</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$3,999</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$4,999</p>
                  </div>
                </div>

                {/* Extra charges for Double Storey Row */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">Extra charges for Double Storey</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$450 + ($150 x No. of units upstairs)</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$450 + ($150 x No. of units upstairs)</p>
                  </div>
                  <div className="border-2 border-white p-4">
                    <p className="text-white text-base md:text-lg">$450 + ($150 x No. of units upstairs)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Extra Charges Information */}
          <div className="mt-10">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              Extra charges that cannot be avoided due to double-storey complications:
            </p>
            <ul className="list-disc list-inside space-y-3 ml-4 mb-8">
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                <span className="font-bold text-gray-800">Extra Worker and Safety:</span> $450
              </li>
              <li className="text-gray-700 text-base md:text-lg leading-relaxed">
                <span className="font-bold text-gray-800">Each unit installed upstairs</span> increases time by 1.5 hours: $150 x Number of units
              </li>
            </ul>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              For more product information and official accreditation, review this{' '}
              <a href="/doc/aircon.pdf" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] font-semibold hover:underline">
                document
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* AC Partners Slider Section */}
      <AcPartnersSlider />
    </main>
  );
}

