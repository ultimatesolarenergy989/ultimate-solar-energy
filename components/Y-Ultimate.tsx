"use client";
import { Settings, LifeBuoy, Users, DollarSign, Shield, ThumbsUp } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Settings,
    title: "CERTIFIED INSTALLATIONS",
    description:
      "Solar power systems require specialized solar designers and electricians who ensure that all the system will be install",
    link: "/why-ultimate-solar-energy/certified-installations",
  },
  {
    icon: LifeBuoy,
    title: "CUSTOMER SUPPORT",
    description:
      "Solar energy is easy to understand. But we make it easier for you! We guide you through the system and show you how it",
    link: "/why-ultimate-solar-energy/customer-support",
  },
  {
    icon: Users,
    title: "ECO- FRIENDLY",
    description:
      "Instead of backing up your house with a fossil fuel generator and adding a carbon footprint in your record, choose a gr",
    link: "/why-ultimate-solar-energy/eco-friendly",
  },
  {
    icon: DollarSign,
    title: "SAVINGS!",
    description:
      "For better or worse, Australia is one of the countries with the highest electricity rates around the world. Fortunately",
    link: "/why-ultimate-solar-energy/savings",
  },
  {
    icon: Shield,
    title: "SYSTEM WARRANTY",
    description:
      "Nothing is more important for USE than to make sure you get what you asked for! With our system warranty you can rest a",
    link: "/why-ultimate-solar-energy/system-warranty",
  },
  {
    icon: ThumbsUp,
    title: "TOP QUALITY PRODUCTS",
    description:
      "USE's quality assurance team source and recommend one of the most recognized brands in the industry.",
    link: "/why-ultimate-solar-energy/top-quality-products",
  },
];

export default function YUltimate() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#002866] mb-4 uppercase">
            WHY ULTIMATE SOLAR ENERGY?
          </h2>
          <p className="text-base lg:text-lg text-gray-700 max-w-5xl mx-auto leading-relaxed">
            We are one of the leading suppliers of solar panels in Melbourne and we provide the solutions that you need to back up your house and reduce your consumption from the grid at the lowest cost!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Top Yellow Bar */}
              <div className="h-2 bg-[#FFD700]"></div>
              
              <div className="p-8">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto border-2 border-[#002866]">
                    <feature.icon
                      size={32}
                      className="text-[#002866]"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#002866] mb-4 text-center uppercase">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed text-sm min-h-[80px]">
                  {feature.description}
                </p>

                {/* Divider */}
                <div className="w-16 h-1 bg-[#FFD700] mx-auto mb-6"></div>

                {/* More Detail Button */}
                <div className="text-center">
                  <Link
                    href={feature.link}
                    className="inline-block bg-[#002866] text-white font-semibold px-8 py-3 transition-all duration-300 hover:bg-[#FFD700] hover:text-[#002866] uppercase text-sm tracking-wide"
                  >
                    More Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

