"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Phone, ChevronDown, X, Menu } from "lucide-react";

const productCategories = [
  {
    label: "RESIDENTIAL",
    href: "/products/residential",
      submenu: [
        { href: "/products/6-6-kw-platinum-system", label: "6.6 KW PLATINUM SYSTEM" },
        { href: "/products/6-6-kw-boost-system", label: "6.6 KW BOOST SYSTEM" },
        { href: "/products/6-6-kw-ultimate-system", label: "6.6 KW ULTIMATE SYSTEM" },
        { href: "/products/10-kw-ultimate-system", label: "10 KW ULTIMATE SYSTEM" },
        { href: "/products/10-5-kw-platinum-system", label: "10.5 KW PLATINUM SYSTEM" },
        { href: "/products/13-3kw-platinum-system", label: "13.3KW PLATINUM SYSTEM" },
        { href: "/products/13-3-kw-ultimate-system", label: "13.3 KW ULTIMATE SYSTEM" },
    ],
  },
  {
    label: "COMMERCIAL",
    href: "/commercial-solars",
    submenu: null,
  },
  {
    label: "SOLAR BATTERY STORAGE",
    href: "/solar-battery-storage",
    submenu: null,
  },
  {
    label: "SOLAR SERVICE AND CLEANING",
    href: "/solar-service-and-cleaning",
    submenu: null,
  },
  {
    label: "SOLAR EV CHARGERS",
    href: "/solar-ev-chargers",
    submenu: null,
  },
  {
    label: "HEAT PUMPS",
    href: "/heat-pumps",
    submenu: null,
  },
  {
    label: "AIR CON",
    href: "/use-aircon-rebate-2024",
    submenu: null,
  },
];

