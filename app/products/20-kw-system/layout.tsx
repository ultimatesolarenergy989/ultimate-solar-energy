import { Metadata } from "next";

export const metadata: Metadata = {
  title: "20 KW Solar System | Small Business Solar | Ultimate Solar Energy",
  description: "Premium 20kW commercial solar system perfect for small businesses. Features 37x550W Tier 1 panels, 20kW Fimer inverter, online monitoring, and CEC-accredited installation. Reduce energy costs with Australian-made quality.",
  keywords: [
    "20kW solar system",
    "small business solar",
    "commercial 20kW solar",
    "Fimer 20kW inverter",
    "business solar panels",
    "20 kilowatt solar system",
    "commercial solar installation",
    "small business solar power"
  ],
  openGraph: {
    title: "20 KW Solar System | Small Business Solar | Ultimate Solar Energy",
    description: "Premium 20kW commercial solar system perfect for small businesses. Features 37x550W Tier 1 panels, 20kW Fimer inverter, and CEC-accredited installation.",
    url: "https://ultimatesolarenergy.com.au/products/20-kw-system",
    siteName: "Ultimate Solar Energy",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

