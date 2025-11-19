import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eco-Friendly Solar Solutions | Green Energy | Ultimate Solar Energy",
  description: "Choose eco-friendly solar energy solutions. Reduce your carbon footprint, contribute to a sustainable future, and help protect the environment with clean renewable energy.",
  keywords: [
    "eco-friendly solar",
    "green energy",
    "sustainable solar",
    "renewable energy",
    "carbon footprint reduction",
    "environmental solar"
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function EcoFriendlyPage() {
    return (
      <main className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 h-[500px]">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#002866] mb-8 uppercase leading-tight">
          Eco- Friendly
          </h1>
  
          {/* Content */}
          <div className="space-y-2 text-gray-700 text-base md:text-lg leading-relaxed">
            <p>
            Instead of backing up your house with a fossil fuel generator and adding a carbon footprint in your record, choose a green energy solution that helps the environment, increases the value of your house
            </p>

          </div>
        </div>
      </main>
    );
  }