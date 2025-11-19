import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Ultimate Solar Energy",
  description: "Manage your Ultimate Solar Energy account, quotes, contacts, and blog posts.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

