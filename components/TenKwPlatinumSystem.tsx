"use client";
import Link from "next/link";
import Image from "next/image";

export default function TenKwPlatinumSystem() {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#002866] mb-6">
            10.5 KW PLATINUM SYSTEM
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-5xl mx-auto mb-6">
          The USE is partnered with Fronius which is an Austrian based inverter company to supply, instal and remotely moniter high quality inverters across Australia. The 10kw platinum Package will save you anywhere between $2200 to $4000 per year off your electricity bill, depending on your location and Electricity consumption. Maximise your opportunity and savings. Suitable for households spending up to $1600 or more per year.
          </p>
          
          <Link 
            href="/get-a-quote"
            className="inline-block bg-[#FFD700] text-[#002866] font-bold py-3 px-8 text-sm md:text-base uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">CLICK HERE FOR A FREE QUOTE</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
          </Link>
        </div>

        {/* Main Grid - Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* What's Included */}
          <div className="border-2 border-gray-300 p-6 bg-white hover:border-[#FFD700] transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl font-bold text-[#002866] text-center mb-8 border-b-2 border-gray-300 pb-3">
              WHAT'S INCLUDED
            </h2>
            <div className="flex justify-around items-center divide-x divide-gray-300">
              <div className="text-center flex-1 px-4">
                <div className="mb-3 flex justify-center">
                  <Image
                    src="/img/product/icons/icon-inverter.png"
                    alt="Inverter"
                    width={64}
                    height={64}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="text-[#FFD700] font-bold text-sm">
                  8KW Fronius Primo<br/>Gen24/ 8Kw SMA
                </p>
              </div>
              
              <div className="text-center flex-1 px-4">
                <div className="mb-3 flex justify-center">
                  <Image
                    src="/img/product/icons/icon-solar-panel1.png"
                    alt="Solar Panel"
                    width={64}
                    height={64}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="text-[#FFD700] font-bold text-sm">
                  24X 440 n-type Bifacial<br/>
                  Double Glass High<br/>
                  Efficiency Mono Module<br/>
                  (Tier 1)
                </p>
              </div>
            </div>
          </div>

          {/* This Will Power Up */}
          <div className="border-2 border-gray-300 p-6 bg-white hover:border-[#FFD700] transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl font-bold text-[#002866] text-center mb-8 border-b-2 border-gray-300 pb-3">
              THIS WILL POWER UP
            </h2>
            <div className="flex justify-around items-center divide-x divide-gray-300">
              {/* Light Bulb */}
              <div className="text-center flex-1 px-2">
                <div className="mb-2 flex justify-center">
                  <Image
                    src="/img/product/icons/power-icon1.png"
                    alt="Light Bulb"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <p className="text-[#FFD700] font-bold text-base">x90</p>
              </div>
              
              {/* TV */}
              <div className="text-center flex-1 px-2">
                <div className="mb-2 flex justify-center">
                  <Image
                    src="/img/product/icons/power-icon2.png"
                    alt="TV"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <p className="text-[#FFD700] font-bold text-base">x7</p>
              </div>
              
              {/* Computer/Desktop */}
              <div className="text-center flex-1 px-2">
                <div className="mb-2 flex justify-center">
                  <Image
                    src="/img/product/icons/power-icon3.png"
                    alt="Computer"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <p className="text-[#FFD700] font-bold text-base">x15</p>
              </div>
              
              {/* Refrigerator */}
              <div className="text-center flex-1 px-2">
                <div className="mb-2 flex justify-center">
                  <Image
                    src="/img/product/icons/power-icon4.png"
                    alt="Refrigerator"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <p className="text-[#FFD700] font-bold text-base">x7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid - Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Features */}
          <div className="border-2 border-gray-300 p-6 bg-white hover:border-[#FFD700] transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl font-bold text-[#002866] text-center mb-6 border-b-2 border-gray-300 pb-3">
              FEATURES
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#FFD700] mt-2"></div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Platinum package includes the option to choose the panel from 3 different largest brands and comes with free advanced monitoring device to monitor consumption and production remotely.
                </p>
              </div>
            </div>
            
            
          </div>

          {/* Warranty */}
          <div className="border-2 border-gray-300 p-6 bg-white hover:border-[#FFD700] transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl font-bold text-[#002866] text-center mb-6 border-b-2 border-gray-300 pb-3">
              WARRANTY
            </h2>
            
            <div className="text-gray-700 text-sm leading-relaxed mb-6">
              <p className="mb-4">
                Ultimate Solar Energy's quality assurance team choose one of the best available products in the market at such rate and Our supply partners have their solid technical in major cities around the country.
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#FFD700] mt-2"></div>
                  <p>25 Years Product Warranty</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#FFD700] mt-2"></div>
                  <p>30 Years Linear Power Output Warranty</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#FFD700] mt-2"></div>
                  <p>10 Years Inverter Warranty</p>
                </div>
              </div>
              
              {/* Warranty Badges */}
              <div className="flex justify-center items-center mt-8">
                <Image
                  src="/img/product/warranty.png"
                  alt="Warranty - 25 Years, 30 Years, 10 Years"
                  width={400}
                  height={150}
                  className="w-auto h-auto max-w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* HOW MUCH CAN I SAVE Section */}
        <div className="bg-white border-2 border-gray-300 p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#002866] text-center mb-6 uppercase">
            HOW MUCH CAN I SAVE ON A 10KW SOLAR POWER SYSTEM?
          </h2>
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            The amount of cash you make from a 10kW system will depend on how much you get paid for exported electricity (solar feed in tariffs) and how much you self consume.
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            Feed in tariffs in Australia pay anywhere from 6c to 20c, depending on the retailer. Let's work on 7c per kWh for exported electricity. Most people pay about 30c per kWh to buy electricity from the grid. So let's consider 3 scenarios to see how the payback works:
          </p>
          <div className="space-y-2">
            <p className="text-gray-700 text-base leading-relaxed">
              <span className="font-bold">1) Use all the solar electricity in your (huge) home or business:</span> You would save approximately $4400 in the first year. And about $148,000 over 20 years assuming electricity price rises of 5% per year.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              <span className="font-bold">2) Export half the electricity:</span> You would save about $2700 in the first year.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              <span className="font-bold">3) Export all the electricity:</span> You would save about $900 in the first year.
            </p>
          </div>
          <p className="text-gray-700 text-base leading-relaxed mt-4">
            To conclude, it is evident from the above explanation: The more solar energy you self consume, the faster your payback.
          </p>
        </div>

        {/* ROI Section */}
        <div className="bg-white border-2 border-gray-300 p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#002866] text-center mb-6 uppercase">
            HOW LONG BEFORE A 10KW SOLAR POWER SYSTEM PAYS FOR ITSELF?
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            If you are using all the electricity on-site then a 10kW will have paid for itself in under 3-4 years, assuming you pay 30c for your electricity from the grid and electricity prices rise at 5% per year. After that the electricity is free apart from a small maintenance cost.
          </p>
        </div>

        {/* Bottom Button */}
        <div className="text-center mb-12">
          <Link 
            href="/get-a-quote"
            className="inline-block bg-[#FFD700] text-[#002866] font-bold py-3 px-8 text-sm md:text-base uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">CLICK HERE FOR A FREE QUOTE</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
          </Link>
        </div>

        {/* Other Packages Section */}
        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#002866] text-center mb-8">
            OTHER PACKAGES IN THIS RANGE
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 10 KW Ultimate System */}
            <div className="border-2 border-gray-300 p-6 bg-white hover:border-[#FFD700] transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-bold text-[#002866] text-center mb-6 pb-3 border-b-2 border-gray-300">
                10 KW ULTIMATE SYSTEM
              </h3>
              
              <div className="flex justify-around items-center mb-6 divide-x divide-gray-300">
                <div className="text-center flex-1 px-4">
                  <div className="mb-3 flex justify-center">
                    <Image
                      src="/img/product/icons/icon-inverter.png"
                      alt="Inverter"
                      width={56}
                      height={56}
                      className="w-14 h-14 object-contain"
                    />
                  </div>
                  <p className="text-gray-700 font-semibold text-sm">
                    Inverter<br/>
                    8.5KW Goodwe MS Inverter / 8KW Sungrow Inverter
                  </p>
                </div>
                
                <div className="text-center flex-1 px-4">
                  <div className="mb-3 flex justify-center">
                    <Image
                      src="/img/product/icons/icon-solar-panel1.png"
                      alt="Solar Panel"
                      width={56}
                      height={56}
                      className="w-14 h-14 object-contain"
                    />
                  </div>
                  <p className="text-gray-700 font-semibold text-sm">
                    Panels<br/>
                    23X 440 n-type Bifacial Double<br/>
                    Glass High Efficiency Mono<br/>
                    Module (Tier 1)
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <Link 
                  href="/products/10-kw-ultimate-system"
                  className="inline-block bg-[#FFD700] text-[#002866] font-bold py-2 px-6 text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">VIEW DETAILS</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

