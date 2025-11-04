"use client";
import Image from "next/image";

export default function EvChargerBanner() {
  return (
    <section className="relative w-full bg-gray-900">
      {/* Banner Container */}
      <div className="relative w-full h-[200px] sm:h-[200px] md:h-[350px] lg:h-[500px] xl:h-[700px]">
        <Image
          src="/img/ev-choose/solar-ev-banner.jpg"
          alt="Solar EV Chargers"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={100}
        />
        
        {/* Optional Overlay for better text visibility if needed */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
    </section>
  );
}

