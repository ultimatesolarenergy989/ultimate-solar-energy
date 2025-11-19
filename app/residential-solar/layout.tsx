import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Residential Solar Systems | Home Solar Panels | Ultimate Solar Energy",
  description: "Premium residential solar panel systems for Australian homes. Choose from 6.6kW, 10kW, and 13kW solar systems with Tier 1 panels, top inverters, and CEC-accredited installation. Get 25-30 year warranties and start saving on electricity today.",
  keywords: [
    "residential solar panels",
    "home solar systems",
    "6.6kW solar system",
    "10kW solar system",
    "13kW solar system",
    "solar panels for home",
    "residential solar installation",
    "home solar power",
    "solar energy for homes",
    "Australian residential solar"
  ],
  openGraph: {
    title: "Residential Solar Systems | Home Solar Panels | Ultimate Solar Energy",
    description: "Premium residential solar panel systems for Australian homes. Choose from 6.6kW, 10kW, and 13kW solar systems with Tier 1 panels and CEC-accredited installation.",
    url: "https://ultimatesolarenergy.com.au/residential-solar",
    siteName: "Ultimate Solar Energy",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResidentialSolarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

