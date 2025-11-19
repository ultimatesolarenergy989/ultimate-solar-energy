import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote | Solar System Quote | Ultimate Solar Energy",
  description: "Get your personalized solar system quote today. Quick and easy quote form for residential and commercial solar installations in Australia.",
  keywords: [
    "solar quote",
    "get solar quote",
    "solar system quote",
    "solar installation quote",
    "solar price quote"
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

