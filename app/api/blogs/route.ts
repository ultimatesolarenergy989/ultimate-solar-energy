import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all blogs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const publicOnly = searchParams.get("public") === "true";

    let where: any = {};
    
    if (publicOnly) {
      // For public blog page - only published blogs
      where = { status: "published" };
    } else if (status && status !== "all") {
      // For admin dashboard - filter by status
      where = { status };
    }

    const blogs = await prisma.blog.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    console.log(`✅ API fetched ${blogs.length} blogs (status: ${status || 'all'}, public: ${publicOnly})`);

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST create new blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      tags,
      metaDescription,
      status,
      publishedAt,
      authorId,
    } = body;

    // Validate required fields
    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: "Title, content, and author are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    if (slug) {
      const existingBlog = await prisma.blog.findUnique({
        where: { slug },
      });

      if (existingBlog) {
        return NextResponse.json(
          { error: "Slug already exists. Please choose a different slug." },
          { status: 400 }
        );
      }
    }

    // Create blog
    const blog = await prisma.blog.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
        content,
        excerpt: excerpt || content.substring(0, 200) + "...",
        featuredImage: featuredImage || null,
        tags: tags || [],
        metaDescription: metaDescription || null,
        status: status || "draft",
        publishedAt: status === "published" && publishedAt ? new Date(publishedAt) : null,
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}

