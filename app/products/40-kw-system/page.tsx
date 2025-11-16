"use client";
import { useState } from "react";
import { Check, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CompanySlider from "@/components/CompanySlider";
import FimerInverterSection from "@/components/FimerInverterSection";
import FimerVideoSection from "@/components/FimerVideoSection";
import FimerDatasheetsSection from "@/components/FimerDatasheetsSection";

export default function TwentyKwSystemPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    postCode: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#002866] mb-4 uppercase">
            20 KW SYSTEM
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-semibold uppercase">
            SMALL BUSINESS
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Specifications */}
            <div className="lg:col-span-2 space-y-8">
              {/* Solar Panels */}
              <div className="bg-white shadow-lg border border-gray-300 overflow-hidden">
                <div className="bg-white border-b border-gray-300 px-6 py-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#002866] text-center uppercase">
                    SOLAR PANELS
                  </h2>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed">
                          <span className="font-semibold">73X 550 Watt Panels High Performing Advance Technology Half Cell Module (Tier 1)</span>
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed">Tier 1 Solar Panels</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed">Well reputed Solar brands (top-ranked globally)</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed">30 years of linear power output warranty</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed">Warranties and support in Australia locally</p>
                      </div>
                    </div>
                    <div className="flex justify-center md:justify-end">
                      <div className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center">
                        <Image
                          src="/img/product/icons/icon-solar-panel1.png"
                          alt="Solar Panel Icon"
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inverter */}
              <div className="bg-white shadow-lg border border-gray-300 overflow-hidden">
                <div className="bg-white border-b border-gray-300 px-6 py-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#002866] text-center uppercase">
                    INVERTER
                  </h2>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed">1X 30KW Sungrow / 30KW Fronius Tyro / 30KW Fimer</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed">Made in Italy</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed">High efficiency</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed">World's largest and well known brand</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed">Online monitoring</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed">Simplifies multi inverters installations</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed">IP66 Environmental protection</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed">Maximum Efficiency up to 98.90</p>
                      </div>
                    </div>
                    <div className="flex justify-center md:justify-end">
                      <div className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center">
                        <Image
                          src="/img/product/icons/icon-inverter.png"
                          alt="Inverter Icon"
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel Mounting Kit */}
              <div className="bg-white shadow-lg border border-gray-300 overflow-hidden">
                <div className="bg-white border-b border-gray-300 px-6 py-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#002866] text-center uppercase">
                    PANEL MOUNTING KIT
                  </h2>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed">Aluminium and Stainless Steel Mounting kit</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed">Approved by Clean Energy Council</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed">Flexible roof mounting solutions for different roofs</p>
                      </div>
                    </div>
                    <div className="flex justify-center md:justify-end">
                      <div className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center">
                        <Image
                          src="/img/product/icons/power-icon1.png"
                          alt="Mounting Kit Icon"
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Installation & Warranty */}
              <div className="bg-white shadow-lg border border-gray-300 overflow-hidden">
                <div className="bg-white border-b border-gray-300 px-6 py-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#002866] text-center uppercase">
                    INSTALLATION & WARRANTY
                  </h2>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed font-semibold">CEC Accredited installer</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed">Professionally trained with tons of experience</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed font-semibold">12 Years Product Warranty</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed font-semibold">30 Years Linear Power Output Warranty</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                        <p className="text-gray-800 leading-relaxed font-semibold">10 Years Inverter Warranty</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="text-gray-800 leading-relaxed mb-3">
                          We Only Use CEC Accredited Installers To Install Premium Quality Products, get obligation free customise quote for your home to know more about this package.
                        </p>
                        <p className="text-gray-800 leading-relaxed">
                          At Ultimate Solar Energy We Make Sure Our Work to Be In Accordance With Clean Energy Council's Guidelines.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center md:justify-end">
                      <div className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center">
                        <Image
                          src="/img/product/icons/power-icon2.png"
                          alt="Installation Icon"
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form (Sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-[#002866] shadow-2xl p-6">
                  <div className="text-center mb-6">
                    <Phone className="w-12 h-12 text-white mx-auto mb-3" />
                    <h3 className="text-xl md:text-2xl font-bold text-white uppercase mb-2">
                      CONTACT OUR BUSINESS SOLAR TEAM
                    </h3>
                    <p className="text-white text-sm">One of our friendly consultants will help you.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="firstName" className="block text-white font-semibold mb-2 text-sm">
                        FIRST NAME<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 focus:border-[#FFD700] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-white font-semibold mb-2 text-sm">
                        LAST NAME
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 focus:border-[#FFD700] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-white font-semibold mb-2 text-sm">
                        EMAIL<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 focus:border-[#FFD700] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-white font-semibold mb-2 text-sm">
                        PHONE NUMBER<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 focus:border-[#FFD700] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-white font-semibold mb-2 text-sm">
                        STATE
                      </label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white text-gray-500 border border-gray-300 focus:border-[#FFD700] focus:outline-none"
                      >
                        <option value="">Please Select</option>
                        <option value="NSW">NSW</option>
                        <option value="VIC">VIC</option>
                        <option value="QLD">QLD</option>
                        <option value="SA">SA</option>
                        <option value="WA">WA</option>
                        <option value="TAS">TAS</option>
                        <option value="NT">NT</option>
                        <option value="ACT">ACT</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="postCode" className="block text-white font-semibold mb-2 text-sm">
                        POSTCODE
                      </label>
                      <input
                        type="text"
                        id="postCode"
                        name="postCode"
                        value={formData.postCode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 focus:border-[#FFD700] focus:outline-none"
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-[#FFD700] text-[#002866] font-bold py-3 px-6 uppercase tracking-wide hover:bg-yellow-500 transition-colors duration-300"
                      >
                        GET IN TOUCH
                      </button>
                    </div>
                  </form>

                  <div className="mt-6 pt-6 border-t border-white/20 text-center">
                    <p className="text-white font-semibold mb-2">Or</p>
                    <p className="text-white font-semibold mb-1">Call us on</p>
                    <a href="tel:1300661388" className="text-[#FFD700] text-2xl font-bold hover:text-yellow-400 transition-colors">
                      1300 661 388
                    </a>
                    <p className="text-white text-sm mt-2">Monday to Friday</p>
                    <p className="text-white text-sm">9.00am to 6.00pm AEDT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-[#002866] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase mb-3">
              CONTACT OUR BUSINESS SOLAR TEAM
            </h2>
            <p className="text-white">One of our friendly consultants will help you.</p>
          </div>
          <div className="border-t border-white/30 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <Link
                href="/get-a-quote"
                className="bg-[#FFD700] text-[#002866] font-bold px-8 py-3 rounded uppercase tracking-wide hover:bg-yellow-500 transition-colors duration-300 text-center"
              >
                REQUEST A QUOTE
              </Link>
              <div className="text-center">
                <p className="text-white font-semibold mb-1">Call us on</p>
                <a href="tel:1300661388" className="text-[#FFD700] text-3xl font-bold hover:text-yellow-400 transition-colors">
                  1300 661 388
                </a>
                <p className="text-white text-sm mt-2">Monday to Friday</p>
                <p className="text-white text-sm">9.00am to 6.00pm AEDT</p>
              </div>
            </div>
          </div>
        </div>
        </section>
        <CompanySlider />
        <FimerInverterSection />
        <FimerVideoSection />
        <FimerDatasheetsSection />
      </div>
      
    );
  }

