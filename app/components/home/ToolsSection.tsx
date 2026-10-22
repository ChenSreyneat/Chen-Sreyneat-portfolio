"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaNodeJs, FaGithub, FaReact } from "react-icons/fa";
import { 
  SiCanva, 
  SiTailwindcss, 
  SiNextdotjs, 
  SiFigma,
  SiSketch
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";

interface AdobeIconProps {
  bg: string;
  color: string;
  text: string;
  isItalic?: boolean;
}

const AdobeIcon = ({ bg, color, text, isItalic = false }: AdobeIconProps) => (
  <div 
    className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg select-none border"
    style={{ 
      backgroundColor: bg, 
      color: color, 
      borderColor: `${color}15`
    }}
  >
    <span className={`${isItalic ? 'font-serif italic lowercase text-xl' : 'font-outfit tracking-tight'}`}>
      {text}
    </span>
  </div>
);

export default function ToolsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScrollButtons, { passive: true });
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons, { passive: true });

    let intervalId: NodeJS.Timeout;

    const startAutoPlay = () => {
      intervalId = setInterval(() => {
        const { scrollLeft, scrollWidth, clientWidth } = el;
        const maxScroll = scrollWidth - clientWidth;
        if (scrollLeft >= maxScroll - 5) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const cardElement = el.firstElementChild as HTMLElement;
          const cardWidth = cardElement ? cardElement.offsetWidth : 160;
          const scrollAmount = cardWidth + 24; // width + gap
          el.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }, 3000);
    };

    startAutoPlay();

    const handleMouseEnter = () => clearInterval(intervalId);
    const handleMouseLeave = () => startAutoPlay();

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("scroll", checkScrollButtons);
      window.removeEventListener("resize", checkScrollButtons);
      clearInterval(intervalId);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const tools = [
    {
      title: "XD",
      percentage: "99%",
      iconType: "custom",
      renderIcon: () => <AdobeIcon bg="#2E001F" color="#FF61F6" text="Xd" />
    },
    {
      title: "Illustrator",
      percentage: "95%",
      iconType: "custom",
      renderIcon: () => <AdobeIcon bg="#261300" color="#FF9A00" text="Ai" />
    },
    {
      title: "Photoshop",
      percentage: "97%",
      iconType: "custom",
      renderIcon: () => <AdobeIcon bg="#001E36" color="#31A8FF" text="Ps" />
    },
    {
      title: "Invision",
      percentage: "85%",
      iconType: "custom",
      renderIcon: () => <AdobeIcon bg="#FF3366" color="#FFFFFF" text="in" isItalic />
    },
    {
      title: "Sketch",
      percentage: "95%",
      iconType: "react-icon",
      icon: SiSketch,
      color: "#FDB300"
    },
    {
      title: "Figma",
      percentage: "98%",
      iconType: "react-icon",
      icon: SiFigma,
      color: "#F24E1E"
    },
    {
      title: "Canva",
      percentage: "90%",
      iconType: "react-icon",
      icon: SiCanva,
      color: "#00C4CC"
    },
    {
      title: "Tailwind CSS",
      percentage: "95%",
      iconType: "react-icon",
      icon: SiTailwindcss,
      color: "#38BDF8"
    },
    {
      title: "Next.js",
      percentage: "92%",
      iconType: "react-icon",
      icon: SiNextdotjs,
      isThemeAware: true
    },
    {
      title: "React",
      percentage: "93%",
      iconType: "react-icon",
      icon: FaReact,
      color: "#61DAFB"
    },
    {
      title: "Node.js",
      percentage: "88%",
      iconType: "react-icon",
      icon: FaNodeJs,
      color: "#339933"
    },
    {
      title: "VS Code",
      percentage: "96%",
      iconType: "react-icon",
      icon: TbBrandVscode,
      color: "#007ACC"
    },
    {
      title: "GitHub",
      percentage: "94%",
      iconType: "react-icon",
      icon: FaGithub,
      isThemeAware: true
    }
  ];

  return (
    <section id="tools" className="py-24 relative overflow-hidden">
      {/* Background UI - Fixed & Enhanced */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d70a208_1px,transparent_1px),linear-gradient(to_bottom,#1d70a208_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Decorative Spotlights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] -z-10" />

      {/* Static Headers */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-accent-blue/50" />
          <span className="text-accent-blue font-bold uppercase tracking-[0.4em] text-[0.6rem]">Professional Toolkit</span>
          <div className="w-8 h-[1px] bg-accent-blue/50" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-text-primary max-w-2xl leading-tight">
          Exploring the Tools <br />
          <span className="text-accent-blue">Behind My Designs</span>
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
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth py-6 px-4 select-none no-scrollbar touch-pan-x touch-pan-y overscroll-x-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {tools.map((tool, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-36 md:w-40 h-52 md:h-56 bg-glass-bg border border-glass-border backdrop-blur-xl rounded-[2rem] hover:border-accent-blue dark:hover:border-accent-light hover:-translate-y-1.5 transition-all duration-500 flex flex-col items-center justify-between py-8 px-4 cursor-pointer"
            >
              {/* Icon Container */}
              <div className="flex items-center justify-center w-16 h-16">
                {tool.iconType === "custom" && tool.renderIcon ? (
                  tool.renderIcon()
                ) : (
                  tool.icon && (
                    <tool.icon 
                      className={`w-12 h-12 transition-transform duration-500 hover:scale-105 ${
                        tool.isThemeAware ? "text-text-primary" : ""
                      }`}
                      style={!tool.isThemeAware ? { color: tool.color } : undefined} 
                    />
                  )
                )}
              </div>

              {/* Title & Skill Value */}
              <div className="flex flex-col items-center text-center gap-1 mt-4">
                <span className="text-[0.65rem] md:text-[0.7rem] font-bold tracking-[0.15em] text-text-secondary uppercase font-outfit">
                  {tool.title}
                </span>
                <span className="text-xl md:text-2xl font-black text-text-primary font-outfit tracking-tight">
                  {tool.percentage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
