import type { Metadata } from "next";
import "./globals.css";
import { fontSans } from "./fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ultimate Solar Energy",
  description: "Fast, reliable solar solutions for homes and businesses.",
  metadataBase: new URL("https://your-temp-domain.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fontSans.className} text-slate-800`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
