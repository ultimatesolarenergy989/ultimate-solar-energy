"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const companies = [
  { name: "Risen", logo: "/img/company/risen.jpg" },
  { name: "REC", logo: "/img/company/rec.jpg" },
  { name: "Q Cells", logo: "/img/company/qcell.jpg" },
  { name: "Longi Solar", logo: "/img/company/longi.jpg" },
  { name: "LG Solar", logo: "/img/company/lg.jpg" },
  { name: "JA Solar", logo: "/img/company/alpha.jpg" },
  { name: "Hyundai", logo: "/img/company/hyundai.jpg" },
  { name: "Seraphim", logo: "/img/company/seraphim.jpg" },
  { name: "Sunpower", logo: "/img/company/sunpower.jpg" },
  { name: "Tesla", logo: "/img/company/tesla.jpg" },
  { name: "Fronius", logo: "/img/company/fronius.jpg" },
  { name: "SMA", logo: "/img/company/sma.jpg" },
  { name: "Sungrow", logo: "/img/company/sungrow.jpg" },
  { name: "GoodWe", logo: "/img/company/goodwe.jpg" },
  { name: "Growatt", logo: "/img/company/growatt.jpg" },
  { name: "Delta", logo: "/img/company/delta.jpg" },
  { name: "Enphase", logo: "/img/company/enphase.jpg" },
  { name: "Fimer", logo: "/img/company/fimer.jpg" },
  { name: "ABB", logo: "/img/company/abb.jpg" },
  { name: "Solis", logo: "/img/company/solis.jpg" },
  { name: "Sinko", logo: "/img/company/sinko.jpg" },
];

export default function CompanySlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate companies array for seamless infinite scroll
  const duplicatedCompanies = [...companies, ...companies, ...companies];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 1; // pixels per frame
    let animationId: number;

    const scroll = () => {
      if (!isPaused && !isDragging && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        // Reset to beginning for infinite loop when we reach the end of first set
        const maxScroll = scrollContainer.scrollWidth / 3;
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed multiplier
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl lg:text-4xl font-bold text-[#002866] text-center mb-12 uppercase">
          WORLD-CLASS TECHNOLOGY PARTNERS
        </h2>

        {/* Logo Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            handleMouseLeave();
          }}
        >
          <div
            ref={scrollRef}
            className="flex gap-12 overflow-x-hidden cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {duplicatedCompanies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex items-center justify-center min-w-[200px] h-40 transition-all duration-300 hover:scale-110 flex-shrink-0"
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={250}
                  height={200}
                  className="max-w-full max-h-full object-contain pointer-events-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>

       
      </div>
    </section>
  );
}

