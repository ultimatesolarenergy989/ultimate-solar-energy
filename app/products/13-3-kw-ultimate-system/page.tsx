import ThirteenKwUltimateSystem from "@/components/ThirteenKwUltimateSystem";
import BrightePayment from "@/components/BrightePayment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "13.3 KW Ultimate Solar System | Extra Large Home Solar | Ultimate Solar Energy",
  description: "Premium 13.3kW Ultimate solar system for extra-large Australian homes. Features 10kW Goodwe or Sungrow inverter, 36x370W Tier 1 panels. Maximum energy production and savings.",
  keywords: ["13.3kW solar system", "13kW Ultimate system", "extra large home solar", "residential solar 13kW"],
  robots: { index: true, follow: true },
};

export default function ThirteenKwUltimateSystemPage() {
  return (
    <main>
      <ThirteenKwUltimateSystem />
      <BrightePayment />
    </main>
  );
}

