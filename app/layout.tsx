import type { Metadata } from "next";
import "./globals.css";
import { fontSans } from "./fonts";
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  title: "Ultimate Solar Energy",
  description: "Fast, reliable solar solutions for homes and businesses.",
  metadataBase: new URL("https://ultimatesolarenergy.com.au"),
  icons: {
    icon: '/img/logo/favicon.ico',
    apple: '/img/medium.png',
  },
  openGraph: {
    images: ['/img/medium.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fontSans.className} text-slate-800`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
