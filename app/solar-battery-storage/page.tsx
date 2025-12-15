import SolarBatteryBanner from "@/components/SolarBatteryBanner";
import HybridSolarSystem from "@/components/HybridSolarSystem";
import VppPlanBenefits from "@/components/VppPlanBenefits";
import VppPlansFaq from "@/components/VppPlansFaq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Battery Storage Systems | Hybrid Solar | Ultimate Solar Energy",
  description: "Store your solar energy with premium battery storage systems. Maximize self-consumption, gain energy independence, and save more on electricity bills. VPP plans available. Expert installation across Australia.",
  keywords: [
    "solar battery storage",
    "hybrid solar system",
    "solar battery installation",
    "energy storage Australia",
    "VPP plans",
    "solar battery backup",
    "home battery storage",
    "solar power storage"
  ],
  openGraph: {
    title: "Solar Battery Storage Systems | Hybrid Solar | Ultimate Solar Energy",
    description: "Store your solar energy with premium battery storage systems. Maximize self-consumption and gain energy independence.",
    url: "https://ultimatesolarenergy.com.au/solar-battery-storage",
    siteName: "Ultimate Solar Energy",
    type: "website",
    images: [
      {
        url: "/img/medium.png",
        width: 1200,
        height: 630,
        alt: "Ultimate Solar Energy - Battery Storage",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function SolarBatteryStoragePage() {
  return (
    <main>
      <SolarBatteryBanner />
      <HybridSolarSystem />
      <VppPlanBenefits />
      <VppPlansFaq />
    </main>
  );
}

