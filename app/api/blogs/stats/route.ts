import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Get all blogs count
    const totalBlogs = await prisma.blog.count();

    // Get published blogs count
    const publishedBlogs = await prisma.blog.count({
      where: { status: "published" },
    });

    // Get draft blogs count
    const draftBlogs = await prisma.blog.count({
      where: { status: "draft" },
    });

    // Get total views
    const viewsResult = await prisma.blog.aggregate({
      _sum: {
        views: true,
      },
    });
    const totalViews = viewsResult._sum.views || 0;

    // Get recent blogs (last 5)
    const recentBlogs = await prisma.blog.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
      },
    });

    // Format recent blogs
    const formattedRecentBlogs = recentBlogs.map((blog: {
      id: string;
      title: string;
      status: string;
      createdAt: Date;
    }) => ({
      ...blog,
      date: new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }));

    return NextResponse.json({
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalViews,
      recentBlogs: formattedRecentBlogs,
    });
  } catch (error) {
    console.error("Error fetching blog stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog stats" },
      { status: 500 }
    );
  }
}

