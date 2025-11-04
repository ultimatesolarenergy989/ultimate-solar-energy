import Image from "next/image";
import Link from "next/link";

export default function AirconRebateBanner() {
  return (
    <section className="w-full">
      {/* Banner Image Section */}
      <div className="relative w-full h-[130px] sm:h-[150px] md:h-[250px] lg:h-[350px] xl:h-[500px]">
        <Image
          src="/img/aircon/USE-Aircon-Rebate-2024-Apply-for-Your-AC-Rebate-Today-2048x588.png"
          alt="Save Big with New AC Rebates - Get Up to $7,200"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Content Section Below Banner */}
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Description Text */}
          <p className="text-center text-gray-800 text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-5xl mx-auto">
            Get up to $7,200 in Victorian Government Energy Upgrade rebates to cut your gas bill this winter. Switch from your ducted gas system to energy-efficient electric split systems, installation included.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
            {/* Get a Free Quote Button */}
            <Link
              href="/get-a-quote"
              className="w-full sm:w-[280px] md:w-[320px] text-center bg-[#5B6DB8] text-white font-semibold py-4 px-8 text-base md:text-lg uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Get a Free Quote</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
            </Link>

            {/* Download Fact Sheet Button */}
            <a
              href="/doc/aircon.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-[280px] md:w-[320px] text-center bg-[#5B6DB8] text-white font-semibold py-4 px-8 text-base md:text-lg uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Download Fact Sheet</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

