"use client";
import Link from "next/link";
import Image from "next/image";

export default function BoostSystem() {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#002866] mb-6">
            6.6 KW BOOST SYSTEM
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-5xl mx-auto mb-6">
          The USE is an authorized FIMER dealer in Australia, which is one of the largest inverter suppliers in Italy, formerly known as ABB, which means our customer can claim 2 years extra warranty on FIMER (ABB ) inverters unlike other solar companies and also get exclusive support and benefits. The 6.6kw Boost Package will save you anywhere between $890 to $1,917 per year off your electricity bill, depending on your location and Electricity consumption. Maximize your opportunity and savings. Suitable for households spending up to $1000 or more per year.
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
                  5KW Sungrow Inverter
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
                15X 440 n-type Bifacial <br/>
                Double Glass High <br/>
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
                <p className="text-[#FFD700] font-bold text-base">x60</p>
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
                <p className="text-[#FFD700] font-bold text-base">x5</p>
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
                <p className="text-[#FFD700] font-bold text-base">x10</p>
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
                <p className="text-[#FFD700] font-bold text-base">x5</p>
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
                  Approximate Annual Output Between 8100kwh – 9400kwh
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#FFD700] mt-2"></div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  CEC Approved Tier 1 440w Solar Panels n-type Bifacial Double Glass High-Efficiency Mono Module
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#FFD700] mt-2"></div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  World's top 10 listed (Bloomberg Tier-1 Brand)
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#FFD700] mt-2"></div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  EUPD's Australia 2021 award winner panels
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#FFD700] mt-2"></div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  CEC Approved Double Tracker 5kw Wifi Inverter ( top 3 listed in worldwide ranking )
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#FFD700] mt-2"></div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  European top listed inverter brand ( made in Italy )
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#FFD700] mt-2"></div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Aluminium and Stainless Steel Mounting kit ( Approved by Clean Energy Council)
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#FFD700] mt-2"></div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Cyclone Rated Frame and Panels to Withstand High Loads
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#FFD700] mt-2"></div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Complete Installation by CEC Accredited Installer
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center text-gray-700 text-xs leading-relaxed">
              At Ultimate Solar Energy We Make Sure Our Work to Be In Accordance With Clean Energy Council's Guidelines. We Only Use CEC Accredited Installers To Install Premium Quality Products, get obligation free customise quote for your home to know more about this package.
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
            {/* 6.6 KW Ultimate System */}
            <div className="border-2 border-gray-300 p-6 bg-white hover:border-[#FFD700] transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-bold text-[#002866] text-center mb-6 pb-3 border-b-2 border-gray-300">
                6.6 KW ULTIMATE SYSTEM
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
                    5Kw Goodwe Inverter
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
                  Panels <br/>  
                  15X 440 n-type Bifacial Double<br/>
                  Glass High Efficiency Mono<br/>
                  Module (Tier 1)
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <Link 
                  href="/products/6-6-kw-ultimate-system"
                  className="inline-block bg-[#FFD700] text-[#002866] font-bold py-2 px-6 text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">FIND OUT MORE</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
                </Link>
              </div>
            </div>

            {/* 6.6 KW Platinum System */}
            <div className="border-2 border-gray-300 p-6 bg-white hover:border-[#FFD700] transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-bold text-[#002866] text-center mb-6 pb-3 border-b-2 border-gray-300">
                6.6 KW PLATINUM SYSTEM
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
                    5KW Fronius Primo Gen24
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
                    15X 440 n-type Bifacial Double<br/>
                    Glass High Efficiency Mono<br/>
                    Module (Tier 1)
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <Link 
                  href="/products/6-6-kw-platinum-system/"
                  className="inline-block bg-[#FFD700] text-[#002866] font-bold py-2 px-6 text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">FIND OUT MORE</span>
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

