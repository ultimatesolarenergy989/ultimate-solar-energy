import Image from "next/image";
import Link from "next/link";

export default function AboutCertifications() {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* 1. REC CERTIFIED PROFESSIONAL INSTALLERS */}
        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <div className="bg-white p-8 border border-gray-200 w-full max-w-[400px]">
                <div className="w-full h-[180px] flex items-center justify-center">
                  <Image
                    src="/img/about/rec-pro.png"
                    alt="REC Certified Solar Professional"
                    width={400}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#002866] mb-4 uppercase tracking-wide">
                REC CERTIFIED PROFESSIONAL INSTALLERS
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                At USE we have undertaken the necessary training to become REC Certified Professional Installers. This means we are able to exclusively offer a 25-year ProTrust Warranty covering product, performance and labour when you choose us to install your REC panels.
              </p>
            </div>
          </div>
        </div>

        {/* 2. FIMER DEALER */}
        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <div className="bg-white p-8 border border-gray-200 w-full max-w-[400px]">
                <div className="w-full h-[180px] flex items-center justify-center">
                  <Image
                    src="/img/about/fimer.png"
                    alt="FIMER"
                    width={400}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#002866] mb-4 uppercase tracking-wide">
                FIMER DEALER
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                Ultimate Solar Energy is proud to be an authorised FIMER dealer in Australia, which allows our customers to formally access FIMER's 12-year UNO Extended warranty program. USE's selected customers can benefit from longer peace of mind and look forward to enjoying their PV system even more
              </p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed italic">
                <span className="font-semibold">Note:</span>We advise all our customers to please make sure to register the inverter (serial number) to make sure it comes with the extended 12 years warranty, as it won't come automatically. Please visit this page here:{" "}
                <a
                  href="https://www.fimer.com/au-uno-warranty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  https://www.fimer.com/au-uno-warranty
                </a>{" "}
                to view the specifics of the warranty, and follow the link at the bottom of the page to register for the warranty.
              </p>
            </div>
          </div>
        </div>

        {/* 3. CEC APPROVED SOLAR */}
        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <div className="bg-white p-8 border border-gray-200 w-full max-w-[400px]">
                <div className="w-full h-[180px] flex items-center justify-center">
                  <Image
                    src="/img/about/cec-approved.png"
                    alt="CEC Approved Solar Retailer"
                    width={400}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#002866] mb-4 uppercase tracking-wide">
                CEC APPROVED SOLAR
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                Ultimate Solar Energy are proud to be certified as a Clean Energy Council Approved Solar Retailer. We have signed on to the Clean Energy Council Solar Retailer Code of Conduct – the only solar industry code of conduct authorised by the Australian Competition and Consumer Commission (ACCC)
              </p>
              <Link
                href="#"
                className="text-gray-700 text-base md:text-lg underline hover:text-[#002866]"
              >
                Find out more...
              </Link>
            </div>
          </div>
        </div>

        {/* 4. REGISTERED WITH SOLAR VICTORIA */}
        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <div className="bg-white p-8 border border-gray-200 w-full max-w-[400px]">
                <div className="w-full h-[180px] flex items-center justify-center">
                  <Image
                    src="/img/about/solar-victoria.png"
                    alt="Solar Victoria"
                    width={400}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#002866] mb-4 uppercase tracking-wide">
                REGISTERED WITH SOLAR VICTORIA
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Ultimate Solar Energy is registered and approved Solar installer with Solar Victoria. This allows us to provide eligible households with subsidies for solar installations under the Solar Victoria rebate scheme to help Victorian home owners and Businesses.
              </p>
            </div>
          </div>
        </div>

        {/* 5. MASTER ELECTRICIANS */}
        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <div className="bg-white p-8 border border-gray-200 w-full max-w-[400px]">
                <div className="w-full h-[180px] flex items-center justify-center">
                  <Image
                    src="/img/about/master-electrician.png"
                    alt="Bronze Master Electrician"
                    width={400}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#002866] mb-4 uppercase tracking-wide">
                MASTER ELECRICIANS
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                USE is proud to be a member of MEA and works alongside our team seeking help and advice, access to business tools and savings, all designed to run safe, sustainable and profitable businesses. MEA recognizes achieving these goals requires time, experience, a quality safety system supported by appropriate policies and procedures and the ongoing development of business acumen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

