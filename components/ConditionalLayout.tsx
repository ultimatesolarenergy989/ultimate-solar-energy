"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if current path is a dashboard page
  const isDashboardPage = pathname?.startsWith("/dashboard") || pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");

  return (
    <>
      {!isDashboardPage && <Header />}
      <main className="min-h-screen">{children}</main>
      {!isDashboardPage && <Footer />}
    </>
  );
}

