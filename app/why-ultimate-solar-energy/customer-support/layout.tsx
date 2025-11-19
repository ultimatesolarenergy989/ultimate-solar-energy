import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Support | Help Center | Ultimate Solar Energy",
  description: "Get expert support for your solar system. Submit a support ticket, request service, or get help with your Ultimate Solar Energy installation. Our dedicated team is here to assist you.",
  keywords: [
    "solar support",
    "customer support",
    "solar help",
    "solar service request",
    "solar system support",
    "technical support solar"
  ],
  openGraph: {
    title: "Customer Support | Help Center | Ultimate Solar Energy",
    description: "Get expert support for your solar system. Submit a support ticket or request service from our dedicated team.",
    url: "https://ultimatesolarenergy.com.au/why-ultimate-solar-energy/customer-support",
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

