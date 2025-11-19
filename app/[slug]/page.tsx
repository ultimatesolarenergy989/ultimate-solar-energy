import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

// Set dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Ultimate Solar Energy",
      description: "The requested blog post could not be found.",
    };
  }

  const publishedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toISOString()
    : new Date(blog.createdAt).toISOString();

  return {
    title: `${blog.title} | Ultimate Solar Energy Blog`,
    description: blog.metaDescription || blog.excerpt || blog.title,
    keywords: blog.tags,
    authors: [{ name: blog.author?.name || "Ultimate Solar Energy" }],
    openGraph: {
      title: blog.title,
      description: blog.metaDescription || blog.excerpt || blog.title,
      url: `https://ultimatesolarenergy.com.au/${blog.slug}`,
      siteName: "Ultimate Solar Energy",
      images: blog.featuredImage
        ? [
            {
              url: blog.featuredImage,
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ]
        : [],
      locale: "en_AU",
      type: "article",
      publishedTime: publishedDate,
      authors: [blog.author?.name || "Ultimate Solar Energy"],
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.metaDescription || blog.excerpt || blog.title,
      images: blog.featuredImage ? [blog.featuredImage] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Generate static params for published blogs
export async function generateStaticParams() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        status: "published",
      },
      select: {
        slug: true,
      },
    });

    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

async function getBlogBySlug(slug: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        slug: slug,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Check if blog exists and is published
    if (!blog || blog.status !== "published") {
      return null;
    }

    // Increment views count
    await prisma.blog.update({
      where: { id: blog.id },
      data: { views: { increment: 1 } },
    });

    return blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

async function getRelatedBlogs(currentBlogId: string, tags: string[], limit: number = 3) {
  try {
    // Find blogs with similar tags
    const blogs = await prisma.blog.findMany({
      where: {
        AND: [
          { id: { not: currentBlogId } },
          { status: "published" },
          {
            OR: tags.map((tag) => ({
              tags: {
                has: tag,
              },
            })),
          },
        ],
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
      take: limit,
    });

    return blogs;
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blog.id, blog.tags);

  return (
    <main className="bg-white min-h-screen">
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back to Blog Link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-[#002866] hover:text-[#FFD700] transition-colors duration-300 mb-8 font-semibold group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="relative w-full aspect-[21/9] mb-10 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        )}

        {/* Blog Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-[#002866] mb-6 uppercase leading-tight">
          {blog.title}
        </h1>

        {/* Blog Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
          {/* Published Date */}
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#002866]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              {blog.publishedAt
                ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
            </span>
          </div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 bg-[#002866]/5 text-[#002866] rounded-full text-sm font-semibold border border-[#002866]/20 hover:bg-[#002866] hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Blog Content */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:text-[#002866] prose-headings:font-bold
            prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-[#002866] prose-a:font-semibold hover:prose-a:text-[#FFD700]
            prose-strong:text-[#002866] prose-strong:font-bold
            prose-ul:text-gray-700 prose-ol:text-gray-700
            prose-li:marker:text-[#FFD700]
            prose-img:rounded-xl prose-img:shadow-lg
            prose-blockquote:border-l-4 prose-blockquote:border-[#FFD700] prose-blockquote:bg-gray-50 prose-blockquote:py-2"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>

      {/* Related Blogs Section */}
      {relatedBlogs.length > 0 && (
        <section className="bg-gray-50 py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#002866] mb-12 uppercase">
              Related Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  href={`/${relatedBlog.slug}`}
                  className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-lg"
                >
                  {/* Blog Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[#1e2d5f] to-[#2d4179]">
                    {relatedBlog.featuredImage ? (
                      <Image
                        src={relatedBlog.featuredImage}
                        alt={relatedBlog.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-20 h-20 text-[#FFD700] opacity-60"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2L4 6v2h16V6l-8-4zM4 10v2h16v-2H4zm0 4v2h16v-2H4zm0 4v2h16v-2H4zm8 4l8-4v-2H4v2l8 4z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Blog Title */}
                  <div className="px-6 py-5 bg-white min-h-[110px] flex items-center">
                    <h3 className="text-base font-bold text-[#002866] leading-tight group-hover:text-[#003580] transition-colors duration-300">
                      {relatedBlog.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Blogs Link */}
            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-[#002866] text-white px-8 py-3 rounded-lg hover:bg-[#003580] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
              >
                View All Blog Posts
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

