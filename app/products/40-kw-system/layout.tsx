import { Metadata } from "next";

export const metadata: Metadata = {
  title: "40 KW Solar System | Medium Business Solar | Ultimate Solar Energy",
  description: "Premium 40kW commercial solar system for medium-sized businesses. Features 73x550W Tier 1 panels, 30kW Sungrow/Fronius/Fimer inverter, advanced monitoring, and professional installation. Maximize ROI and energy savings.",
  keywords: [
    "40kW solar system",
    "medium business solar",
    "commercial 40kW solar",
    "30kW inverter",
    "business solar panels",
    "40 kilowatt solar system",
    "commercial solar installation",
    "medium business solar power"
  ],
  openGraph: {
    title: "40 KW Solar System | Medium Business Solar | Ultimate Solar Energy",
    description: "Premium 40kW commercial solar system for medium-sized businesses. Features 73x550W Tier 1 panels and 30kW Sungrow/Fronius/Fimer inverter.",
    url: "https://ultimatesolarenergy.com.au/products/40-kw-system",
    siteName: "Ultimate Solar Energy",
    type: "website",
    images: [
      {
        url: "/img/medium.png",
        width: 1200,
        height: 630,
        alt: "Ultimate Solar Energy - 40 KW Solar System",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

