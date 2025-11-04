"use client";
import Image from "next/image";

export default function HybridSolarSystem() {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <div className="text-center mb-3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002866] mb-2">
            SOLAR BATTERY STORAGE
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Unlock a 20c Solar Feed-in Tariff
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-12 items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Section 1: How Does a Hybrid Solar System Work */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#002866] mb-4">
                HOW DOES A HYBRID SOLAR SYSTEM WORK ?
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                A Hybrid system works like any other solar system which produces Energy from the Sunlight. The difference is that any excess Energy that your Solar System produces would charge the battery connected to your solar system first before it goes to the grid at your current feed at terrific rates, giving you better ROI on your solar system. If your system generates excess electricity after the battery is fully charged, excess energy then goes to the grid and you get paid a standard feed in tariff rate.
              </p>
            </div>

            {/* Section 2: Can I Use Electricity Supply During Blackouts */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#002866] mb-4">
                CAN I USE ELECTRICITY SUPPLY DURING BLACKOUTS?
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                Yes ! We install Emergency power supply (EPS) in most of our Hybrid systems, which allows you to use stored Electricity in the event of a power outage.
              </p>
            </div>
          </div>

          {/* Right Column - GIF Image */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-[600px] h-auto bg-[#2c4a66] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/img/solar-battery/solar-system-with-battery.gif"
                alt="Solar System with Battery - How it works"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                unoptimized
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

