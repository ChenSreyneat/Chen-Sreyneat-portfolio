"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProjectsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const projects = [
    {
      title: "Computer Website Store",
      desc: "A premium e-commerce destination for high-end computer hardware, peripherals, and custom builds.",
      tags: ["React", "Node.js", "Express"],
      gradient: "from-[#0a1c4b]/40 to-[#1d70a2]/20",
      color: "text-[#a6e3f5]",
      github: "https://github.com/",
      live: "https://www.servicemeite.io/",
      image: "/image/image-service-me.png"
    },
    {
      title: "Travel With Us",
      desc: "An immersive landing page for a luxury travel agency featuring hand-picked global destinations.",
      tags: ["Next.js", "Tailwind", "Framer Motion"],
      gradient: "from-[#0f2d7a]/40 to-[#0a1c4b]/20",
      color: "text-[#8bb8d9]",
      github: "https://github.com/kheangsenghorng/TourBooking-anywhere",
      live: "https://tourbooking.servicemeite.io/",
      image: "/image/image-travel-with-us.png"
    },
    {
      title: "Tour Booking Platform Design",
      desc: "Full UI/UX design for a comprehensive tour management system, from discovery to secure booking.",
      tags: ["Figma", "UI/UX", "Prototyping"],
      gradient: "from-[#1d70a2]/40 to-[#a6e3f5]/10",
      color: "text-[#a6e3f5]",
      github: "https://github.com/kheangsenghorng/WCT-II-Service",
      live: "https://www.servicemeite.io/",
      image: "/image/image-service-me.png"
    },
    {
      title: "TikTok Viral Video Marketing",
      desc: "Professional video editing and cinematic color grading for high-engagement social media content.",
      tags: ["CapCut", "Video Editing", "Social Media"],
      gradient: "from-[#0a1c4b]/40 to-[#1d70a2]/20",
      color: "text-[#a6e3f5]",
      github: "",
      live: "https://www.tiktok.com/@code.bridge2026?_r=1&_t=ZS-96WUSyJhGxc",
      image: "/image/image-tik-tok.png"
    },
    {
      title: "Brand Identity Design",
      desc: "Crafting unique visual identities, logos, and comprehensive brand guidelines for modern startups.",
      tags: ["Figma", "Branding", "Illustrator"],
      gradient: "from-[#0f2d7a]/40 to-[#0a1c4b]/20",
      color: "text-[#8bb8d9]",
      github: "",
      live: "https://www.behance.net/chensreyneat",
      image: "/image/image-poster.png"
    },
    {
      title: "UI/UX Mobile App",
      desc: "User-centric mobile application design featuring interactive prototyping and user experience optimization.",
      tags: ["Figma", "UX Design", "Mobile"],
      gradient: "from-[#1d70a2]/40 to-[#a6e3f5]/10",
      color: "text-[#a6e3f5]",
      github: "https://github.com/",
      live: "https://google.com/",
      image: ""
    }
  ];

  const scrollToSlide = useCallback((index: number) => {
    if (sliderRef.current) {
      const cards = sliderRef.current.children;
      const targetCard = cards[index] as HTMLElement;
      if (targetCard) {
        targetCard.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    }
  }, []);

  const handleScrollButtons = useCallback(() => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);

      const cards = Array.from(sliderRef.current.children) as HTMLElement[];
      if (cards.length > 0) {
        let closestIndex = 0;
        let minDiff = Infinity;
        const containerCenter = scrollLeft + clientWidth / 2;
        cards.forEach((c, i) => {
          const cardCenter = c.offsetLeft + c.offsetWidth / 2;
          const diff = Math.abs(containerCenter - cardCenter);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = i;
          }
        });
        setActiveSlide(closestIndex);
      }
    }
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const nextIndex = direction === "left"
        ? Math.max(0, activeSlide - 1)
        : Math.min(projects.length - 1, activeSlide + 1);
      scrollToSlide(nextIndex);
    }
  };

  // Mouse drag-to-scroll support ("like touch on box")
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || !sliderRef.current) return;
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a") || target.closest("input")) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startXRef.current);
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDownRef.current && sliderRef.current) {
      isDownRef.current = false;
      const { scrollLeft, clientWidth } = sliderRef.current;
      const cards = Array.from(sliderRef.current.children) as HTMLElement[];
      if (cards.length > 0) {
        let closestIndex = 0;
        let minDiff = Infinity;
        const containerCenter = scrollLeft + clientWidth / 2;
        cards.forEach((c, i) => {
          const cardCenter = c.offsetLeft + c.offsetWidth / 2;
          const diff = Math.abs(containerCenter - cardCenter);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = i;
          }
        });
        scrollToSlide(closestIndex);
      }
    } else {
      isDownRef.current = false;
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener("scroll", handleScrollButtons);
    handleScrollButtons();
    window.addEventListener("resize", handleScrollButtons);

    return () => {
      slider.removeEventListener("scroll", handleScrollButtons);
      window.removeEventListener("resize", handleScrollButtons);
    };
  }, [handleScrollButtons]);

  return (
    <section id="projects" className="min-h-[calc(100dvh-5rem)] flex flex-col justify-center py-6 sm:py-10 md:py-16 lg:py-24 relative overflow-hidden snap-start scroll-mt-20">
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center mb-6 sm:mb-10 md:mb-14 px-4 relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-2 sm:mb-3">
          <div className="w-8 h-[1px] bg-accent-blue/50" />
          <span className="text-accent-blue font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[0.6rem] font-outfit">Portfolio Showcase</span>
          <div className="w-8 h-[1px] bg-accent-blue/50" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white max-w-2xl leading-tight mb-2 sm:mb-3 font-outfit">
          Featured <span className="text-accent-blue">Projects</span>
        </h2>
        <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-2xl font-medium font-inter">
          A selection of my recent works where design meets functionality. Each project is crafted with care and technical precision.
        </p>
      </motion.div>

      {/* Slider Container Wrapper */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="relative w-full z-10 max-w-7xl mx-auto px-0 sm:px-4 md:px-8"
      >
        
        {/* Left Circular Arrow Button */}
        <button
          onClick={() => handleScroll("left")}
          className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/90 dark:bg-white/10 backdrop-blur-md text-white rounded-full hidden lg:flex items-center justify-center z-30 transition-all duration-300 border border-white/20 hover:border-accent-blue hover:bg-slate-800 hover:scale-105 active:scale-95 cursor-pointer ${
            showLeftArrow ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none -translate-x-4"
          }`}
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Right Circular Arrow Button */}
        <button
          onClick={() => handleScroll("right")}
          className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/90 dark:bg-white/10 backdrop-blur-md text-white rounded-full hidden lg:flex items-center justify-center z-30 transition-all duration-300 border border-white/20 hover:border-accent-blue hover:bg-slate-800 hover:scale-105 active:scale-95 cursor-pointer ${
            showRightArrow ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-4"
          }`}
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Scrollable Container with native snap & touch swipe */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="flex gap-4 sm:gap-6 overflow-x-auto py-4 sm:py-6 px-4 no-scrollbar snap-x snap-mandatory scroll-smooth touch-auto cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="flex-shrink-0 w-[calc(100vw-2.5rem)] max-w-[360px] sm:w-[320px] md:w-[360px] snap-center snap-always group relative flex flex-col justify-between rounded-2xl bg-slate-950/20 border border-white/20 hover:border-accent-blue p-5 md:p-6 shadow-sm hover:shadow-xl hover:shadow-accent-blue/20 transition-all duration-300 mx-auto sm:mx-0"
            >
              <div className="flex flex-col">
                <div className={`w-full aspect-video bg-linear-to-br ${project.gradient} rounded-xl mb-4 sm:mb-5 flex items-center justify-center overflow-hidden relative shadow-inner border border-white/10`}>
                  {project.image ? (
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className={`${project.color} font-black text-2xl tracking-tighter opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500`}>
                      {project.title.split(' ')[0]}
                    </span>
                  )}

                  {/* Desktop Hover Overlay */}
                  <div className="hidden lg:flex absolute inset-0 bg-black/60 backdrop-blur-xs items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.github && (
                      <motion.a
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 hover:bg-white/25 rounded-full text-white transition-colors cursor-pointer"
                        aria-label="GitHub Repository"
                      >
                        <FaGithub size={20} />
                      </motion.a>
                    )}
                    <motion.a
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 hover:bg-white/25 rounded-full text-white transition-colors cursor-pointer"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  </div>

                  {/* Mobile Quick Action Badges (Always accessible on touch screens) */}
                  <div className="flex lg:hidden absolute bottom-2 right-2 gap-1.5 z-20">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-slate-950/80 backdrop-blur-md rounded-lg text-white border border-white/20 active:scale-95 transition-transform"
                        aria-label="GitHub Repository"
                      >
                        <FaGithub size={14} />
                      </a>
                    )}
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#4185DB] hover:bg-[#3273c5] backdrop-blur-md rounded-lg text-white border border-[#4185DB] active:scale-95 transition-transform shadow-sm"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-extrabold text-white mb-2 group-hover:text-accent-blue transition-colors font-outfit">{project.title}</h3>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 font-semibold font-inter">
                  {project.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 sm:px-2.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-[0.65rem] sm:text-xs font-bold text-white hover:border-accent-blue hover:text-cyan-300 transition-colors font-inter shadow-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Responsive Pagination Dots Indicator (< lg) */}
        <div className="flex lg:hidden justify-center items-center gap-2 mt-4 sm:mt-6">
          {projects.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === idx ? "w-6 bg-accent-blue shadow-xs shadow-accent-blue/40" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
