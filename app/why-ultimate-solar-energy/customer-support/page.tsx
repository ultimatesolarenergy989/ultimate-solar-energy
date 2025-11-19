'use client';

import { useState, FormEvent } from 'react';

export default function CustomerSupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [formData, setFormData] = useState({
    helpWith: '',
    email: '',
    phone: '',
    invoiceNumber: '',
    streetAddress: '',
    subject: '',
    description: '',
    ticketName: '',
    ticketDescription: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      // Append file if selected
      if (selectedFile) {
        submitData.append('file', selectedFile);
      }

      // Submit to API
      const response = await fetch('/api/customer-support', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit support request');
      }

      // Success - Show thank you page
      setTicketId(result.ticketId);
      setShowThankYou(true);

      // Scroll to top to show thank you message
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Support submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to submit support request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Thank You Page */}
        {showThankYou ? (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Thank you!
              </h1>
              <h3 className="text-xl text-gray-600 mb-6">Your support request has been received</h3>
            </div>

            <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">
                Your Support Ticket Has Been Created
              </h3>
              <div className="bg-white p-4 rounded-lg border-2 border-green-300 mb-4">
                <p className="text-center text-gray-700 mb-2">Your Ticket ID:</p>
                <p className="text-center text-3xl font-bold text-[#002866]">{ticketId}</p>
              </div>
              <p className="text-lg text-gray-700 text-center">
                Our support team will review your request and get back to you shortly. We typically respond within 24 hours.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-bold text-gray-800 mb-3 text-center text-xl">What happens next?</h4>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#002866] text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <p>Our support team will review your request and any attachments you provided.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#002866] text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <p>A support specialist will contact you at <strong>{formData.email}</strong> or <strong>{formData.phone}</strong>.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#002866] text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <p>We'll work together to resolve your issue and ensure your satisfaction.</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-bold text-green-800 mb-2 text-center">Confirmation Email Sent!</h4>
              <p className="text-gray-700 text-center">
                A confirmation email with your ticket details has been sent to <strong>{formData.email}</strong>. 
                Please check your inbox and keep this email for your records.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6">
              <h4 className="font-bold text-gray-800 mb-2 text-center">Need Immediate Assistance?</h4>
              <p className="text-gray-700 text-center mb-3">
                If your issue is urgent, please contact us directly:
              </p>
              <div className="text-center">
                <p className="text-xl font-bold text-[#002866]">📞 1300 661 388</p>
                <p className="text-gray-600 mt-2">Monday - Friday: 8:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="text-center pt-6">
              <button
                onClick={() => {
                  setShowThankYou(false);
                  setFormData({
                    helpWith: '',
                    email: '',
                    phone: '',
                    invoiceNumber: '',
                    streetAddress: '',
                    subject: '',
                    description: '',
                    ticketName: '',
                    ticketDescription: '',
                  });
                  setSelectedFile(null);
                  setTicketId('');
                }}
                className="bg-[#002866] text-[#FDB714] font-bold px-8 py-3 uppercase text-lg hover:bg-[#003580] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Page Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-[#002866] mb-6 uppercase">
              CUSTOMER SUPPORT
            </h1>

            {/* Introduction */}
            <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
              Solar energy is easy to understand. But we make it easier for you! We guide you through the system and show you how it works, how to interact with it and more importantly, how much are you saving!
            </p>

            {/* Status Messages */}
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-100 border border-green-400 text-green-700' 
                  : 'bg-red-100 border border-red-400 text-red-700'
              }`}>
                <p className="font-semibold">{submitStatus.message}</p>
              </div>
            )}

        {/* Support Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* What do you need help with */}
          <div>
            <label htmlFor="helpWith" className="block text-[#002866] font-bold mb-2 text-sm uppercase">
              WHAT DO YOU NEED HELP WITH?<span className="text-red-600">*</span>
            </label>
            <select
              id="helpWith"
              name="helpWith"
              value={formData.helpWith}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-[#002866] transition-all"
            >
              <option value="">Please Select</option>
              <option value="installation">Installation</option>
              <option value="maintenance">Maintenance</option>
              <option value="billing">Billing</option>
              <option value="technical">Technical Support</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Email and Phone Number Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-[#002866] font-bold mb-2 text-sm uppercase">
                EMAIL<span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-[#002866] transition-all"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-[#002866] font-bold mb-2 text-sm uppercase">
                PHONE NUMBER<span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-[#002866] transition-all"
              />
            </div>
          </div>

          {/* Invoice/Quote Number and Street Address Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="invoiceNumber" className="block text-[#002866] font-bold mb-2 text-sm uppercase">
                INVOICE/QUOTE NUMBER
              </label>
              <input
                type="text"
                id="invoiceNumber"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-[#002866] transition-all"
              />
            </div>
            <div>
              <label htmlFor="streetAddress" className="block text-[#002866] font-bold mb-2 text-sm uppercase">
                STREET ADDRESS<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-[#002866] transition-all"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-[#002866] font-bold mb-2 text-sm uppercase">
              SUBJECT<span className="text-red-600">*</span>
            </label>
            <textarea
              id="subject"
              name="subject"
              rows={3}
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-[#002866] transition-all resize-none"
            ></textarea>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-[#002866] font-bold mb-2 text-sm uppercase">
              DESCRIPTION
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-[#002866] transition-all resize-none"
            ></textarea>
          </div>

          {/* Attach File */}
          <div>
            <label htmlFor="attachment" className="block text-[#002866] font-bold mb-2 text-sm uppercase">
              ATTACH FILE
            </label>
            <input
              type="file"
              id="attachment"
              name="attachment"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
              className="w-full px-4 py-3 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-[#002866] transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#002866] file:text-white hover:file:bg-[#003580] file:cursor-pointer"
            />
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          {/* Ticket Name */}
          <div>
            <label htmlFor="ticketName" className="block text-[#002866] font-bold mb-2 text-sm">
              Ticket name
            </label>
            <input
              type="text"
              id="ticketName"
              name="ticketName"
              value={formData.ticketName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-[#002866] transition-all"
            />
          </div>

          {/* Ticket Description */}
          <div>
            <label htmlFor="ticketDescription" className="block text-[#002866] font-bold mb-2 text-sm">
              Ticket description
            </label>
            <textarea
              id="ticketDescription"
              name="ticketDescription"
              rows={4}
              value={formData.ticketDescription}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-[#002866] transition-all resize-none"
            ></textarea>
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-start">
            <div className="bg-white p-3 border border-gray-300 inline-block">
              <div className="flex items-center gap-3">
                <input type="checkbox" id="recaptcha" className="w-6 h-6" required />
                <div>
                  <p className="text-sm font-semibold text-gray-700">protected by reCAPTCHA</p>
                  <p className="text-xs text-blue-600">
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy</a>
                    {" - "}
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms</a>
                  </p>
                </div>
                <div className="ml-4">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 text-blue-500">
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#002866] text-[#FDB714] font-bold px-12 py-4 uppercase text-lg hover:bg-[#003580] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT SUPPORT REQUEST'}
            </button>
          </div>
        </form>
          </>
        )}
      </div>
    </main>
  );
}
