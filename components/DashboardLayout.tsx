"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      // Set a default user for testing purposes
      setUser({ name: "Admin User", email: "admin@test.com", id: "test-123" });
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/sign-in");
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "All Blogs",
      href: "/dashboard/blogs",
      icon: FileText,
    },
    {
      name: "Create New Blog",
      href: "/dashboard/blogs/new",
      icon: PlusCircle,
    },
    {
      name: "Profile & Settings",
      href: "/dashboard/profile",
      icon: User,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar (Mobile) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#002866] z-50 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-white font-bold text-lg">Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:text-[#FDB714] transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#002866] text-white z-40 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo/Brand */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center justify-center">
            <div className="bg-white rounded-lg p-3 w-full">
              <Image
                src="/img/logo/use-logo.jpg"
                alt="Ultimate Solar Energy"
                width={200}
                height={80}
                className="w-full h-auto"
                priority
              />
            </div>
          </Link>
          <div className="text-center mt-3">
            <p className="text-xs text-gray-300 font-semibold uppercase tracking-wider">Admin Panel</p>
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FDB714] rounded-full flex items-center justify-center font-bold text-[#002866]">
                {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{user.name || "User"}</p>
                <p className="text-xs text-gray-300 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#FDB714] text-[#002866] font-semibold shadow-lg"
                    : "text-white hover:bg-white/10 hover:text-[#FDB714]"
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-red-600 hover:text-white transition-all duration-200 mt-4"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 text-xs text-gray-400">
          <p>© 2024 Ultimate Solar Energy</p>
          <p>v1.0.0</p>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Top spacing for mobile */}
        <div className="h-16 lg:hidden" />

        {/* Content Area */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

