import PlatinumSystem from "@/components/PlatinumSystem";
import BrightePayment from "@/components/BrightePayment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "6.6 KW Platinum Solar System | Premium Home Solar | Ultimate Solar Energy",
  description: "Premium 6.6kW Platinum solar system with 5kW Fronius or SMA inverter and 18x370W premium panels. Top-tier quality for Australian homes demanding the best.",
  keywords: ["6.6kW Platinum system", "premium solar 6.6kW", "Fronius inverter", "SMA inverter"],
  robots: { index: true, follow: true },
};

export default function PlatinumSystemPage() {
  return (
    <main>
      <PlatinumSystem />
      <BrightePayment />
    </main>
  );
}

