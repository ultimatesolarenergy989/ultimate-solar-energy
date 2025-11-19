import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";

async function getRecentBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        status: "published",
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        featuredImage: true,
      },
    });
    return blogs;
  } catch (error) {
    console.error("Error fetching recent blogs:", error);
    return [];
  }
}

export default async function Blogs() {
  const blogs = await getRecentBlogs();
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-bold text-[#002866] mb-12 uppercase">
          BLOGS
        </h2>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/${blog.slug}`}
                className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-lg"
              >
                {/* Blog Image */}
                <div className="relative h-48 w-full overflow-hidden bg-white">
                  <Image
                    src={blog.featuredImage || "/img/blog3/jinko.png"}
                    alt={blog.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Blog Title on Gray Background */}
                <div className="px-6 py-5 bg-gray-100 min-h-[110px] flex items-center">
                  <h3 className="text-base font-bold text-[#002866] leading-tight">
                    {blog.title}
                  </h3>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No blogs available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

