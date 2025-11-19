import { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Warranty | Solar Panel Warranties | Ultimate Solar Energy",
  description: "Comprehensive warranty information for Ultimate Solar Energy solar systems. 25-30 year panel warranties, 10+ year inverter warranties, and quality workmanship guarantees. CEC-approved installations.",
  keywords: [
    "solar warranty",
    "solar panel warranty",
    "inverter warranty",
    "solar system guarantee",
    "solar installation warranty",
    "CEC warranty"
  ],
  openGraph: {
    title: "System Warranty | Solar Panel Warranties | Ultimate Solar Energy",
    description: "Comprehensive warranty information for Ultimate Solar Energy solar systems. 25-30 year panel warranties and quality guarantees.",
    url: "https://ultimatesolarenergy.com.au/system-warranty",
    siteName: "Ultimate Solar Energy",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SystemWarrantyPage() {
  return (
    <main className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#002866] mb-6 uppercase">
          SYSTEM WARRANTY
        </h1>

        {/* Company Name */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#002866] mb-4 uppercase">
          ULTIMATE SOLAR ENERGY
        </h2>

        {/* Subtitle */}
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6">
          Warranty Handling procedure and On-site services
        </h3>

        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            The following document highlights the independent backing of its systems by{" "}
            <span className="font-bold">Ultimate Solar Energy</span> with a full 5 year "Whole of System" warranty and on-site servicing and rectification, in addition to the product warranties provided by the component manufacturers and any warranties implied or specified under Consumer Law.
          </p>

          <h4 className="text-lg font-bold text-gray-900 mt-8 mb-3 underline">What it covers:</h4>

          <p>
            If during the first five years of operation, your system suffers a fault or defect in relation to the products supplied or the installation workmanship, then{" "}
            <span className="font-bold">Ultimate Solar Energy</span> will rectify your system at no cost to you.
          </p>

          <p>
            <span className="font-bold">Ultimate Solar Energy</span> will also repair any damage or leaks caused by it or its contractors during the installation process, subject to{" "}
            <span className="font-bold">Ultimate Solar Energy</span> being notified of such damage as soon as you become aware of, or should have reasonably become aware, of the damage.
          </p>

          <p>
            This covers all related costs in relation to repair and/or replacement of components and/or damage and the associated on-site labour.
          </p>

          <h4 className="text-lg font-bold text-gray-900 mt-8 mb-3 underline">
            Conditions and what are not covered:
          </h4>

          <ul className="list-disc ml-8 space-y-2">
            <li>
              Damage caused to the system by weather or natural events (we recommend that you have your solar system covered under a home insurance policy to cover such events).
            </li>
            <li>Fault or damage caused by external factors or events (for example vandalism).</li>
            <li>
              Faults or damage caused by tampering with or repair or modification by a party other than{" "}
              <span className="font-bold">Ultimate Solar Energy</span>.
            </li>
            <li>Items that are visual in nature or do not affect the performance of the system.</li>
            <li>Faults or damage caused by the electricity grid.</li>
            <li>Non-compliance with operating instructions.</li>
            <li>Incidental or consequential loss in relation to a fault or defect.</li>
          </ul>

          <div className="mt-8 mb-6">
            <span className="text-gray-700">-</span>
          </div>

          <h4 className="text-lg font-bold text-gray-900 mt-8 mb-3 underline">After 5 years period:</h4>

          <ul className="list-disc ml-8 space-y-3">
            <li>
              In the event of a fault or defect, you can still rely on the product warranties provided by the manufacturers of the components supplied as part of the system (for example, the 25-year performance warranty associated with Solar Panels).
            </li>
            <li>
              <span className="font-bold">Ultimate Solar Energy</span> is your first point of contact and will assist in obtaining warranty resolution from the relevant manufacturer.
            </li>
            <li>
              Many of the products we supply come with an on-site labour warranty (proving coverage after 5 years). You should consult the relevant warranty documentation in relation to the specific products you are considering determining if labour is covered after 5 years. Product Warranty documents are available at www.ultimatesolarenergy.com.au.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

