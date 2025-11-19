import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Ultimate Solar Energy",
  description: "Reset your Ultimate Solar Energy account password.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

