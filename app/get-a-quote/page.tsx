export default function GetAQuotePage() {
  return (
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

        {/* Quote Form */}
        <form className="space-y-6">
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
                required
                className="w-full px-4 py-3 border-0 bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002866] transition-all text-gray-400"
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
                    className="w-5 h-5 text-[#002866] border-gray-300 focus:ring-[#002866] mr-3"
                  />
                  <label htmlFor="business" className="text-[#002866] font-semibold text-base">
                    Business
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-start">
            <div className="bg-white p-3 inline-block">
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
              className="bg-[#002866] text-white font-bold px-12 py-4 uppercase text-lg hover:bg-[#003580] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              GET A FREE QUOTE
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

