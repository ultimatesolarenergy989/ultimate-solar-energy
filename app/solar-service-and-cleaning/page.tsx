import SolarServiceBanner from "@/components/SolarServiceBanner";
import SolarServiceWhyChoose from "@/components/SolarServiceWhyChoose";
import SolarServicesDetails from "@/components/SolarServicesDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Panel Cleaning & Maintenance Services | Ultimate Solar Energy",
  description: "Professional solar panel cleaning and maintenance services across Australia. Maximize efficiency, extend system life, and maintain peak performance. Expert technicians, comprehensive inspections, and quality service.",
  keywords: [
    "solar panel cleaning",
    "solar maintenance",
    "solar panel service",
    "solar system maintenance",
    "solar panel cleaning Australia",
    "solar inspection",
    "solar panel repair"
  ],
  openGraph: {
    title: "Solar Panel Cleaning & Maintenance Services | Ultimate Solar Energy",
    description: "Professional solar panel cleaning and maintenance services across Australia. Maximize efficiency and extend system life.",
    url: "https://ultimatesolarenergy.com.au/solar-service-and-cleaning",
    siteName: "Ultimate Solar Energy",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SolarServiceAndCleaningPage() {
  return (
    <main>
      <SolarServiceBanner />
      <SolarServiceWhyChoose />
      <SolarServicesDetails />
    </main>
  );
}

