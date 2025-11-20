import UltimateSystem from "@/components/UltimateSystem";
import BrightePayment from "@/components/BrightePayment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "6.6 KW Ultimate Solar System | Premium Residential Solar | Ultimate Solar Energy",
  description: "Premium 6.6kW Ultimate solar system for Australian homes. Features Goodwe or Sungrow 5kW inverter, 18x370W Tier 1 panels, and CEC-accredited installation. Perfect for medium-sized homes with excellent ROI.",
  keywords: [
    "6.6kW solar system",
    "6.6kW Ultimate system",
    "residential solar 6.6kW",
    "home solar panels 6.6kW",
    "Goodwe inverter",
    "Sungrow inverter"
  ],
  openGraph: {
    title: "6.6 KW Ultimate Solar System | Premium Residential Solar",
    description: "Premium 6.6kW Ultimate solar system for Australian homes with Tier 1 panels and quality inverters.",
    url: "https://ultimatesolarenergy.com.au/products/6-6-kw-ultimate-system",
    siteName: "Ultimate Solar Energy",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function UltimateSystemPage() {
  return (
    <main>
      <UltimateSystem />
      <BrightePayment />
    </main>
  );
}

