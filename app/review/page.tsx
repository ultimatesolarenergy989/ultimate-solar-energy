'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Calendar, User, ExternalLink, RefreshCw, MapPin } from 'lucide-react';

// Force dynamic rendering to avoid any SSR issues
export const dynamic = 'force-dynamic';

interface Review {
  id: string;
  authorName: string;
  authorPhoto?: string;
  rating: number;
  reviewText?: string;
  publishedAt: string;
  source: string;
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export default function ReviewPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching reviews from API...');
      const response = await fetch('/api/reviews/cache');
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('API Response:', data);

      if (data.success) {
        setReviews(data.reviews);
        setStats(data.stats);
        console.log('Reviews loaded:', data.reviews.length);
      } else {
        setError(data.error || 'Failed to load reviews');
        console.error('API Error:', data.error);
      }
    } catch (err) {
      setError('Failed to load reviews');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const syncWithGoogle = async () => {
    try {
      setSyncing(true);
      setError('');
      setSuccessMessage('');
      const response = await fetch('/api/reviews', {
        method: 'POST',
      });
      const data = await response.json();

      if (data.success) {
        setSuccessMessage(data.message);
        await fetchReviews();
      } else {
        setError(data.error || 'Failed to sync reviews');
      }
    } catch (err) {
      setError('Failed to sync with Google');
      console.error('Error syncing reviews:', err);
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

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

  const isReviewExpanded = (reviewId: string) => expandedReviews.has(reviewId);

  const shouldTruncate = (text: string) => {
    // Truncate if text is longer than 300 characters or has more than 4 lines
    return text && text.length > 300;
  };

  const getTruncatedText = (text: string) => {
    if (!text) return '';
    return text.substring(0, 300) + '...';
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
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (err) {
      console.error('Date formatting error:', err);
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e2d5f] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading reviews...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e2d5f] mb-4">
            Customer Reviews
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            See what our customers are saying about Ultimate Solar Energy
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Unit 1/50 Assembly Dr, Tullamarine VIC 3043</span>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-8">
            ✅ {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
            ❌ {error}
          </div>
        )}

        {/* Stats Section */}
        {stats && stats.totalReviews > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Average Rating */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <div className="text-6xl font-bold text-[#1e2d5f]">
                    {stats.averageRating.toFixed(1)}
                  </div>
                  <div>
                    {renderStars(Math.round(stats.averageRating))}
                    <p className="text-gray-600 mt-2">
                      Based on {stats.totalReviews} review{stats.totalReviews !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution] || 0;
                  const percentage = stats.totalReviews > 0 
                    ? (count / stats.totalReviews) * 100 
                    : 0;
                  
                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-600 w-12">
                        {rating} star{rating !== 1 ? 's' : ''}
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sync Button */}
            <div className="mt-8 pt-8 border-t border-gray-200 flex justify-center">
              <button
                onClick={syncWithGoogle}
                disabled={syncing}
                className="flex items-center gap-2 px-6 py-3 bg-[#1e2d5f] text-white rounded-lg hover:bg-[#2d4179] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Syncing with Google...' : 'Sync Latest Reviews'}
              </button>
            </div>
          </div>
        )}

        {/* Reviews List - Single Column */}
        {reviews.length > 0 ? (
          <div className="space-y-6 mb-12">
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
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center mb-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No reviews yet
              </h3>
              <p className="text-gray-600 mb-6">
                Click the sync button below to fetch your latest reviews from Google.
              </p>
              <button
                onClick={syncWithGoogle}
                disabled={syncing}
                className="flex items-center gap-2 px-6 py-3 bg-[#1e2d5f] text-white rounded-lg hover:bg-[#2d4179] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
              >
                <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Syncing...' : 'Sync with Google'}
              </button>
            </div>
          </div>
        )}

        {/* Google Reviews Link */}
        <div className="text-center">
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJIXLVPlxZ1moRsHJQQF64Asc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4a54a] text-white font-semibold rounded-lg hover:bg-[#c49440] transition-colors shadow-lg hover:shadow-xl"
          >
            Leave a Review on Google
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

