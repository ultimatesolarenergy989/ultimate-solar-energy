import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Ultimate Solar Energy",
  description: "Sign in to your Ultimate Solar Energy account to manage quotes, view your solar system details, and access customer support.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

