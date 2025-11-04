"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import TiptapEditor from "@/components/TiptapEditor";
import Image from "next/image";
import {
  Save,
  Eye,
  Upload,
  X,
  Tag,
  Calendar,
  FileText,
  Link as LinkIcon,
} from "lucide-react";

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featuredImage: "",
    tags: [] as string[],
    metaDescription: "",
    status: "draft",
    publishedAt: new Date().toISOString().split("T")[0],
  });

  const [tagInput, setTagInput] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);

  useEffect(() => {
    // Get user from localStorage (DashboardLayout handles redirect)
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Set a default user for testing
      setUser({ name: "Admin User", email: "admin@test.com", id: "test-123" });
    }
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugEdited && formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, slugEdited]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === "slug") {
      setSlugEdited(true);
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Only images are allowed.");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("File size too large. Maximum 5MB allowed.");
      return;
    }

    // Store the file for later upload
    setSelectedImageFile(file);

    // Create local preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreviewUrl(previewUrl);

    console.log("Image selected:", file.name, "- Will upload when you publish");
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (status: "draft" | "published") => {
    if (!formData.title || !formData.content) {
      alert("Please fill in title and content");
      return;
    }

    if (!user) {
      alert("You must be logged in to create a blog");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = formData.featuredImage; // Keep existing if any

      // Step 1: Upload image to Supabase first (if user selected one)
      if (selectedImageFile) {
        console.log("Uploading image to Supabase...");
        
        const uploadFormData = new FormData();
        uploadFormData.append("file", selectedImageFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        console.log("Upload response status:", uploadResponse.status);
        console.log("Upload response headers:", uploadResponse.headers.get("content-type"));

        // Check if response is JSON before parsing
        const contentType = uploadResponse.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const errorText = await uploadResponse.text();
          console.error("API returned non-JSON response:", errorText);
          throw new Error("Server error: API returned HTML instead of JSON. Check server console for errors.");
        }

        const uploadData = await uploadResponse.json();

        if (uploadResponse.ok) {
          imageUrl = uploadData.url;
          console.log("Image uploaded successfully:", imageUrl);
        } else {
          throw new Error(uploadData.error || "Failed to upload image");
        }
      }

      // Step 2: Save blog data to database with Supabase image URL
      console.log("Saving blog to database...");
      
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          featuredImage: imageUrl, // Use Supabase URL here
          status,
          authorId: user.id,
          publishedAt: status === "published" ? formData.publishedAt : null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Blog ${status === "published" ? "published" : "saved as draft"} successfully!`);
        console.log("Blog saved with image URL:", imageUrl);
        router.push("/dashboard/blogs");
      } else {
        alert(data.error || "Failed to create blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert(error instanceof Error ? error.message : "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#002866] mb-2">Create New Blog</h1>
            <p className="text-gray-600">Write and publish your blog post</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-6 py-3 border-2 border-[#002866] text-[#002866] rounded-lg hover:bg-[#002866] hover:text-white transition-all duration-300 font-semibold"
            >
              <Eye size={20} />
              {showPreview ? "Edit" : "Preview"}
            </button>
          </div>
        </div>
      </div>

      {showPreview ? (
        /* Preview Mode */
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="max-w-4xl mx-auto">
            {imagePreviewUrl && (
              <div className="mb-8">
                <img
                  src={imagePreviewUrl}
                  alt={formData.title || "Blog preview"}
                  className="w-full h-auto rounded-lg max-h-96 object-cover"
                />
              </div>
            )}
            <h1 className="text-4xl font-bold text-[#002866] mb-4">{formData.title || "Untitled Blog"}</h1>
            <div className="flex items-center gap-4 text-gray-600 mb-6 pb-6 border-b">
              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {new Date(formData.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {formData.tags.length > 0 && (
                <span className="flex items-center gap-2">
                  <Tag size={18} />
                  {formData.tags.join(", ")}
                </span>
              )}
            </div>
            {formData.excerpt && (
              <p className="text-lg text-gray-700 mb-6 italic">{formData.excerpt}</p>
            )}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: formData.content || "<p>No content yet...</p>" }}
            />
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <div className="space-y-6">
          {/* Title & Slug */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Blog Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter your blog title..."
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <LinkIcon size={16} />
                  URL Slug <span className="text-gray-500 text-xs font-normal">(Auto-generated, editable)</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">/blog/</span>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="blog-url-slug"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Blog Content <span className="text-red-500">*</span>
            </label>
            <TiptapEditor
              key="blog-editor"
              value={formData.content}
              onChange={handleContentChange}
              placeholder="Write your blog content here..."
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Excerpt <span className="text-gray-500 text-xs font-normal">(Short summary)</span>
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Write a brief summary of your blog post..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-transparent"
            />
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Upload size={16} />
              Featured Image
            </label>
            
            {imagePreviewUrl ? (
              <div className="relative">
                <img
                  src={imagePreviewUrl}
                  alt="Featured preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImageFile(null);
                    setImagePreviewUrl("");
                    URL.revokeObjectURL(imagePreviewUrl);
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
                  ℹ️ Image will be uploaded to Supabase when you publish
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <label className="cursor-pointer">
                  <span className="bg-[#002866] text-white px-6 py-3 rounded-lg hover:bg-[#003580] transition-colors inline-block font-semibold">
                    Choose Image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">Max file size: 5MB</p>
                <p className="text-xs text-gray-400 mt-1">Image will upload when you publish</p>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Tag size={16} />
              Tags
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                placeholder="Add a tag..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-transparent"
              />
              <button
                onClick={handleAddTag}
                className="px-6 py-3 bg-[#FDB714] text-[#002866] rounded-lg hover:bg-[#FDB714]/90 transition-colors font-semibold"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#002866] text-white rounded-full text-sm"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-[#FDB714] transition-colors"
                  >
                    <X size={16} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* SEO Meta Description */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FileText size={16} />
              SEO Meta Description
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              placeholder="Write a meta description for search engines..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-transparent"
              maxLength={160}
            />
            <p className="text-sm text-gray-500 mt-2">
              {formData.metaDescription.length}/160 characters
            </p>
          </div>

          {/* Published Date */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Calendar size={16} />
              Published Date
            </label>
            <input
              type="date"
              name="publishedAt"
              value={formData.publishedAt}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => handleSubmit("draft")}
                disabled={loading}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#002866] hover:text-[#002866] transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save as Draft"}
              </button>
              <button
                onClick={() => handleSubmit("published")}
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-[#002866] text-white rounded-lg hover:bg-[#003580] transition-all duration-300 font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                {loading ? "Publishing..." : "Publish Blog"}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

