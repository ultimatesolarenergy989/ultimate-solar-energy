import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;

export async function POST(request: NextRequest) {
  try {
    if (!GOOGLE_API_KEY || !PLACE_ID) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Google Places API credentials not configured. Please check your environment variables.' 
        },
        { status: 500 }
      );
    }

    console.log('Fetching reviews from Google Places API...');
    console.log('Place ID:', PLACE_ID);

    // Fetch place details including reviews
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${GOOGLE_API_KEY}`
    );

    if (!response.ok) {
      console.error('Google API HTTP Error:', response.status);
      return NextResponse.json(
        { 
          success: false, 
          error: `Failed to fetch from Google (HTTP ${response.status})` 
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Google API Response Status:', data.status);

    if (data.status !== 'OK') {
      console.error('Google API Error:', data);
      return NextResponse.json(
        { 
          success: false, 
          error: `Google API Error: ${data.status}${data.error_message ? ' - ' + data.error_message : ''}` 
        },
        { status: 400 }
      );
    }

    const googleReviews = data.result?.reviews || [];
    console.log(`Found ${googleReviews.length} reviews`);

    if (googleReviews.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No reviews found for this business',
        newReviews: 0,
        updatedReviews: 0,
      });
    }

    // Save reviews to database
    let newReviewsCount = 0;
    let updatedReviewsCount = 0;

    for (const review of googleReviews) {
      const reviewData = {
        googleReviewId: `google-${review.author_name}-${review.time}`,
        authorName: review.author_name || 'Anonymous',
        authorPhoto: review.profile_photo_url,
        rating: review.rating || 5,
        reviewText: review.text || null,
        publishedAt: new Date(review.time * 1000), // Convert Unix timestamp
        source: 'google',
      };

      // Check if review already exists
      const existingReview = await prisma.review.findUnique({
        where: { googleReviewId: reviewData.googleReviewId },
      });

      if (existingReview) {
        // Update existing review
        await prisma.review.update({
          where: { id: existingReview.id },
          data: reviewData,
        });
        updatedReviewsCount++;
      } else {
        // Create new review
        await prisma.review.create({
          data: reviewData,
        });
        newReviewsCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${googleReviews.length} reviews (${newReviewsCount} new, ${updatedReviewsCount} updated)`,
      newReviews: newReviewsCount,
      updatedReviews: updatedReviewsCount,
    });
  } catch (error) {
    console.error('Error syncing reviews:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}

