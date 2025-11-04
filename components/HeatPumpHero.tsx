"use client";
import Image from "next/image";
import Link from "next/link";

export default function HeatPumpHero() {
  return (
    <section className="relative bg-[#D4F1F4] lg:bg-cover lg:bg-center py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundImage: "var(--bg-image)" }}>
      <style jsx>{`
        section {
          --bg-image: none;
        }
        @media (min-width: 1024px) {
          section {
            --bg-image: url('/img/heat-pump/USE-Landing-Page.jpg');
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002866] mb-4 leading-tight">
              Get Hot Water<br />
              for Your Home
            </h1>
            
            <div className="bg-[#FFD700] inline-block px-4 py-2 mb-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
                Without Breaking the Bank!
              </h2>
            </div>

            <p className="text-[#002866] text-base md:text-lg font-semibold mb-4">
              Discover the Ultimate Solution: Energy-efficient Hot Water Heat Pumps with Exclusive VIC Government Rebates!
            </p>

            <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
              Are you tired of sky-high utility bills? Say goodbye to expensive hot water systems and hello to cost-effective comfort! Our discounted heat pumps not only provide you with luxurious hot water but also qualify for lucrative rebates from the VIC Government.
            </p>

            <Link 
              href="/get-a-quote"
              className="inline-block bg-[#002866] text-white font-bold py-3 px-8 text-sm md:text-base uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Get a Free Quote</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
            </Link>
          </div>

          
        </div>
      </div>
    </section>
  );
}

