import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CEC Approved Solar Retailer | Accredited Solar Company | Ultimate Solar Energy",
  description: "Ultimate Solar Energy is a Clean Energy Council (CEC) approved solar retailer. Trust our accredited team for compliant, quality solar installations across Australia.",
  keywords: [
    "CEC approved retailer",
    "Clean Energy Council approved",
    "accredited solar company",
    "CEC certified solar",
    "approved solar retailer Australia"
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function CECApprovedRetailerPage() {
  return (
    <main className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#002866] mb-8 uppercase text-center lg:text-left">
          ULTIMATE SOLAR ENERGY A CEC APPROVED SOLAR RETAILER
        </h1>

        {/* CEC Logo */}
        <div className="mb-8">
          <Image
            src="/img/CEC-Approved-Solar-Retailer.png"
            alt="Clean Energy Council Approved Solar Retailer"
            width={400}
            height={300}
            className="w-full max-w-md h-auto"
          />
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            <span className="font-bold">Ultimate Solar Energy</span> is delighted to announce itself as an Approved Solar Retailer of Clean Energy Council. USE has now signed on to the Code of Conduct of Clean Energy Council Solar Retailer which is the only solar industry code of conduct – authorized by the Australian Competition and Consumer Commission (ACCC).
          </p>

          <p>
            Moreover Clean Energy Council Solar Retailer Code of Conduct is a voluntary scheme authorized by them.
          </p>

          <p>
            Companies that have signed are committed to provide higher quality and standard of service. This program is designed to give peace of mind to users who want to install solar systems. It helps them choose and purchase the best product from companies committed to provide excellent services available in the market.
          </p>

          <p>
            Companies can place a special Clean Energy Council Approved Solar Retailer logo which will help customers identify them.
          </p>

          <p>
            Ultimate Solar Energy is looking forward to provide outstanding services and improve Solar standards in the Australian industry, As it is now a proud signatory to the Solar Retailer Code of Conduct.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            Our promise to our customers
          </h2>

          <p>
            This is the standard of behaviour expected of CEC Approved Solar Retailers. It's also the standard of conduct we expect of our industry, colleagues, and ourselves.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-8 mb-3">Pre-Sale</h3>

          <p>We ensure that our representatives must act ethically at all times</p>

          <p>Ultimate Solar Energy do not engage in any misleading advertising, dishonesty or sales tactics</p>

          <p>
            We supply essential information to our customers about their purchase of systems in written before any contract. This includes an average daily performance estimate for each month of solar generation and site-specific full system design.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-8 mb-3">Post-Sale</h3>

          <p>
            We give customers the chance to cancel a contract like including variations to system design and obtain a full refund if any changes are made that are not approved in writing
          </p>

          <p>We uphold consumers' legal rights relating to cooling-off periods and refunds.</p>

          <p>We provide warranty that covers the performance and operation of the entire solar system.</p>

          <p>
            We provide all the essential information to customers about the processes involved between and network connection and system installation or facilitate this process on their behalf
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-8 mb-3">General business</h3>

          <p>All the required documentations are provided to the consumers after the system is installed.</p>

          <p>We adhere to all existing regulations and legislation</p>

          <p>
            We are fully-accountable for the actions of any subcontracted parties, including Clean Energy Council-accredited installers or designers
          </p>

          <p>We have a transparent and fair complaints process, and respond to customers quickly</p>
        </div>
      </div>
    </main>
  );
}

