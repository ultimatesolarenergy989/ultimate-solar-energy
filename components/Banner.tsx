"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/img/banner/c-banner1-36.jpg",
    title: "SAVE UP TO $10,000",
    subtitle: "ON ENERGY BILLS",
    description: "ZERO UP FRONT COST\nAVAIL SOLAR REBATES & INTEREST-FREE LOANS",
  },
  {
    id: 2,
    image: "/img/banner/c-banner2-2.jpg",
    title: "COMMERCIAL SOLAR SOLUTIONS",
    subtitle: "FOR YOUR BUSINESS",
    description: "REDUCE OPERATIONAL COSTS\nINCREASE PROFIT MARGINS",
  },
  {
    id: 3,
    image: "/img/banner/c-banner3-1-100x50.jpg",
    title: "SUSTAINABLE ENERGY",
    subtitle: "CLEAN & RELIABLE",
    description: "ECO-FRIENDLY SOLUTIONS\nFOR A BETTER TOMORROW",
  },
  {
    id: 4,
    image: "/img/banner/commercial-scaled.jpg",
    title: "QUALITY INSTALLATION",
    subtitle: "EXPERT SERVICE",
    description: "CERTIFIED PROFESSIONALS\nWARRANTY BACKED",
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const slideDuration = 8000; // 8 seconds per slide

  useEffect(() => {
    setProgress(0); // Reset progress when slide changes
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((current) => (current + 1) % slides.length);
          return 0;
        }
        return prev + (100 / (slideDuration / 50)); // Update every 50ms
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-300 z-20">
        <div
          className="h-full bg-[#FFD700] transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Get A Free Quote Button */}
      <div className="absolute bottom-32 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button className="bg-[#FFD700] text-[#002866] font-bold px-10 py-4 uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group">
            <span className="relative z-10">Get A Free Quote</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
          </button>
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={32} />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[#FFD700] w-8"
                : "bg-white/70 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}

