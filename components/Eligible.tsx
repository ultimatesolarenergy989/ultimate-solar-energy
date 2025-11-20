"use client";
import { useState } from "react";

export default function Eligible() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validate Australian phone number
    const phoneDigits = phone.replace(/\D/g, ""); // Remove all non-digits
    const isValidAustralianPhone =
      // Mobile: 04XX XXX XXX (10 digits starting with 04)
      /^04\d{8}$/.test(phoneDigits) ||
      // Landline: 02/03/07/08 XXXX XXXX (10 digits)
      /^0[2378]\d{8}$/.test(phoneDigits) ||
      // Toll-free: 1300/1800 XXX XXX (10 digits)
      /^1[38]00\d{6}$/.test(phoneDigits) ||
      // International format: +61 4XX XXX XXX (starts with +61)
      /^61[2378]\d{8}$/.test(phoneDigits) ||
      /^614\d{8}$/.test(phoneDigits);

    if (!isValidAustralianPhone) {
      setSubmitStatus({
        type: "error",
        message:
          "Please enter a valid Australian phone number (e.g., 0400 123 456 or 02 1234 5678)",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/eligibility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit eligibility check");
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you! We've sent the Solar Tax Benefits eligibility guide to your email. Our team will contact you within 24 hours.",
      });

      // Reset form
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error("Eligibility submission error:", error);
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to submit. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#002866] mb-6 leading-tight">
              ARE YOU ELIGIBLE FOR SOLAR TAX BENEFITS?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Asset Write-off, Depreciation Deduction, SBTO, GST Credits and much more
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#002866] focus:border-transparent outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone number<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#002866] focus:border-transparent outline-none transition-all"
                  placeholder="0400 123 456"
                  title="Please enter a valid Australian phone number"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Format: 04XX XXX XXX (mobile) or 02/03/07/08 XXXX XXXX (landline)
                </p>
              </div>

              {/* Status Messages */}
              {submitStatus && (
                <div
                  className={`p-4 rounded-md ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#002866] text-white font-bold py-3 px-6 rounded-md transition-all duration-300 uppercase tracking-wide shadow-lg hover:shadow-xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {isSubmitting ? "Submitting..." : "Check Your Eligibility Now"}
                </span>
                {!isSubmitting && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

