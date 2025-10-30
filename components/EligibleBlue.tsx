"use client";
import { useState } from "react";

export default function EligibleBlue() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [phoneError, setPhoneError] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) {
      setEmailError(!email);
      setPhoneError(!phone);
      return;
    }
    // TODO: Replace with actual PDF link when available
    window.open("/pdf/eligibility-guide.pdf", "_blank");
  };

  return (
    <section className="py-16 bg-[#002866]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              ARE YOU ELIGIBLE FOR SOLAR TAX BENEFITS?
            </h2>
            <p className="text-base text-white leading-relaxed">
              Asset Write-off, Depreciation Deduction, SBTO, GST Credits and much more
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email-blue" className="block text-sm font-medium text-white mb-2">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email-blue"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label htmlFor="phone-blue" className="block text-sm font-medium text-white mb-2">
                  Phone number<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone-blue"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError(false);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all"
                  placeholder="+61 XXX XXX XXX"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#FFD700] text-[#002866] font-bold py-3 px-6 rounded-md transition-all duration-300 uppercase tracking-wide shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                <span className="relative z-10">Check Your Eligibility Now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

