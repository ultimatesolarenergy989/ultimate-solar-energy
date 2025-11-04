import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [total, newCount, contactedCount, completedCount, recentContacts] =
      await Promise.all([
        prisma.contact.count(),
        prisma.contact.count({ where: { status: "new" } }),
        prisma.contact.count({ where: { status: "contacted" } }),
        prisma.contact.count({ where: { status: "completed" } }),
        prisma.contact.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
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
      recentContacts: recentContacts.map((contact) => ({
        ...contact,
        date: contact.createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      })),
    });
  } catch (error) {
    console.error("Error fetching contact stats:", error);
    return NextResponse.json({ error: "Failed to fetch contact stats" }, { status: 500 });
  }
}



