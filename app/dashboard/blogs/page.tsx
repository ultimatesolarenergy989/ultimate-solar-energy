"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { Search, Edit, Trash2, Eye, PlusCircle, Filter, AlertTriangle, X } from "lucide-react";

export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, published, draft
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<any>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      
      if (response.ok) {
        // Format the blogs data
        const formattedBlogs = data.map((blog: any) => ({
          ...blog,
          date: new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          excerpt: blog.excerpt || blog.content.substring(0, 100) + "...",
        }));
        setBlogs(formattedBlogs);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  const openDeleteModal = (blog: any) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setBlogToDelete(null);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;

    try {
      const response = await fetch(`/api/blogs/${blogToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Blog deleted successfully!");
        fetchBlogs(); // Refresh the list
        closeDeleteModal();
      } else {
        alert("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  const filteredBlogs = blogs.filter((blog: any) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || blog.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#002866] mb-2">All Blogs</h1>
            <p className="text-gray-600">Manage your blog posts</p>
          </div>
          <Link
            href="/dashboard/blogs/new"
            className="inline-flex items-center gap-2 bg-[#002866] text-white px-6 py-3 rounded-lg hover:bg-[#003580] transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
          >
            <PlusCircle size={20} />
            Create New Blog
          </Link>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blogs List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002866]"></div>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBlogs.map((blog: any) => (
                  <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{blog.title}</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {blog.excerpt}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          blog.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Eye size={16} className="text-gray-400" />
                        {blog.views.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{blog.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/blogs/edit/${blog.id}`}
                          className="p-2 text-[#002866] hover:bg-[#002866] hover:text-white rounded-lg transition-all duration-200"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => openDeleteModal(blog)}
                          className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-200"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mb-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Eye className="text-gray-400" size={40} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter"
                : "Start creating your first blog post!"}
            </p>
            {!searchTerm && filterStatus === "all" && (
              <Link
                href="/dashboard/blogs/new"
                className="inline-flex items-center gap-2 bg-[#002866] text-white px-6 py-3 rounded-lg hover:bg-[#003580] transition-colors duration-300 font-semibold"
              >
                <PlusCircle size={20} />
                Create Your First Blog
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && blogToDelete && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-300 ease-in-out"
          style={{ 
            animation: "fadeIn 0.3s ease-in-out",
            backgroundColor: "rgba(0, 0, 0, 0.15)"
          }}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl max-w-md w-full transform transition-all duration-300 ease-in-out"
            style={{ animation: "slideUp 0.3s ease-in-out" }}
          >
            {/* Modal Header */}
            <div className="bg-red-600 text-white p-6 rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <AlertTriangle className="text-red-600" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Delete Blog Post</h3>
                  <p className="text-red-100 text-sm">This action cannot be undone</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete this blog post?
              </p>
              <div className="bg-gray-50 border-l-4 border-red-500 p-4 rounded">
                <p className="font-semibold text-gray-900 mb-1">Blog Title:</p>
                <p className="text-gray-700 break-words">{blogToDelete.title}</p>
                {blogToDelete.status === "published" && (
                  <p className="text-sm text-red-600 mt-2 font-semibold">
                    ⚠️ This is a published blog post
                  </p>
                )}
              </div>
              <div className="mt-4 bg-yellow-50 border border-yellow-200 p-4 rounded">
                <p className="text-sm text-yellow-800 flex items-start gap-2">
                  <AlertTriangle className="flex-shrink-0 mt-0.5" size={16} />
                  <span>
                    <strong>Warning:</strong> This blog post will be permanently deleted from the database. 
                    This action cannot be reversed.
                  </span>
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex gap-3">
              <button
                onClick={closeDeleteModal}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

