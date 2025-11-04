"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
  Loader2,
} from "lucide-react";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
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
    // Get user from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Set a default user for testing
      setUser({ name: "Admin User", email: "admin@test.com", id: "test-123" });
    }
  }, []);

  // Fetch existing blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${blogId}`);
        const data = await response.json();

        if (response.ok) {
          setFormData({
            title: data.title,
            slug: data.slug,
            content: data.content,
            excerpt: data.excerpt || "",
            featuredImage: data.featuredImage || "",
            tags: data.tags || [],
            metaDescription: data.metaDescription || "",
            status: data.status,
            publishedAt: data.publishedAt
              ? new Date(data.publishedAt).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0],
          });

          // Set existing image preview if available
          if (data.featuredImage) {
            setImagePreviewUrl(data.featuredImage);
          }

          setSlugEdited(true); // Prevent auto-generation for existing blog
        } else {
          alert("Failed to load blog: " + (data.error || "Unknown error"));
          router.push("/dashboard/blogs");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        alert("Failed to load blog");
        router.push("/dashboard/blogs");
      } finally {
        setPageLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId, router]);

  // Auto-generate slug from title (only if creating new and not manually edited)
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

    console.log("Image selected:", file.name, "- Will upload when you update");
  };

  const handleRemoveImage = () => {
    setSelectedImageFile(null);
    setImagePreviewUrl("");
    setFormData((prev) => ({ ...prev, featuredImage: "" }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
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
      alert("You must be logged in to update a blog");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = formData.featuredImage; // Keep existing image URL

      // Step 1: Upload new image to Supabase if user selected one
      if (selectedImageFile) {
        console.log("Uploading new image to Supabase...");

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

      // Step 2: Update blog data in database with image URL
      console.log("Updating blog in database...");

      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          featuredImage: imageUrl,
          status,
          authorId: user.id,
          publishedAt: status === "published" ? formData.publishedAt : null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Blog ${status === "published" ? "published" : "updated as draft"} successfully!`);
        console.log("Blog updated with image URL:", imageUrl);
        router.push("/dashboard/blogs");
      } else {
        alert(data.error || "Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert(error instanceof Error ? error.message : "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#002866] mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading blog...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#002866] mb-2">Edit Blog</h1>
            <p className="text-gray-600">Update your blog post</p>
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
                  URL Slug <span className="text-gray-500 text-xs font-normal">(Editable)</span>
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
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FileText size={16} />
              Blog Content <span className="text-red-500">*</span>
            </label>
            <TiptapEditor
              key="blog-editor"
              value={formData.content}
              onChange={handleContentChange}
              placeholder="Write your blog content here..."
            />
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Upload size={16} />
              Featured Image
            </label>

            {imagePreviewUrl ? (
              <div className="relative">
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  title="Remove image"
                >
                  <X size={20} />
                </button>
                {selectedImageFile && (
                  <p className="mt-2 text-sm text-blue-600">
                    New image selected. Will upload when you update.
                  </p>
                )}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <label className="cursor-pointer">
                  <span className="text-[#002866] font-semibold hover:underline">
                    Click to upload
                  </span>
                  <span className="text-gray-500"> or drag and drop</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Excerpt <span className="text-gray-500 text-xs font-normal">(Optional short description)</span>
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              placeholder="Brief description of your blog post..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-transparent"
            />
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
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Add a tag..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-transparent"
              />
              <button
                onClick={addTag}
                className="px-6 py-2 bg-[#002866] text-white rounded-lg hover:bg-[#003580] transition-colors font-semibold"
              >
                Add
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-[#FDB714] text-[#002866] rounded-full text-sm font-semibold"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Meta Description (SEO) */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Meta Description <span className="text-gray-500 text-xs font-normal">(For SEO)</span>
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows={2}
              placeholder="SEO description for search engines..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-transparent"
              maxLength={160}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.metaDescription.length}/160 characters
            </p>
          </div>

          {/* Publish Date */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Calendar size={16} />
              Publish Date
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
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleSubmit("draft")}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Save as Draft
                  </>
                )}
              </button>
              <button
                onClick={() => handleSubmit("published")}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#002866] text-white rounded-lg hover:bg-[#003580] transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    Update & Publish
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

