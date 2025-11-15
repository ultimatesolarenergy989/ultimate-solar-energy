import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching reviews from database...');
    const reviews = await prisma.review.findMany({
      where: { isVisible: true },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        authorName: true,
        authorPhoto: true,
        rating: true,
        reviewText: true,
        publishedAt: true,
        source: true,
      },
    });

    console.log(`Found ${reviews.length} reviews in database`);

    // Serialize dates to ISO strings for JSON
    const serializedReviews = reviews.map(review => ({
      ...review,
      publishedAt: review.publishedAt.toISOString(),
    }));

    // Calculate stats
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

    const ratingDistribution = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length,
    };

    return NextResponse.json({
      success: true,
      reviews: serializedReviews,
      stats: {
        totalReviews,
        averageRating,
        ratingDistribution,
      },
    });
  } catch (error) {
    console.error('Error fetching cached reviews:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch reviews from database' 
      },
      { status: 500 }
    );
  }
}

