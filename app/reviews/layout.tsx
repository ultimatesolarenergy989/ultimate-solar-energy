import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Reviews & Testimonials | Ultimate Solar Energy",
  description: "Read real customer reviews and testimonials about Ultimate Solar Energy. See what Australian homeowners and businesses say about our premium solar installation services, quality products, and exceptional support.",
  keywords: [
    "solar reviews",
    "Ultimate Solar Energy reviews",
    "customer testimonials",
    "solar panel reviews Australia",
    "solar installation reviews",
    "google reviews solar",
    "solar company testimonials"
  ],
  openGraph: {
    title: "Customer Reviews & Testimonials | Ultimate Solar Energy",
    description: "Read real customer reviews about Ultimate Solar Energy. See what Australian homeowners and businesses say about our premium solar installation services.",
    url: "https://ultimatesolarenergy.com.au/reviews",
    siteName: "Ultimate Solar Energy",
    type: "website",
    images: [
      {
        url: "/img/medium.png",
        width: 1200,
        height: 630,
        alt: "Ultimate Solar Energy - Customer Reviews",
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

