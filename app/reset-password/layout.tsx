import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Ultimate Solar Energy",
  description: "Set a new password for your Ultimate Solar Energy account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

