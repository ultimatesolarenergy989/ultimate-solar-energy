"use client";
import { useState } from "react";
import Link from "next/link";

export default function HowWeDoIt() {
  const [activeTab, setActiveTab] = useState<"how" | "what">("how");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const howWeDoSections = [
    {
      id: "consultation",
      title: "FREE CONSULTATION",
      content: "Send your request for a quote and our specialized engineers certified by the Clean Energy Council will assist you right away to figure out all your needs.",
    },
    {
      id: "inspection",
      title: "SITE INSPECTION",
      content: "We schedule an appointment for your quote and go to your business to make an overall site inspection taking a look at the places where energy storage could be placed and at the condition of your roof. We have a nice conversation with you about the details of the project and take copy of your Energy Bill to analyze it.",
    },
    {
      id: "study",
      title: "FEASIBILITY STUDY AND PROPOSAL",
      content: "We deliver a feasibility study that contains: - 3D building modelling in Sketch-Up - An energy production analysis - Shadings simulation - Cash flow analysis - Government rebates tax credits that you can access to",
    },
    {
      id: "contract",
      title: "CONTRACT",
      content: "We help you to achieve the fastest ROI from solar while at the same time reducing the operating costs and start saving money from day one! Sign in a contract with us when you feel satisfied with the proposal and start generating solar energy.",
    },
  ];

  return (
    <section className="py-8 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <button
            onClick={() => setActiveTab("how")}
            className={`py-4 px-8 text-2xl font-bold transition-all duration-300 ${
              activeTab === "how"
                ? "bg-[#FFD700] text-[#002866]"
                : "bg-gray-300 text-[#002866]"
            }`}
          >
            HOW DO WE DO THAT?
          </button>
          <button
            onClick={() => setActiveTab("what")}
            className={`py-4 px-8 text-2xl font-bold transition-all duration-300 ${
              activeTab === "what"
                ? "bg-[#FFD700] text-[#002866]"
                : "bg-gray-300 text-[#002866]"
            }`}
          >
            WHAT YOU CAN DO
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-gray-100">
          {activeTab === "how" ? (
            // HOW DO WE DO THAT Content
            <div>
              {howWeDoSections.map((section, index) => (
                <div key={section.id} className={index > 0 ? "mt-1" : ""}>
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(section.id)}
                    className="w-full bg-[#002866] text-[#FFD700] py-6 px-8 flex items-center justify-between hover:bg-[#003d99] transition-all duration-300 relative"
                  >
                    <h3 className="text-xl md:text-2xl text-left pr-4">
                      {section.title}
                    </h3>
                    <div className="absolute right-0 top-0 bottom-0 bg-[#FFD700] w-20 flex items-center justify-center">
                      <svg
                        className={`w-6 h-6 text-[#002866] transition-transform duration-700 ease-in-out ${
                          openAccordion === section.id ? "rotate-180" : ""
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <div
                    className={`overflow-hidden transition-all duration-700 ease-in-out ${
                      openAccordion === section.id && section.content
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {section.content && (
                      <div className="bg-gray-200 py-6 px-8">
                        <p className="text-gray-800 text-base leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // WHAT YOU CAN DO Content
            <div className="bg-gray-200 py-6 px-8">
              {/* Top Description */}
              <div className="text-center mb-6">
                <p className="text-[#002866] text-lg leading-relaxed">
                  There are a number of easy and effective steps you can take to get your Solar installation ready at your home or Business.
                </p>
              </div>

              {/* Navy Blue Box with Bullet Points */}
              <div className="bg-[#002866] py-6 px-10 md:px-16 mb-6">
                <div className="space-y-2">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full border-2 border-[#FFD700] bg-transparent mt-1.5"></div>
                    <p className="text-white text-lg leading-snug">
                      Try to decide between a grid tied system and a solar plus energy storage system
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full border-2 border-[#FFD700] bg-transparent mt-1.5"></div>
                    <p className="text-white text-lg leading-snug">
                      Think about the estimated time that you wish to back up your loads if you opt for an energy storage system
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full border-2 border-[#FFD700] bg-transparent mt-1.5"></div>
                    <p className="text-white text-lg leading-snug">
                      Try to figure out the initial capital investment that you could use to make the installation faster
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Text */}
              <div className="text-center mb-6">
                <p className="text-[#8B4513] text-lg leading-relaxed">
                  If you have a hard time figuring this out, don't worry! We will guide you through.
                </p>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <Link
                  href="/quote"
                  className="inline-block bg-[#FFD700] text-[#002866] font-bold px-12 py-4 transition-all duration-300 text-base shadow-lg hover:shadow-xl relative overflow-hidden group"
                >
                  <span className="relative z-10">Get your free quote here</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

