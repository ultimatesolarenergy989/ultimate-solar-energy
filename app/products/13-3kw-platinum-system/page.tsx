import ThirteenKwPlatinumSystem from "@/components/ThirteenKwPlatinumSystem";
import BrightePayment from "@/components/BrightePayment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "13.3 KW Platinum Solar System | Premium Extra Large Solar | Ultimate Solar Energy",
  description: "Premium 13.3kW Platinum solar system with 10kW Fronius or SMA inverter and 38x350W premium panels. Ultimate performance for extra-large Australian homes.",
  keywords: ["13.3kW Platinum system", "premium solar 13kW", "extra large home solar premium"],
  robots: { index: true, follow: true },
};

export default function ThirteenKwPlatinumSystemPage() {
  return (
    <main>
      <ThirteenKwPlatinumSystem />
      <BrightePayment />
    </main>
  );
}

