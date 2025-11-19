import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

// Force dynamic rendering and cache for 60 seconds
export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "Solar Energy Blog | Tips, Guides & News | Ultimate Solar Energy",
  description: "Explore our comprehensive solar energy blog featuring expert tips, installation guides, product comparisons, industry news, and renewable energy insights for Australian homeowners and businesses.",
  keywords: [
    "solar energy blog",
    "solar panel guides",
    "solar installation tips",
    "renewable energy news",
    "solar panel comparison",
    "solar energy Australia",
    "solar power tips",
    "green energy blog"
  ],
  openGraph: {
    title: "Solar Energy Blog | Tips, Guides & News | Ultimate Solar Energy",
    description: "Explore our comprehensive solar energy blog featuring expert tips, installation guides, product comparisons, and renewable energy insights.",
    url: "https://ultimatesolarenergy.com.au/blog",
    siteName: "Ultimate Solar Energy",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

async function getPublishedBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        status: "published",
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
    });
    
    console.log(`✅ Fetched ${blogs.length} published blogs`);
    return blogs;
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 " >
        {/* Page Heading */}
        <h1 className="text-5xl lg:text-6xl font-bold text-[#002866] mb-16 uppercase">
          BLOG
        </h1>

        {/* Blog Posts */}
        <div className="space-y-20 shadow-lg p-6 rounded-lg bg-white">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/${blog.slug}`}
                className="group block"
              >
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                  {/* Blog Image - Left Side */}
                  <div className="relative w-full sm:w-[500px] flex-shrink-0 aspect-[16/9] bg-[#1e2d5f] rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.25)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-500">
                    {blog.featuredImage ? (
                      <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                    ) : (
                      // Default placeholder with solar theme
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1e2d5f] to-[#2d4179] transition-all duration-500 group-hover:from-[#2d4179] group-hover:to-[#1e2d5f]">
                        <div className="text-center p-8 transition-transform duration-500 ease-in-out group-hover:scale-110">
                          {/* Solar Panel Icon */}
                          <svg
                            className="w-32 h-32 mx-auto mb-4 text-[#FFD700] opacity-80 transition-all duration-500 group-hover:opacity-100"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2L4 6v2h16V6l-8-4zM4 10v2h16v-2H4zm0 4v2h16v-2H4zm0 4v2h16v-2H4zm8 4l8-4v-2H4v2l8 4z" />
                          </svg>
                          {/* Decorative Sun Icon */}
                          <svg
                            className="w-16 h-16 absolute top-8 right-8 text-[#FFD700] opacity-60 transition-all duration-500 group-hover:opacity-90 group-hover:rotate-180"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Blog Content - Right Side */}
                  <div className="flex flex-col justify-start pt-4">
                    {/* Blog Title */}
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#002866] mb-6 uppercase leading-tight group-hover:text-[#003580] transition-colors duration-300">
                      {blog.title}
                    </h2>

                    {/* Blog Excerpt */}
                    <div className="text-gray-500 text-sm lg:text-base leading-relaxed mb-4">
                      {blog.excerpt || (
                        // Strip HTML tags and get first 200 characters
                        blog.content.replace(/<[^>]*>/g, "").substring(0, 200) + "..."
                      )}
                      {" "}
                      
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Blogs Yet</h3>
              <p className="text-gray-600">Check back soon for our latest articles and updates.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

