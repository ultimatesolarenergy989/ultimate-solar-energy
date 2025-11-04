export default function CustomerSupportPage() {
  return (
    <main className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#002866] mb-6 uppercase">
          CUSTOMER SUPPORT
        </h1>

        {/* Introduction */}
        <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
          Solar energy is easy to understand. But we make it easier for you! We guide you through the system and show you how it works, how to interact with it and more importantly, how much are you saving!
        </p>

        {/* Support Form */}
        <form className="space-y-6">
          {/* What do you need help with */}
          <div>
            <label htmlFor="helpWith" className="block text-[#002866] font-bold mb-2 text-sm uppercase">
              WHAT DO YOU NEED HELP WITH?<span className="text-red-600">*</span>
            </label>
            <select
              id="helpWith"
              name="helpWith"
              required
              className="w-full px-4 py-3 border border-gray-300 bg-gray-50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-[#002866] transition-all"
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
              className="w-full px-4 py-3 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#002866] focus:border-[#002866] transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#002866] file:text-white hover:file:bg-[#003580] file:cursor-pointer"
            />
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
              className="bg-[#002866] text-[#FDB714] font-bold px-12 py-4 uppercase text-lg hover:bg-[#003580] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              SUBMIT SUPPORT REQUEST
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

