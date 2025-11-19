import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Quality Solar Products | Premium Solar Panels | Ultimate Solar Energy",
  description: "We use only top-tier solar products from world-renowned manufacturers. Tier 1 solar panels, premium inverters, and high-quality mounting systems with industry-leading warranties.",
  keywords: [
    "quality solar panels",
    "Tier 1 solar panels",
    "premium solar products",
    "best solar panels Australia",
    "quality solar equipment"
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function TopQualityProductsPage() {
    return (
      <main className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 h-[500px]">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#002866] mb-8 uppercase leading-tight">
          Top Quality Products
          </h1>
  
          {/* Content */}
          <div className="space-y-2 text-gray-700 text-base md:text-lg leading-relaxed">
            <p>
            USE’s quality assurance team source and recommend one of the most recognized brands in the industry.
            </p>

          </div>
        </div>
      </main>
    );
  }