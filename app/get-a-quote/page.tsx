"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function GetAQuotePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    state: "",
    postCode: "",
    lookingFor: "",
    categories: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setFormData((prev) => ({
      ...prev,
      categories: isChecked
        ? [...prev.categories, value]
        : prev.categories.filter((cat) => cat !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate at least one category is selected
    if (formData.categories.length === 0) {
      setError("Please select at least one category (Residence or Business)");
      setLoading(false);
      return;
    }

    try {
      // Submit form
      const response = await fetch("/api/quotations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          state: "",
          postCode: "",
          lookingFor: "",
          categories: [],
        });
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Failed to send request. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main
        className="w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/img/get-a-quote/calc-bg.jpg')",
          backgroundColor: "#FDB714",
        }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002866] mb-4 uppercase">
              BEST VALUE SOLAR PANELS DEALS
            </h1>
            <p className="text-base md:text-lg text-[#002866] font-semibold max-w-4xl mx-auto">
              Enter your information below or simply contact us on{" "}
              <span className="font-bold">1300 661 388</span> source your deal before it runs out.
            </p>
          </div>

          {showSuccess ? (
            /* Success Message */
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-t-4 border-[#002866]">
                {/* Success Icon */}
                <div className="bg-gradient-to-br from-[#002866] to-[#003580] p-12 text-center">
                  <div className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <CheckCircle className="w-14 h-14 text-[#002866]" strokeWidth={3} />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-3">Thank You!</h2>
                  <p className="text-white/90 text-lg">Your quote request has been sent successfully</p>
                </div>

                {/* Message Content */}
                <div className="p-8 md:p-12 text-center">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-[#002866] mb-4">
                      We've Received Your Request
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      Our team will review your information and get back to you within <strong className="text-[#002866]">24 hours</strong>.
                      We're excited to help you with your solar energy needs!
                    </p>
                    
                    <div className="bg-gradient-to-r from-[#FFD700]/10 to-[#FDB714]/10 border-l-4 border-[#FFD700] p-6 rounded-lg mb-8">
                      <p className="text-[#002866] font-semibold">
                        ✉️ A confirmation email has been sent to your inbox
                      </p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <p className="text-gray-700 font-semibold mb-4">Need immediate assistance?</p>
                    <div className="space-y-2">
                      <a
                        href="tel:1300661388"
                        className="text-[#002866] hover:text-[#FFD700] transition-colors text-lg font-semibold"
                      >
                        📞 1300 661 388
                      </a>
                      <br />
                      <a
                        href="mailto:team@ultimatesolarenergy.com.au"
                        className="text-[#002866] hover:text-[#FFD700] transition-colors"
                      >
                        ✉️ team@ultimatesolarenergy.com.au
                      </a>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="px-8 py-3 border-2 border-[#002866] text-[#002866] font-bold rounded-lg hover:bg-[#002866] hover:text-white transition-all duration-300 uppercase text-sm"
                    >
                      Submit Another Quote
                    </button>
                    <a
                      href="/"
                      className="px-8 py-3 bg-[#002866] text-white font-bold rounded-lg hover:bg-[#003580] transition-all duration-300 shadow-lg hover:shadow-xl uppercase text-sm"
                    >
                      Back to Home
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Quote Form */
            <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Row: First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-[#002866] font-bold mb-2 uppercase text-sm">
                FIRST NAME<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-0 bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002866] transition-all"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-[#002866] font-bold mb-2 uppercase text-sm">
                LAST NAME<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-0 bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002866] transition-all"
              />
            </div>
          </div>

          {/* Second Row: Phone Number & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-[#002866] font-bold mb-2 uppercase text-sm">
                PHONE NUMBER<span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-0 bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002866] transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[#002866] font-bold mb-2 uppercase text-sm">
                EMAIL<span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-0 bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002866] transition-all"
              />
            </div>
          </div>

          {/* Third Row: State/Region & Post Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="state" className="block text-[#002866] font-bold mb-2 text-sm">
                State/Region
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-3 border-0 bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002866] transition-all"
              />
            </div>
            <div>
              <label htmlFor="postCode" className="block text-[#002866] font-bold mb-2 uppercase text-sm">
                POST CODE<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="postCode"
                name="postCode"
                value={formData.postCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-0 bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002866] transition-all"
              />
            </div>
          </div>

          {/* Fourth Row: What are you looking for? & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="lookingFor" className="block text-[#002866] font-bold mb-2 text-sm">
                What are you looking for?<span className="text-red-600">*</span>
              </label>
              <select
                id="lookingFor"
                name="lookingFor"
                value={formData.lookingFor}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-0 bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002866] transition-all text-gray-700"
              >
                <option value="">Please Select</option>
                <option value="solar-panels">Solar Panels</option>
                <option value="solar-battery">Solar Battery</option>
                <option value="ev-charger">EV Charger</option>
                <option value="heat-pump">Heat Pump</option>
                <option value="air-conditioning">Air Conditioning</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-[#002866] font-bold mb-2 text-sm">
                Category<span className="text-red-600">*</span>
              </label>
              <div className="space-y-3 mt-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="residence"
                    name="category"
                    value="residence"
                    checked={formData.categories.includes("residence")}
                    onChange={handleCategoryChange}
                    className="w-5 h-5 text-[#002866] border-gray-300 focus:ring-[#002866] mr-3"
                  />
                  <label htmlFor="residence" className="text-[#002866] font-semibold text-base">
                    Residence
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="business"
                    name="category"
                    value="business"
                    checked={formData.categories.includes("business")}
                    onChange={handleCategoryChange}
                    className="w-5 h-5 text-[#002866] border-gray-300 focus:ring-[#002866] mr-3"
                  />
                  <label htmlFor="business" className="text-[#002866] font-semibold text-base">
                    Business
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <p className="text-red-700 font-semibold">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#002866] text-white font-bold px-12 py-4 uppercase text-lg hover:bg-[#003580] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "GET A FREE QUOTE"
              )}
            </button>
          </div>
        </form>
          )}
        </div>
      </main>
    </>
  );
}

