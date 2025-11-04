"use client";
import Image from "next/image";

export default function EvChargersWhyChoose() {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Introduction Text */}
        <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center max-w-5xl mx-auto mb-10">
          Ultimate Solar Energy is your premier destination for solar EV chargers that combine solar power with the convenience of electric vehicle charging. Our solar EV chargers provide cutting-edge solutions for sustainable transportation, helping you reduce your carbon footprint while enjoying the benefits of clean and renewable energy.
        </p>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#002866] text-center mb-12">
          Why Choose Solar EV Chargers?
        </h2>

        {/* Single Image with All Diamond Shapes */}
        <div className="flex justify-center">
          <Image
            src="/img/ev-choose/ev-choose-img.jpg"
            alt="Why Choose Solar EV Chargers - Eco-Friendly, Cost Savings, Energy Independence, Seamless Integration, Worry-free Charging"
            width={1200}
            height={600}
            className="w-full max-w-6xl h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}

