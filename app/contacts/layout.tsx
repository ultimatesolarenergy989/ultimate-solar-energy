import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch | Ultimate Solar Energy",
  description: "Contact Ultimate Solar Energy for expert solar advice. Call 1300 661 388 or submit our contact form. Melbourne and Perth locations available.",
  keywords: [
    "contact solar company",
    "solar contact",
    "solar energy contact",
    "solar enquiry",
    "contact Ultimate Solar Energy"
  ],
  openGraph: {
    title: "Contact Us | Get in Touch | Ultimate Solar Energy",
    description: "Contact Ultimate Solar Energy for expert solar advice. Call 1300 661 388 or submit our contact form.",
    url: "https://ultimatesolarenergy.com.au/contacts",
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

