import Hero from "@/components/Hero";
import ResComPlans from "@/components/Res-Com-Plans";
import Eligible from "@/components/Eligible";
import Calculator from "@/components/Calculator";
import CompanySlider from "@/components/CompanySlider";
import YUltimate from "@/components/Y-Ultimate";
import TimeForSolar from "@/components/TimeForSolar";
import Blogs from "@/components/Blogs";
import HomeReviews from "@/components/HomeReviews";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ultimate Solar Energy | Premium Solar Solutions in Australia",
  description: "Australia's leading solar energy provider. Get premium solar panel systems with CEC-accredited installation, 25-30 year warranties, and expert service. Free quote available for residential and commercial solar solutions.",
  keywords: [
    "solar panels Australia",
    "solar energy",
    "residential solar",
    "commercial solar",
    "solar installation",
    "CEC approved solar",
    "solar battery storage",
    "Ultimate Solar Energy",
    "solar power systems",
    "renewable energy Australia"
  ],
  authors: [{ name: "Ultimate Solar Energy" }],
  openGraph: {
    title: "Ultimate Solar Energy | Premium Solar Solutions in Australia",
    description: "Australia's leading solar energy provider. Get premium solar panel systems with CEC-accredited installation and expert service.",
    url: "https://ultimatesolarenergy.com.au",
    siteName: "Ultimate Solar Energy",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ultimate Solar Energy",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ultimate Solar Energy | Premium Solar Solutions in Australia",
    description: "Australia's leading solar energy provider. Get premium solar panel systems with CEC-accredited installation and expert service.",
    images: ["/img/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen ">
      <Hero />
      <ResComPlans />
      <Eligible />
      <Calculator />
      <YUltimate />
      <CompanySlider />
      <HomeReviews />
      <Blogs />
      <TimeForSolar />
    </main>
  );
}
