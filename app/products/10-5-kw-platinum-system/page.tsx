import TenKwPlatinumSystem from "@/components/TenKwPlatinumSystem";
import BrightePayment from "@/components/BrightePayment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "10.5 KW Platinum Solar System | Premium Large Home Solar | Ultimate Solar Energy",
  description: "Premium 10.5kW Platinum solar system with 8kW Fronius or SMA inverter and 30x350W premium panels. Elite performance for large Australian homes.",
  keywords: ["10.5kW Platinum system", "premium solar 10kW", "large home solar premium"],
  robots: { index: true, follow: true },
};

export default function TenKwPlatinumSystemPage() {
  return (
    <main>
      <TenKwPlatinumSystem />
      <BrightePayment />
    </main>
  );
}

