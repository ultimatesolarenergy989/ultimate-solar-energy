import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CEC Certified Solar Installations | Accredited Installers | Ultimate Solar Energy",
  description: "All installations performed by CEC-accredited solar installers following Clean Energy Council guidelines. Professional, certified, and compliant solar installations across Australia.",
  keywords: [
    "CEC certified installation",
    "accredited solar installer",
    "certified solar installation",
    "Clean Energy Council installer",
    "professional solar installation"
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function certifiedInstallationsPage() {
    return (
      <main className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 h-[500px]">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#002866] mb-8 uppercase leading-tight">
          Certified Installations
          </h1>
  
          {/* Content */}
          <div className="space-y-2 text-gray-700 text-base md:text-lg leading-relaxed">
            <p>
            Solar power systems require specialized solar designers and electricians who ensure that all the system will be installed according the best and most rigorous solar design standards.
            </p>

          </div>
        </div>
      </main>
    );
  }