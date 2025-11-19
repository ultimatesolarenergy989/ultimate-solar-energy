import HeatPumpHero from "@/components/HeatPumpHero";
import HeatPumpWhyChoose from "@/components/HeatPumpWhyChoose";
import HeatPumpHowItWorks from "@/components/HeatPumpHowItWorks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heat Pumps | Energy-Efficient Heating & Cooling | Ultimate Solar Energy",
  description: "Premium heat pump systems for efficient home heating and cooling. Save up to 70% on energy costs with solar-powered heat pumps. Professional installation, government rebates available across Australia.",
  keywords: [
    "heat pumps Australia",
    "solar heat pump",
    "energy efficient heating",
    "heat pump installation",
    "air source heat pump",
    "heat pump hot water",
    "efficient heating cooling"
  ],
  openGraph: {
    title: "Heat Pumps | Energy-Efficient Heating & Cooling | Ultimate Solar Energy",
    description: "Premium heat pump systems for efficient home heating and cooling. Save up to 70% on energy costs with solar-powered heat pumps.",
    url: "https://ultimatesolarenergy.com.au/heat-pumps",
    siteName: "Ultimate Solar Energy",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HeatPumpsPage() {
  return (
    <main>
      <HeatPumpHero />
      <HeatPumpWhyChoose />
      <HeatPumpHowItWorks />
    </main>
  );
}

