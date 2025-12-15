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
    images: [
      {
        url: "/img/medium.png",
        width: 1200,
        height: 630,
        alt: "Ultimate Solar Energy - Contact Us",
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