export default function Header() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`bg-[#002866] text-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : "shadow-md"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between h-20 md:h-24 pb-2 pt-2">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 z-50 self-center">
            <div className="border-1 md:border-1 border-white p-1 hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/img/logo/use-logo.jpg"
                alt="Ultimate Solar Energy"
                width={260}
                height={100}
                className="h-14 md:h-18 lg:h-22 w-auto"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center mx-2">
            <Link
              href="/about-us"
              className="text-white hover:text-[#FFD700] transition-all duration-200 font-semibold uppercase text-[11px] xl:text-xs tracking-wide px-2 xl:px-3 py-2 rounded hover:bg-white/10 whitespace-nowrap"
            >
              About Us
            </Link>

            <Link
              href="/review"
              className="text-white hover:text-[#FFD700] transition-all duration-200 font-semibold uppercase text-[11px] xl:text-xs tracking-wide px-2 xl:px-3 py-2 rounded hover:bg-white/10 whitespace-nowrap"
            >
              Reviews
                    </Link>

            {/* Products Dropdown */}
            <div
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => {
                setProductsOpen(false);
                setActiveSubmenu(null);
              }}
              className="relative group"
            >
              <button className="text-white hover:text-[#FFD700] transition-all duration-200 font-semibold uppercase text-[11px] xl:text-xs tracking-wide px-2 xl:px-3 py-2 rounded hover:bg-white/10 flex items-center gap-1 whitespace-nowrap">
                Products
                <ChevronDown
                  size={14}
                  className={`transform transition-transform duration-200 ${
                    productsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {productsOpen && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="bg-gradient-to-br from-[#002866] via-[#003580] to-[#002866] text-white shadow-2xl rounded-xl overflow-hidden animate-fadeIn flex border border-[#FFD700]/20">
                    {/* Main Categories Column */}
                    <div className="w-64 py-2">
                      {productCategories.map((category, index) => (
                        <div
                          key={category.href}
                          onMouseEnter={() => setActiveSubmenu(category.label)}
                          className="relative group/item"
                        >
                          <Link
                            href={category.href}
                            className={`block px-5 py-3.5 transition-all duration-300 border-b border-white/5 last:border-b-0 font-semibold text-sm relative overflow-hidden ${
                              activeSubmenu === category.label
                                ? "bg-gradient-to-r from-[#FFD700]/20 to-transparent text-[#FFD700] shadow-lg"
                                : "hover:bg-white/10 hover:text-[#FFD700] hover:pl-6"
                            }`}
                            style={{ animationDelay: `${index * 30}ms` }}
                          >
                            {activeSubmenu === category.label && (
                              <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFD700] to-yellow-600 shadow-lg shadow-[#FFD700]/50"></span>
                            )}
                            <span className="relative z-10">{category.label}</span>
                            {category.submenu && (
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FFD700]/60 group-hover/item:text-[#FFD700] transition-colors">
                                ›
                              </span>
                            )}
                          </Link>
                        </div>
                      ))}
                    </div>

                    {/* Submenu Column - Only show if submenu exists */}
                    {activeSubmenu &&
                      productCategories.find((cat) => cat.label === activeSubmenu)?.submenu && (
                        <div className="w-80 bg-gradient-to-br from-white to-gray-50 text-slate-800 border-l border-[#FFD700]/30 animate-fadeIn shadow-inner py-2">
                          {productCategories
                            .find((cat) => cat.label === activeSubmenu)
                            ?.submenu?.map((item, index) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="group/subitem block px-5 py-3.5 hover:bg-gradient-to-r hover:from-[#002866]/5 hover:via-[#FFD700]/10 hover:to-transparent transition-all duration-300 border-b border-gray-100/50 last:border-b-0 font-medium text-sm relative hover:pl-7 hover:shadow-sm"
                                style={{ animationDelay: `${index * 30}ms` }}
                              >
                                <span className="absolute left-0 top-0 bottom-0 w-0 bg-gradient-to-r from-[#FFD700] to-transparent group-hover/subitem:w-1 transition-all duration-300"></span>
                                <span className="text-slate-700 group-hover/subitem:text-[#002866] transition-colors duration-300 font-medium">
                                  {item.label}
                                </span>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/subitem:opacity-100 text-[#FFD700] transition-all duration-300 transform translate-x-0 group-hover/subitem:translate-x-1">
                                  →
                                </span>
                              </Link>
                            ))}
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="commercial-solars"
              className="text-white hover:text-[#FFD700] transition-all duration-200 font-semibold uppercase text-[11px] xl:text-xs tracking-wide px-2 xl:px-3 py-2 rounded hover:bg-white/10 whitespace-nowrap"
            >
              Commercial
            </Link>

            <Link
              href="/blog"
              className="text-white hover:text-[#FFD700] transition-all duration-200 font-semibold uppercase text-[11px] xl:text-xs tracking-wide px-2 xl:px-3 py-2 rounded hover:bg-white/10 whitespace-nowrap"
            >
              Blog
            </Link>

            <Link
              href="/contacts"
              className="text-white hover:text-[#FFD700] transition-all duration-200 font-semibold uppercase text-[11px] xl:text-xs tracking-wide px-2 xl:px-3 py-2 rounded hover:bg-white/10 whitespace-nowrap"
            >
              Contact Us
            </Link>
          </nav>

          {/* Desktop CTA Section */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
            {/* Phone Number - Icon always visible, number shows on xl+ */}
            <a
              href="tel:1300661388"
              className="flex items-center gap-2 text-white hover:text-[#FFD700] transition-all duration-200 group"
              title="Call us: 1300 661 388"
            >
              <div className="bg-[#FFD700] rounded-full p-2 group-hover:scale-110 transition-transform duration-200 shadow-md">
                <Phone className="text-[#002866]" size={18} />
              </div>
              <span className="hidden xl:block font-bold text-base whitespace-nowrap">1300 661 388</span>
            </a>

            {/* Quote Button */}
            <Link
              href="/get-a-quote"
              className="bg-[#FFD700] text-[#002866] font-bold px-4 xl:px-5 py-2 xl:py-2.5 text-xs xl:text-sm transition-all duration-300 uppercase tracking-wide whitespace-nowrap rounded shadow-lg hover:shadow-2xl hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">Get A Free Quote</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
            </Link>
          </div>

          {/* Mobile/Tablet CTA */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            <a
              href="tel:1300661388"
              className="bg-[#FFD700] rounded-full p-2 sm:p-2.5 hover:scale-110 transition-transform duration-200"
              aria-label="Call us"
            >
              <Phone className="text-[#002866]" size={20} />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white hover:text-[#FFD700] transition-colors duration-200 p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] animate-fadeIn"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-80 max-w-[85%] bg-gradient-to-b from-[#002866] to-[#001a4d] z-[60] transform transition-transform duration-300 ease-out shadow-2xl ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col overflow-y-auto`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#002866]">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex-shrink-0">
            <div className="border-2 border-white bg-white p-1.5 shadow-lg">
              <Image
                src="/img/logo/use-logo.jpg"
                alt="Ultimate Solar Energy"
                width={180}
                height={70}
                className="w-36 h-auto object-contain"
                priority
                unoptimized
              />
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-[#FFD700] hover:text-yellow-400 transition-colors ml-3 flex-shrink-0 border-2 border-[#FFD700] p-1 hover:bg-[#FFD700] hover:text-[#002866] transition-all duration-200"
            aria-label="Close menu"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <nav className="flex-1 px-6 py-6 space-y-1">
          <Link
            href="/about-us"
            onClick={() => setMobileOpen(false)}
            className="block text-white hover:text-[#FFD700] hover:bg-white/5 font-semibold uppercase text-base py-3 px-4 rounded-lg transition-all duration-200 border-b border-white/10"
          >
            About Us
          </Link>

          <Link
            href="/review"
            onClick={() => setMobileOpen(false)}
            className="block text-white hover:text-[#FFD700] hover:bg-white/5 font-semibold uppercase text-base py-3 px-4 rounded-lg transition-all duration-200 border-b border-white/10"
          >
            Reviews
          </Link>

          {/* Mobile Products Expandable */}
          <details className="group border-b border-white/10">
            <summary className="flex items-center justify-between text-white hover:text-[#FFD700] hover:bg-white/5 font-semibold uppercase text-base py-3 px-4 rounded-lg cursor-pointer transition-all duration-200 list-none">
              Products
              <ChevronDown
                size={20}
                className="group-open:rotate-180 transition-transform duration-200"
              />
            </summary>
            <div className="ml-2 mt-2 mb-3 space-y-1">
              {productCategories.map((category) => (
                <div key={category.href}>
                  {category.submenu ? (
                    <details className="bg-white/5 rounded-lg">
                      <summary className="flex items-center justify-between text-white hover:text-[#FFD700] py-2 px-4 cursor-pointer transition-colors duration-200 text-sm font-medium list-none">
                        {category.label}
                        <ChevronDown size={16} className="group-open:rotate-180 transition-transform duration-200" />
                      </summary>
                      <div className="ml-2 mt-1 mb-2 space-y-1">
                        {category.submenu.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-gray-300 hover:text-[#FFD700] py-2 px-4 rounded transition-colors duration-200 text-xs"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={category.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-200 hover:text-[#FFD700] py-2 px-4 rounded transition-colors duration-200 text-sm bg-white/5 mb-1"
                    >
                      {category.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </details>

          <Link
            href="/commercial-solars"
            onClick={() => setMobileOpen(false)}
            className="block text-white hover:text-[#FFD700] hover:bg-white/5 font-semibold uppercase text-base py-3 px-4 rounded-lg transition-all duration-200 border-b border-white/10"
          >
            Commercial
          </Link>

          <Link
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className="block text-white hover:text-[#FFD700] hover:bg-white/5 font-semibold uppercase text-base py-3 px-4 rounded-lg transition-all duration-200 border-b border-white/10"
          >
            Blog
          </Link>

          <Link
            href="/contacts"
            onClick={() => setMobileOpen(false)}
            className="block text-white hover:text-[#FFD700] hover:bg-white/5 font-semibold uppercase text-base py-3 px-4 rounded-lg transition-all duration-200 border-b border-white/10"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Menu Footer */}
        <div className="p-6 bg-[#001433] border-t border-white/10 space-y-4">
          <Link
            href="/get-a-quote"
            onClick={() => setMobileOpen(false)}
            className="block w-full bg-[#FFD700] text-[#002866] font-bold px-6 py-4 text-center hover:bg-yellow-400 uppercase tracking-wide rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Get A Free Quote
          </Link>

          <a
            href="tel:1300661388"
            className="flex items-center justify-center gap-3 text-white font-bold text-xl hover:text-[#FFD700] transition-colors duration-200"
          >
            <div className="bg-[#FFD700] rounded-full p-3">
              <Phone className="text-[#002866]" size={20} />
          </div>
            1300 661 388
          </a>
        </div>
      </div>

      {/* Mobile Bottom Call Bar - Only visible on mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#002866] shadow-2xl border-t border-[#FFD700]/20">
        <div className="flex items-center px-6 py-4 relative">
          {/* Left: Phone Icon with Ripple Animation */}
          <a href="tel:1300661388" className="relative flex-shrink-0 phone-icon-container mr-4">
            {/* Multiple expanding ripples */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="ripple-circle ripple-1"></div>
              <div className="ripple-circle ripple-2"></div>
              <div className="ripple-circle ripple-3"></div>
            </div>
            {/* Phone Icon with vibration */}
            <div className="relative z-10 phone-icon-wrapper">
              <Phone className="text-[#FFD700] drop-shadow-2xl" size={36} strokeWidth={2.5} />
            </div>
          </a>

          {/* Vertical Divider Line */}
          <div className="h-14 w-px bg-gradient-to-b from-transparent via-[#FFD700]/50 to-transparent flex-shrink-0" style={{ marginLeft: '20px' }}></div>

          {/* Right: Text Content */}
          <a href="tel:1300661388" className="flex-1 text-center ml-4">
            <p className="text-xs uppercase font-semibold text-white tracking-wider mb-1">
              TALK TO A CONSULTANT
            </p>
            <p className="text-2xl font-bold text-[#FFD700]">
              1300 661 388
            </p>
          </a>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in;
        }

        /* Expanding ripple animation */
        @keyframes rippleExpand {
          0% {
            width: 40px;
            height: 40px;
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }

        /* Phone vibration animation */
        @keyframes phoneVibrate {
          0%, 100% {
            transform: rotate(0deg) translateX(0);
          }
          10% {
            transform: rotate(-8deg) translateX(-2px);
          }
          20% {
            transform: rotate(8deg) translateX(2px);
          }
          30% {
            transform: rotate(-8deg) translateX(-2px);
          }
          40% {
            transform: rotate(8deg) translateX(2px);
          }
          50% {
            transform: rotate(0deg) translateX(0);
          }
        }

        /* Ripple circle styles */
        .ripple-circle {
          position: absolute;
          border: 2px solid #FFD700;
          border-radius: 50%;
          animation: rippleExpand 2s ease-out infinite;
        }

        .ripple-1 {
          animation-delay: 0s;
        }

        .ripple-2 {
          animation-delay: 0.6s;
        }

        .ripple-3 {
          animation-delay: 1.2s;
        }

        /* Phone icon vibration */
        .phone-icon-wrapper {
          animation: phoneVibrate 2s ease-in-out infinite;
        }

        /* Faster animation on hover */
        .phone-icon-container:hover .phone-icon-wrapper {
          animation: phoneVibrate 0.5s ease-in-out infinite;
        }

        .phone-icon-container:hover .ripple-circle {
          animation-duration: 1s;
        }
      `}</style>
    </header>
  );
}
