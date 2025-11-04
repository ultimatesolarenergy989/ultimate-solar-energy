import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET single blog
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
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

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// PUT update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    } = body;

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id: params.id },
    });

    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Check if slug already exists (excluding current blog)
    if (slug && slug !== existingBlog.slug) {
      const slugExists = await prisma.blog.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: "Slug already exists. Please choose a different slug." },
          { status: 400 }
        );
      }
    }

    // Update blog
    const blog = await prisma.blog.update({
      where: { id: params.id },
      data: {
        title: title || existingBlog.title,
        slug: slug || existingBlog.slug,
        content: content || existingBlog.content,
        excerpt: excerpt || existingBlog.excerpt,
        featuredImage: featuredImage !== undefined ? featuredImage : existingBlog.featuredImage,
        tags: tags || existingBlog.tags,
        metaDescription: metaDescription !== undefined ? metaDescription : existingBlog.metaDescription,
        status: status || existingBlog.status,
        publishedAt: status === "published" && publishedAt ? new Date(publishedAt) : existingBlog.publishedAt,
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

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

// DELETE blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.blog.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}

