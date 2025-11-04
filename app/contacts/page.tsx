import Image from "next/image";

export default function ContactPage() {
  return (
    <>
      <main className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#002866] text-center mb-16 uppercase tracking-wide">
            CONTACT US
          </h1>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Write to Us */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <Image
                  src="/img/contact/icon/contact-icon1.jpg"
                  alt="Write to Us"
                  width={96}
                  height={96}
                  className="w-24 h-24"
                />
              </div>
              <h2 className="text-2xl font-bold text-[#FDB714] mb-4 uppercase tracking-wide">
                WRITE TO US
              </h2>
              <a
                href="mailto:team@ultimatesolarenergy.com.au"
                className="text-lg text-[#002866] hover:text-[#FDB714] transition-colors"
              >
                team@ultimatesolarenergy.com.au
              </a>
            </div>

            {/* Call Us */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <Image
                  src="/img/contact/icon/contact-icon2.jpg"
                  alt="Call Us"
                  width={96}
                  height={96}
                  className="w-24 h-24"
                />
              </div>
              <h2 className="text-2xl font-bold text-[#FDB714] mb-4 uppercase tracking-wide">
                CALL US
              </h2>
              <a
                href="tel:1300661388"
                className="text-lg text-[#002866] hover:text-[#FDB714] transition-colors font-semibold"
              >
                1300 661 388
              </a>
            </div>

            {/* Locations */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <Image
                  src="/img/contact/icon/contact-icon3.jpg"
                  alt="Locations"
                  width={96}
                  height={96}
                  className="w-24 h-24"
                />
              </div>
              <h2 className="text-2xl font-bold text-[#FDB714] mb-4 uppercase tracking-wide">
                LOCATIONS
              </h2>
              <div className="text-lg text-[#002866] space-y-3">
                <p>1/50 Assembly drive Tullamarine 3043</p>
                <p>Level 6,143 St Georges Terrace, Perth WA 6000</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Google Maps Section - Full Width */}
      <section className="w-full h-[500px] md:h-[600px] lg:h-[700px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12625.790617894303!2d144.858033!3d-37.709169!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6595c408d18f9%3A0x25f1ca6aa4acba3c!2sUnit%201%20A%2F50%20Assembly%20Dr%2C%20Tullamarine%20VIC%203043%2C%20Australia!5e0!3m2!1sen!2sus!4v1762190557936!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ultimate Solar Energy Office Location - Unit 1 A/50 Assembly Dr, Tullamarine"
        ></iframe>
      </section>

      {/* Contact Form Section with Background */}
      <section
        className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/img/contact/calc-bg.jpg')",
          backgroundColor: "#FDB714",
        }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002866] mb-4 uppercase">
              HOW CAN WE HELP YOU
            </h2>
            <p className="text-lg md:text-xl text-[#002866] font-semibold">
              Complete your details and we will be in touch
            </p>
          </div>

          {/* Contact Form */}
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

            {/* Third Row: State & Post Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="state" className="block text-[#002866] font-bold mb-2 uppercase text-sm">
                  STATE<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  required
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

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-[#002866] font-bold mb-2 uppercase text-sm">
                YOUR MESSAGE<span className="text-red-600">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 border-0 bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002866] transition-all resize-none"
              ></textarea>
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
                Contact Us
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

