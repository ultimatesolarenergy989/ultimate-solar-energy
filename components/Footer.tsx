"use client";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Facebook, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribe email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#002866] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info Section */}
          <div className="space-y-4">
            {/* Logo */}
            <Link href="/">
              <div className="    p-1 inline-block">
                <Image
                  src="/img/logo/use-logo.jpg"
                  alt="Ultimate Solar Energy"
                  width={260}
                  height={100}
                  className="h-22 w-auto"
                  priority
                />
              </div>
            </Link>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-[#FFD700] flex-shrink-0 mt-1" />
                <div>
                  <p>1/50 Assembly drive Tullamarine 3043</p>
                  <p>Level 6,143 St Georges Terrace, Perth WA 6000</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={18} className="text-[#FFD700] flex-shrink-0" />
                <a href="tel:1300661388" className="hover:text-[#FFD700] transition-colors">
                  1300 661 388
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={18} className="text-[#FFD700] flex-shrink-0" />
                <a
                  href="mailto:team@ultimatesolarenergy.com.au"
                  className="hover:text-[#FFD700] transition-colors break-all"
                >
                  team@ultimatesolarenergy.com.au
                </a>
              </div>
            </div>

            {/* Certification Badges */}
            <div className="space-y-3 pt-4">
              {/* Clean Energy Council Logo - Left aligned, Clickable */}
              <div className="flex items-center justify-start">
                <Link
                  href="/ultimate-solar-energy-a-cec-approved-solar-retailer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-200"
                  title="CEC Approved Solar Retailer - Learn More"
                >
                  <Image
                    src="/img/cmp-logo/CEC-Logo-White.png"
                    alt="Clean Energy Council - Approved Solar Retailer"
                    width={200}
                    height={80}
                    className="h-20 w-auto object-contain"
                  />
                </Link>
              </div>
              
              {/* Other Certification Logos - Slightly right aligned */}
              <div className="flex items-center justify-start pl-8">
                <Image
                  src="/img/cmp-logo/footer-120px.png"
                  alt="Approved Certifications"
                  width={250}
                  height={120}
                  className="h-24 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Our Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 uppercase">Our Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/commercial"
                  className="hover:text-[#FFD700] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#FFD700]">›</span> Commercial
                </Link>
              </li>
              <li>
                <Link
                  href="/quote"
                  className="hover:text-[#FFD700] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#FFD700]">›</span> Get a Quote
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-[#FFD700] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#FFD700]">›</span> Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-[#FFD700] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#FFD700]">›</span> News
                </Link>
              </li>
              <li>
                <Link
                  href="/solar-homes"
                  className="hover:text-[#FFD700] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#FFD700]">›</span> Solar Homes Program Update
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Commitment */}
          <div>
            <h3 className="text-xl font-bold mb-6 uppercase">Our Commitment</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-[#FFD700] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#FFD700]">›</span> Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-[#FFD700] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#FFD700]">›</span> Customer Support/Complaints
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="hover:text-[#FFD700] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#FFD700]">›</span> System Warranty
                </Link>
              </li>
              <li>
                <Link
                  href="/cec-approved"
                  className="hover:text-[#FFD700] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#FFD700]">›</span> CEC Approved Solar Retailer
                </Link>
              </li>
              <li>
                <Link
                  href="/support-now"
                  className="hover:text-[#FFD700] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#FFD700]">›</span> Get Support Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 uppercase">Newsletter</h3>
            <p className="text-sm mb-4">
              Subscribe our newsletter get notification about new updates, etc.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email*"
                className="w-full px-4 py-3 bg-white text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                required
              />
              <button
                type="submit"
                className="bg-[#FFD700] text-[#002866] font-bold px-6 py-3 rounded transition-all duration-300 uppercase tracking-wide w-full shadow-lg hover:shadow-2xl hover:scale-105 relative overflow-hidden group active:scale-[0.98]"
              >
                <span className="relative z-10">Subscribe</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#FFD700] text-[#002866] py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm font-semibold">
            © {new Date().getFullYear()} Ultimate Solar Energy
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.facebook.com/ultimatesolarenergyau/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-hover"
              aria-label="Facebook"
            >
              <Facebook size={22} strokeWidth={0} fill="currentColor" />
            </a>
            <a
              href="https://www.linkedin.com/company/ultimate-solar-energy/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-hover"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} strokeWidth={0} fill="currentColor" />
            </a>
            <a
              href="https://www.instagram.com/ultimatesolarenergy.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-hover"
              aria-label="Instagram"
            >
              <Instagram size={22} strokeWidth={2} fill="none" />
            </a>
          </div>
        </div>
      </div>

     
    </footer>
  );
}
