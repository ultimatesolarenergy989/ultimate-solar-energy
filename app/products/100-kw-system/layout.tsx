import { Metadata } from "next";

export const metadata: Metadata = {
  title: "100 KW Solar System | Large Business Solar | Ultimate Solar Energy",
  description: "Premium 100kW commercial solar system for large businesses and industrial facilities. Features 182x550W Tier 1 panels, SMA/Fronius/Fimer inverters, advanced monitoring, and expert installation. Achieve maximum energy independence.",
  keywords: [
    "100kW solar system",
    "large business solar",
    "commercial 100kW solar",
    "industrial solar system",
    "business solar panels",
    "100 kilowatt solar system",
    "large-scale solar installation",
    "industrial solar power"
  ],
  openGraph: {
    title: "100 KW Solar System | Large Business Solar | Ultimate Solar Energy",
    description: "Premium 100kW commercial solar system for large businesses. Features 182x550W Tier 1 panels and SMA/Fronius/Fimer inverters.",
    url: "https://ultimatesolarenergy.com.au/products/100-kw-system",
    siteName: "Ultimate Solar Energy",
    type: "product",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

