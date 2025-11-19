'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function ReviewWidget() {
  const [step, setStep] = useState<'initial' | 'positive' | 'negative'>('initial');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handlePositiveFeedback = () => {
    setStep('positive');
    setSubmitError('');
  };

  const handleNegativeFeedback = () => {
    setStep('negative');
    setSubmitError('');
  };

  const resetWidget = () => {
    setStep('initial');
    setSubmitSuccess(false);
    setSubmitError('');
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
        });
      } else {
        setSubmitError(data.error || 'Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleReview = () => {
    window.open('https://search.google.com/local/writereview?placeid=ChIJIXLVPlxZ1moRsHJQQF64Asc', '_blank');
  };

  const handleFacebookReview = () => {
    window.open('https://www.facebook.com/ultimatesolarenergyau/reviews', '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      {/* Initial State */}
      {step === 'initial' && (
        <div className="text-center">
          <p className="text-gray-700 mb-6">
            Help us. Help others. You're invited to review:
          </p>

          <div className="mb-6 bg-white p-4 rounded-lg">
            <div className="relative w-full h-32 mb-4">
              <Image
                src="/img/medium.png"
                alt="Ultimate Solar Energy"
                fill
                className="object-contain"
              />
            </div>
            <button className="w-full px-4 py-2 border-2 border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              Ultimate Solar Energy: Home
            </button>
          </div>

          <p className="text-gray-700 text-sm mb-6">
            Please take a moment to review your experience with us. Your feedback not only helps us, it helps other potential customers.
          </p>

          <div className="flex gap-4 justify-center mb-6">
            <button
              onClick={handlePositiveFeedback}
              className="flex flex-col items-center gap-2 p-6 bg-gray-200 hover:bg-gray-300 rounded-full transition-all duration-300 group"
            >
              <ThumbsUp className="w-12 h-12 text-gray-600 group-hover:text-gray-800" />
            </button>
            <button
              onClick={handleNegativeFeedback}
              className="flex flex-col items-center gap-2 p-6 bg-gray-200 hover:bg-gray-300 rounded-full transition-all duration-300 group"
            >
              <ThumbsDown className="w-12 h-12 text-gray-600 group-hover:text-gray-800" />
            </button>
          </div>
        </div>
      )}

      {/* Positive Feedback - Review Platform Selection */}
      {step === 'positive' && (
        <div className="text-center">
          <p className="text-gray-700 mb-2">
            Thank you! <strong>We need your help.</strong>
          </p>
          <p className="text-gray-600 mb-6">
            Would you share your experience on one of these sites?
          </p>

          <div className="space-y-4 mb-6">
            <button
              onClick={handleGoogleReview}
              className="w-full p-4 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <svg className="w-32 h-12 mx-auto" viewBox="0 0 272 92">
                <path fill="#4285F4" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                <path fill="#EA4335" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                <path fill="#FBBC05" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
                <path fill="#4285F4" d="M225 3v65h-9.5V3h9.5z"/>
                <path fill="#34A853" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
                <path fill="#EA4335" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/>
              </svg>
            </button>

            <button
              onClick={handleFacebookReview}
              className="w-full p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
            >
              <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
                <path d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24c0 11.979 8.776 21.908 20.25 23.708v-16.77h-6.094V24h6.094v-5.288c0-6.014 3.583-9.337 9.065-9.337 2.625 0 5.372.469 5.372.469v5.906h-3.026c-2.981 0-3.911 1.85-3.911 3.748V24h6.656l-1.064 6.938H27.75v16.77C39.224 45.908 48 35.978 48 24z" fill="#1877F2"/>
                <path d="M33.342 30.938L34.406 24H27.75v-4.502c0-1.898.93-3.748 3.911-3.748h3.026V9.844s-2.747-.469-5.372-.469c-5.482 0-9.065 3.323-9.065 9.337V24h-6.094v6.938h6.094v16.77a24.18 24.18 0 007.5 0v-16.77h5.592z" fill="#fff"/>
              </svg>
              <span className="font-semibold text-gray-800">Facebook</span>
            </button>
          </div>

          <p className="text-xs text-blue-600">
            If you have concerns you wish to address in private, please{' '}
            <button
              onClick={() => setStep('negative')}
              className="underline hover:text-blue-800"
            >
              get in touch
            </button>
            .
          </p>

          <button
            onClick={resetWidget}
            className="mt-4 text-sm text-gray-600 hover:text-gray-800 underline"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Negative Feedback - Contact Form */}
      {step === 'negative' && (
        <div>
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank you!</h3>
              <p className="text-gray-600 mb-6">We appreciate your feedback and will get back to you soon.</p>
              <button
                onClick={resetWidget}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                ← Back
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-700 text-center mb-6">
                We strive for 100% customer satisfaction. If we fell short, please tell us more so we can address your concerns.
              </p>

              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your Name*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Email*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Message"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>

              <button
                onClick={resetWidget}
                type="button"
                className="mt-4 text-sm text-gray-600 hover:text-gray-800 underline block mx-auto"
              >
                ← Back
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

