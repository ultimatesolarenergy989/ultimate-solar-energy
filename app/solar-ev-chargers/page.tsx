import EvChargerBanner from "@/components/EvChargerBanner";
import EvChargersWhyChoose from "@/components/EvChargersWhyChoose";
import EvChargersExpertise from "@/components/EvChargersExpertise";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar EV Chargers | Electric Vehicle Charging | Ultimate Solar Energy",
  description: "Professional solar EV charger installation in Australia. Charge your electric vehicle with clean solar energy. Smart charging solutions, expert installation, and seamless integration with your solar system.",
  keywords: [
    "solar EV charger",
    "electric vehicle charger",
    "EV charger installation",
    "solar car charging",
    "home EV charger",
    "solar powered EV charging",
    "electric car charger Australia"
  ],
  openGraph: {
    title: "Solar EV Chargers | Electric Vehicle Charging | Ultimate Solar Energy",
    description: "Professional solar EV charger installation in Australia. Charge your electric vehicle with clean solar energy.",
    url: "https://ultimatesolarenergy.com.au/solar-ev-chargers",
    siteName: "Ultimate Solar Energy",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SolarEvChargersPage() {
  return (
    <main>
      <EvChargerBanner />
      <EvChargersWhyChoose />
      <EvChargersExpertise />
    </main>
  );
}

