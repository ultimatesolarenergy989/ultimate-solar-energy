import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    id: 1,
    title: "Jinko vs Trina Solar Panels Comparison 2023",
    image: "/img/blog3/jinko.png",
    link: "#", // Placeholder - will be updated later
  },
  {
    id: 2,
    title: "How to Select the best commercial solar PV installers in Victoria?",
    image: "/img/blog3/blog-2.png",
    link: "#", // Placeholder - will be updated later
  },
  {
    id: 3,
    title: "5 Ways to Finance Home Solar PV Systems in Australia",
    image: "/img/blog3/blog-1.png",
    link: "#", // Placeholder - will be updated later
  },
];

export default function Blogs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-bold text-[#002866] mb-12 uppercase">
          BLOGS
        </h2>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={blog.link}
              className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-lg"
            >
              {/* Blog Image */}
              <div className="relative h-48 w-full overflow-hidden bg-white">
                <Image
                  src={blog.image}
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
          ))}
        </div>
      </div>
    </section>
  );
}

