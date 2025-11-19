import Banner from "@/components/Banner";
import CommercialSystems from "@/components/CommercialSystems";
import HowWeDoIt from "@/components/HowWeDoIt";
import FinancingOptions from "@/components/FinancingOptions";
import EligibleBlue from "@/components/EligibleBlue";
import Blogs from "@/components/Blogs";
import FinancingDetails from "@/components/FinancingDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Solar Systems | Business Solar Solutions | Ultimate Solar Energy",
  description: "Premium commercial solar solutions for Australian businesses. From 20kW to 100kW+ solar systems with advanced monitoring, flexible financing, and expert installation. Reduce operating costs and achieve energy independence.",
  keywords: [
    "commercial solar systems",
    "business solar panels",
    "20kW solar system",
    "40kW solar system",
    "100kW solar system",
    "commercial solar installation",
    "business solar power",
    "industrial solar",
    "commercial solar financing",
    "solar for business Australia"
  ],
  openGraph: {
    title: "Commercial Solar Systems | Business Solar Solutions | Ultimate Solar Energy",
    description: "Premium commercial solar solutions for Australian businesses. From 20kW to 100kW+ solar systems with advanced monitoring and expert installation.",
    url: "https://ultimatesolarenergy.com.au/commercial-solars",
    siteName: "Ultimate Solar Energy",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CommercialSolarsPage() {
  return (
    <main>
      <Banner />
      <CommercialSystems />
      <HowWeDoIt />
      <FinancingOptions />
      <EligibleBlue />
      <Blogs/>
      <FinancingDetails />
    </main>
  );
}

