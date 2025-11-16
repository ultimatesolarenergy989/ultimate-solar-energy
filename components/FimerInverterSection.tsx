import Image from "next/image";
import { Check } from "lucide-react";

export default function FimerInverterSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <Image
                src="/img/fimer-inverter.jpg"
                alt="Fimer PVS-10/33 Inverter"
                width={500}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#002866] mb-6 uppercase">
              CHOOSE THE PVS-10/33 FOR YOUR BUSINESS
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              The PVS-10/33 is the new FIMER three-phase solution and is ideal for residential, commercial, 
              industrial applications as it offers the latest inverter technology in a sleek, compact design.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              It has been designed for easy installation, reduced maintenance and improved safety.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Highlights of the PVS-10/33
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed">
                  Designed and manufactured in Italy
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed">
                  It can be installed inside or outside
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed">
                  Up to 10 Year Full Replacement Warranty
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed">
                  Built-in Wi-fi
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed">
                  Built-in DC Isolator for extra safety
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed">
                  Maximum efficiency of 98.5%
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed">
                  Even with minimal shading, get optimal energy generation with FIMER's PowerGain Technology.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed">
                  2/4 MPPT's for flexible solar designs
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed">
                  Export limitation (with compatible Smart Energy Meter)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

