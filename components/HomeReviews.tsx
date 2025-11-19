'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Calendar, User } from 'lucide-react';

interface Review {
  id: string;
  authorName: string;
  authorPhoto?: string;
  rating: number;
  reviewText?: string;
  publishedAt: string;
  source: string;
}

export default function HomeReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/reviews/cache');
      const data = await response.json();

      if (data.success) {
        // Get only the first 5 reviews
        setReviews(data.reviews.slice(0, 5));
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  const shouldTruncate = (text: string) => {
    return text.length > 200;
  };

  const getTruncatedText = (text: string) => {
    return text.substring(0, 200) + '...';
  };

  const isReviewExpanded = (reviewId: string) => {
    return expandedReviews.has(reviewId);
  };

  const toggleReviewExpansion = (reviewId: string) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return null; // Don't show anything if no reviews
  }

  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#002866] text-center mb-12 uppercase">
          WHAT OUR CUSTOMERS SAY
        </h2>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => {
            const isExpanded = isReviewExpanded(review.id);
            const needsTruncation = review.reviewText && shouldTruncate(review.reviewText);
            
            return (
              <div
                key={review.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                {/* Author Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    {review.authorPhoto ? (
                      <div className="relative w-14 h-14 rounded-full overflow-hidden">
                        <Image
                          src={review.authorPhoto}
                          alt={review.authorName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-[#1e2d5f] flex items-center justify-center">
                        <User className="w-7 h-7 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {review.authorName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(review.rating)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(review.publishedAt)}</span>
                    </div>
                  </div>
                  {review.source === 'google' && (
                    <div className="flex-shrink-0">
                      <svg className="w-7 h-7" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Review Text with Read More */}
                {review.reviewText && (
                  <div className="mt-4">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {needsTruncation && !isExpanded 
                        ? getTruncatedText(review.reviewText)
                        : review.reviewText
                      }
                    </p>
                    {needsTruncation && (
                      <button
                        onClick={() => toggleReviewExpansion(review.id)}
                        className="mt-2 text-[#1e2d5f] hover:text-[#2d4179] font-semibold text-sm flex items-center gap-1 transition-colors"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                        <svg 
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

