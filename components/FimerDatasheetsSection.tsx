import Image from "next/image";
import Link from "next/link";

export default function FimerDatasheetsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Datasheets and Manuals */}
          <div>
            {/* DATASHEETS Section */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#002866] mb-6 uppercase">
                DATASHEETS
              </h2>
              <div className="space-y-3">
                <Link
                  href="/doc/FIMER_PVS-10-125-15-TL__EN_Rev_C.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-700 hover:text-[#002866] hover:underline text-lg transition-colors duration-200"
                >
                  Technical Datasheet - PVS-10/15
                </Link>
                <Link
                  href="/doc/FIMER_PVS-20-30-33-TL_EN_Rev_B.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-700 hover:text-[#002866] hover:underline text-lg transition-colors duration-200"
                >
                  Technical Datasheet - PVS-20/33
                </Link>
              </div>
            </div>

            {/* PRODUCT MANUALS Section */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#002866] mb-6 uppercase">
                PRODUCT MANUALS
              </h2>
              <div className="space-y-3">
                <Link
                  href="/doc/FIMER_PVS-10_12.5_15-TL_Product-manual_EN_RevB.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-700 hover:text-[#002866] hover:underline text-lg transition-colors duration-200"
                >
                  Technical Datasheet - PVS-10/15
                </Link>
                <Link
                  href="/doc/FIMER_PVS-20_30_33-TL_Product-manual_EN_RevA.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-700 hover:text-[#002866] hover:underline text-lg transition-colors duration-200"
                >
                  Technical Datasheet - PVS-20/33
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Image and Warranty Document */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md mb-6">
              {/* Yellow background accent */}
              <div className="absolute top-0 right-0 w-3/4 h-48 bg-[#FFD700] -z-10"></div>
              
              {/* Inverter Image */}
              <div className="relative bg-white shadow-xl p-4">
                <Image
                  src="/img/PVS-10-15.jpg"
                  alt="Fimer PVS-10/15 Inverter"
                  width={400}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Warranty Document Text */}
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 uppercase">
                FIMER AUSTRALIA WARRANTY DOCUMENT
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

