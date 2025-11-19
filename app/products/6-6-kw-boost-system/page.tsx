import BoostSystem from "@/components/BoostSystem";
import BrightePayment from "@/components/BrightePayment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "6.6 KW Boost Solar System | Mid-Range Residential Solar | Ultimate Solar Energy",
  description: "Affordable 6.6kW Boost solar system with 5kW Fimer inverter and 18x370/390W Tier 1 panels. Great value for Australian homes seeking quality and performance.",
  keywords: ["6.6kW Boost system", "affordable solar 6.6kW", "Fimer inverter", "residential solar panels"],
  robots: { index: true, follow: true },
};

export default function BoostSystemPage() {
  return (
    <main>
      <BoostSystem />
      <BrightePayment />
    </main>
  );
}

