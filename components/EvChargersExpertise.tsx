"use client";
import Image from "next/image";

export default function EvChargersExpertise() {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#002866] text-center mb-12">
          Why Choose Us?
        </h2>

        {/* Single Image with All Circular Badges */}
        <div className="flex justify-center mb-12">
          <Image
            src="/img/ev-choose/ev-experties-img.jpg"
            alt="Why Choose Us - Expertise, Quality, Installation, Customer Satisfaction"
            width={1200}
            height={300}
            className="w-full max-w-6xl h-auto object-contain"
            priority
          />
        </div>

        {/* Call to Action */}
        <p className="text-lg md:text-xl text-[#002866] text-center font-semibold leading-relaxed max-w-5xl mx-auto">
          Let's Get Started! Contact us today to unlock the full potential of solar energy for your home or business.
        </p>
      </div>
    </section>
  );
}

