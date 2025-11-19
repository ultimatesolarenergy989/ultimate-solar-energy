import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Free Solar Quote | No Obligation | Ultimate Solar Energy",
  description: "Get your free, no-obligation solar quote today. Answer a few simple questions to receive a customized solar solution for your home or business. Expert advice, competitive pricing, and quality installation guaranteed.",
  keywords: [
    "free solar quote",
    "solar quote Australia",
    "solar panel quote",
    "no obligation solar quote",
    "solar system quote",
    "get solar quote online",
    "solar price estimate",
    "solar panel cost calculator"
  ],
  openGraph: {
    title: "Get a Free Solar Quote | No Obligation | Ultimate Solar Energy",
    description: "Get your free, no-obligation solar quote today. Receive a customized solar solution for your home or business with expert advice and competitive pricing.",
    url: "https://ultimatesolarenergy.com.au/get-a-free-quote",
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

