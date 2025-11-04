"use client";
import Image from "next/image";

export default function SolarBatteryBanner() {
  return (
    <section className="relative w-full bg-gray-900">
      {/* Banner Container */}
      <div className="relative w-full h-[170px] sm:h-[200px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
        <Image
          src="/img/solar-services/solar-service-banner.jpg"
          alt="Solar Battery Storage"
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

