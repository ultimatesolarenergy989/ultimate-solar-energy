import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Ultimate Solar Energy",
  description: "Create your Ultimate Solar Energy account to get personalized quotes, track your solar journey, and access exclusive customer benefits.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

