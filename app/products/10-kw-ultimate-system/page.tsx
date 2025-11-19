import TenKwUltimateSystem from "@/components/TenKwUltimateSystem";
import BrightePayment from "@/components/BrightePayment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "10 KW Ultimate Solar System | Large Home Solar | Ultimate Solar Energy",
  description: "Premium 10kW Ultimate solar system for large Australian homes. Features 8kW Goodwe or Sungrow inverter, 27x370W Tier 1 panels. Perfect for high energy consumption homes with maximum savings.",
  keywords: ["10kW solar system", "10kW Ultimate system", "large home solar", "residential solar 10kW"],
  robots: { index: true, follow: true },
};

export default function TenKwUltimateSystemPage() {
  return (
    <main>
      <TenKwUltimateSystem />
      <BrightePayment />
    </main>
  );
}

