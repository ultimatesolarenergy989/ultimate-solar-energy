"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AcPartnersSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const logos = [
    {
      src: "/img/aircon/slider/Mitsubishi-logo.png",
      alt: "Mitsubishi",
    },
    {
      src: "/img/aircon/slider/1024px-Midea_Corporate_Logo.png",
      alt: "Midea",
    },
    {
      src: "/img/aircon/slider/Panasonic.png",
      alt: "Panasonic",
    },
    {
      src: "/img/aircon/slider/64618641bf7e8d2d417fbd41_SLA-Logo-FinalLogo-Dark-Version.png",
      alt: "Smart Lifestyle Australia",
    },
    {
        src: "/img/aircon/slider/images-1.png",
        alt: "Daikin",
      },
      {
        src: "/img/aircon/slider/Emerald-Planet-Smart-Solutions.webp",
        alt: "Emerald Planet Smart Solutions",
      },
  ];

  // Duplicate logos for infinite scroll effect
  const allLogos = [...logos, ...logos, ...logos];

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    let animationId: number;
    let scrollPosition = 0;

    const scroll = () => {
      if (!isDragging) {
        scrollPosition += 0.5;
        if (scrollPosition >= slider.scrollWidth / 3) {
          scrollPosition = 0;
        }
        slider.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-600 text-center mb-12">
          Our AC Partners
        </h2>

        {/* Slider Container */}
        <div
          ref={scrollRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex gap-8 md:gap-12 lg:gap-16 items-center">
            {allLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 md:w-48 lg:w-56"
                style={{ userSelect: "none" }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={250}
                  height={150}
                  className="w-full h-auto object-contain pointer-events-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}

