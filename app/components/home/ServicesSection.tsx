"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { skillsData } from "./skillsData";

export default function SkillsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const cardElement = sliderRef.current.firstElementChild as HTMLElement;
      const cardWidth = cardElement ? cardElement.offsetWidth : 160;
      const scrollAmount = cardWidth + 24; // Card width + gap (gap-6 is 24px)
      
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener("scroll", handleScrollButtons, { passive: true });
    handleScrollButtons();
    window.addEventListener("resize", handleScrollButtons, { passive: true });

    let intervalId: NodeJS.Timeout;

    const startAutoPlay = () => {
      intervalId = setInterval(() => {
        const { scrollLeft, scrollWidth, clientWidth } = slider;
        const maxScroll = scrollWidth - clientWidth;
        if (scrollLeft >= maxScroll - 10) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const cardElement = slider.firstElementChild as HTMLElement;
          const cardWidth = cardElement ? cardElement.offsetWidth : 160;
          const scrollAmount = cardWidth + 24; // width + gap
          slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }, 3000);
    };

    startAutoPlay();

    const handleMouseEnter = () => clearInterval(intervalId);
    const handleMouseLeave = () => startAutoPlay();

    slider.addEventListener("mouseenter", handleMouseEnter);
    slider.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      slider.removeEventListener("scroll", handleScrollButtons);
      window.removeEventListener("resize", handleScrollButtons);
      clearInterval(intervalId);
      slider.removeEventListener("mouseenter", handleMouseEnter);
      slider.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background UI - Fixed & Enhanced */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d70a208_1px,transparent_1px),linear-gradient(to_bottom,#1d70a208_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-accent-blue/50" />
          <span className="text-accent-blue font-bold uppercase tracking-[0.4em] text-[0.6rem]">Skills</span>
          <div className="w-8 h-[1px] bg-accent-blue/50" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-text-primary max-w-2xl leading-tight">
          Skills <span className="text-accent-blue">I Know</span>
        </h2>
      </div>

      {/* Slider Container Wrapper */}
      <div className="relative w-full z-10 max-w-7xl mx-auto px-4 md:px-12">
          
          {/* Left Circular Arrow Button */}
          <button
            onClick={() => handleScroll("left")}
            className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/90 dark:bg-white/10 backdrop-blur-md text-white rounded-full hidden lg:flex items-center justify-center z-30 transition-all duration-300 border border-slate-800/50 dark:border-white/10 hover:bg-slate-800 dark:hover:bg-white/20 hover:scale-105 active:scale-95 cursor-pointer ${
              showLeftArrow ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none -translate-x-4"
            }`}
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Right Circular Arrow Button */}
          <button
            onClick={() => handleScroll("right")}
            className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/90 dark:bg-white/10 backdrop-blur-md text-white rounded-full hidden lg:flex items-center justify-center z-30 transition-all duration-300 border border-slate-800/50 dark:border-white/10 hover:bg-slate-800 dark:hover:bg-white/20 hover:scale-105 active:scale-95 cursor-pointer ${
              showRightArrow ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-4"
            }`}
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth py-6 px-4 select-none no-scrollbar touch-pan-x touch-pan-y overscroll-x-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {skillsData.map((skill, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-36 md:w-40 h-52 md:h-56 bg-glass-bg border border-glass-border backdrop-blur-xl rounded-[2rem] hover:border-accent-blue dark:hover:border-accent-light hover:-translate-y-1.5 transition-all duration-500 flex flex-col items-center justify-between py-8 px-4 cursor-pointer"
              >
                {/* Icon Container */}
                <div className="flex items-center justify-center w-16 h-16">
                  <skill.icon 
                    className="w-12 h-12 transition-transform duration-500 hover:scale-105" 
                    style={skill.color ? { color: skill.color } : undefined}
                  />
                </div>
                
                {/* Title & Skill Value */}
                <div className="flex flex-col items-center text-center gap-1 mt-4">
                  <span className="text-[0.65rem] md:text-[0.7rem] font-bold tracking-[0.15em] text-text-secondary uppercase font-outfit">
                    {skill.title}
                  </span>
                  <span className="text-xl md:text-2xl font-black text-text-primary font-outfit tracking-tight">
                    {skill.percentage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
