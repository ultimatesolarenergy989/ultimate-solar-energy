import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [total, newCount, contactedCount, completedCount, recentQuotations] =
      await Promise.all([
        prisma.quotation.count(),
        prisma.quotation.count({ where: { status: "new" } }),
        prisma.quotation.count({ where: { status: "contacted" } }),
        prisma.quotation.count({ where: { status: "completed" } }),
        prisma.quotation.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            lookingFor: true,
            status: true,
            createdAt: true,
          },
        }),
      ]);

    return NextResponse.json({
      total,
      new: newCount,
      contacted: contactedCount,
      completed: completedCount,
      recentQuotations: recentQuotations.map((quotation) => ({
        ...quotation,
        date: quotation.createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      })),
    });
  } catch (error) {
    console.error("Error fetching quotation stats:", error);
    return NextResponse.json({ error: "Failed to fetch quotation stats" }, { status: 500 });
  }
}

