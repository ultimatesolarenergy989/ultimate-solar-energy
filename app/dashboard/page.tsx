"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import {
  FileText,
  Edit,
  Eye,
  PlusCircle,
  Users,
  Inbox,
  PhoneCall,
  CheckCircle,
} from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalViews: 0,
  });
  const [contactStats, setContactStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    completed: 0,
    recentContacts: [],
  });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats (we'll implement the API later)
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [blogRes, contactRes] = await Promise.all([
        fetch("/api/blogs/stats"),
        fetch("/api/contacts/stats"),
      ]);

      if (blogRes.ok) {
        const data = await blogRes.json();
        setStats({
          totalBlogs: data.totalBlogs,
          publishedBlogs: data.publishedBlogs,
          draftBlogs: data.draftBlogs,
          totalViews: data.totalViews,
        });
        setRecentBlogs(data.recentBlogs);
      }

      if (contactRes.ok) {
        const contactData = await contactRes.json();
        setContactStats(contactData);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Blogs",
      value: stats.totalBlogs,
      icon: FileText,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Published",
      value: stats.publishedBlogs,
      icon: Eye,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Drafts",
      value: stats.draftBlogs,
      icon: Edit,
      color: "bg-yellow-500",
      lightColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Total Inquiries",
      value: contactStats.total,
      icon: Users,
      color: "bg-[#002866]",
      lightColor: "bg-[#002866]/10",
      textColor: "text-[#002866]",
    },
    {
      title: "New Inquiries",
      value: contactStats.new,
      icon: Inbox,
      color: "bg-[#FDB714]",
      lightColor: "bg-[#FDB714]/20",
      textColor: "text-[#C68A00]",
    },
    {
      title: "Contacted",
      value: contactStats.contacted,
      icon: PhoneCall,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Completed",
      value: contactStats.completed,
      icon: CheckCircle,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-600",
    },
  ];

  return (
    <DashboardLayout>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#002866] mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your blog.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.lightColor} p-3 rounded-lg`}>
                    <Icon className={stat.textColor} size={24} />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-[#002866]">{stat.value}</p>
              </div>
              <div className={`${stat.color} h-1 w-full`} />
            </div>
          );
        })}
      </div>

      {/* Quick Actions & Recent Blogs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-[#002866] mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/dashboard/blogs/new"
              className="flex items-center gap-3 p-4 bg-[#002866] text-white rounded-lg hover:bg-[#003580] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <PlusCircle size={20} />
              <span className="font-semibold">Create New Blog</span>
            </Link>
            <Link
              href="/dashboard/blogs"
              className="flex items-center gap-3 p-4 border-2 border-[#002866] text-[#002866] rounded-lg hover:bg-[#002866] hover:text-white transition-all duration-300"
            >
              <FileText size={20} />
              <span className="font-semibold">View All Blogs</span>
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 p-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#FDB714] hover:text-[#FDB714] transition-all duration-300"
            >
              <Edit size={20} />
              <span className="font-semibold">Edit Profile</span>
            </Link>
            <Link
              href="/dashboard/contacts"
              className="flex items-center gap-3 p-4 border-2 border-[#002866]/20 text-[#002866] rounded-lg hover:bg-[#002866]/10 transition-all duration-300"
            >
              <Users size={20} />
              <span className="font-semibold">Manage Contacts</span>
            </Link>
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#002866]">Recent Blogs</h2>
            <Link href="/dashboard/blogs" className="text-[#FDB714] hover:text-[#002866] font-semibold text-sm transition-colors">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002866]"></div>
            </div>
          ) : recentBlogs.length > 0 ? (
            <div className="space-y-3">
              {recentBlogs.map((blog: any, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#FDB714] hover:shadow-md transition-all duration-200"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{blog.title}</h3>
                    <p className="text-sm text-gray-500">{blog.date}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      blog.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {blog.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No blogs yet</h3>
              <p className="text-gray-500 mb-4">Start creating your first blog post!</p>
              <Link
                href="/dashboard/blogs/new"
                className="inline-flex items-center gap-2 bg-[#002866] text-white px-6 py-3 rounded-lg hover:bg-[#003580] transition-colors duration-300 font-semibold"
              >
                <PlusCircle size={20} />
                Create Your First Blog
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Recent Contacts */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#002866]">Recent Inquiries</h2>
          <Link href="/dashboard/contacts" className="text-[#FDB714] hover:text-[#002866] font-semibold text-sm transition-colors">
            View Contacts →
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-6">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#002866]"></div>
          </div>
        ) : contactStats.recentContacts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactStats.recentContacts.map((contact: any) => (
              <div
                key={contact.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-[#FDB714] hover:shadow-md transition-all duration-200"
              >
                <p className="font-semibold text-gray-900">
                  {contact.firstName} {contact.lastName}
                </p>
                <p className="text-sm text-gray-500 mb-2">{contact.email}</p>
                <div className="flex items-center justify-between text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      contact.status === "new"
                        ? "bg-blue-100 text-blue-700"
                        : contact.status === "contacted"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {contact.status}
                  </span>
                  <span className="text-gray-500">{contact.date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No contact inquiries yet.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

