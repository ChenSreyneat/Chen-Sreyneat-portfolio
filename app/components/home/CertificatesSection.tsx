"use client";

import { useState, useEffect, useRef } from "react";
import { Award, Trophy, Star, ExternalLink, FileText, Code, ChevronLeft, ChevronRight, X, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ModalLightBackground from "../ModalLightBackground";
import InBoxLightBackground from "../InBoxLightBackground";

export default function CertificatesSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Pop-up modal state
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string>("");
  const [activeType, setActiveType] = useState<"pdf" | "image">("pdf");
  const [activeOrg, setActiveOrg] = useState<string>("");

  const certificates = [
    {
      title: "C++, C#, & OOP Programming",
      period: "2023",
      organization: "ETEC Training Center",
      description: "Certificate of Completion in C, C++, and Object-Oriented Programming (OOP) concepts and practical applications.",
      fileUrl: "/image/certificate-cpp-csharp-oop.png",
      type: "image" as const,
      icon: Code
    },
    {
      title: "RUPP Certificate of Appreciation",
      period: "2024",
      organization: "Royal University of Phnom Penh",
      description: "Certificate of Appreciation awarded for outstanding academic commitment, dedication, and valuable contributions.",
      fileUrl: "/image/certificate-RUPP.png",
      type: "image" as const,
      icon: Award
    },
    {
      title: "PED Training & Development",
      period: "2024",
      organization: "Partnership For Environment and Development",
      description: "Certificate of Participation in the Professional Education and Community Environmental Development program.",
      fileUrl: "/image/certificate-ped.jpg",
      type: "image" as const,
      icon: Star
    },
    {
      title: "Academic Certificate Record",
      period: "2022 - Present",
      organization: "Royal University of Phnom Penh",
      description: "Official record of academic courses, training history, and credits completed during the engineering program.",
      fileUrl: "/image/certificate-record.pdf",
      type: "pdf" as const,
      icon: FileText
    },
    {
      title: "General Achievements & Awards",
      period: "Various",
      organization: "Tech Communities & Workshops",
      description: "Compiled certificates and awards from tech workshops, seminars, and extra-curricular participations.",
      fileUrl: "/image/Certificate.pdf",
      type: "pdf" as const,
      icon: Trophy
    }
  ];

  // Close modal on Escape key & manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveFile(null);
      }
    };

    if (activeFile) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeFile]);

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
      const cardWidth = cardElement ? cardElement.offsetWidth : 300;
      const scrollAmount = cardWidth + 24; // Card width + gap

      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener("scroll", handleScrollButtons);
    handleScrollButtons();
    window.addEventListener("resize", handleScrollButtons);

    let intervalId: NodeJS.Timeout;

    const startAutoPlay = () => {
      intervalId = setInterval(() => {
        const { scrollLeft, scrollWidth, clientWidth } = slider;
        const maxScroll = scrollWidth - clientWidth;
        if (scrollLeft >= maxScroll - 10) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const cardElement = slider.firstElementChild as HTMLElement;
          const cardWidth = cardElement ? cardElement.offsetWidth : 300;
          const scrollAmount = cardWidth + 24; // width + gap
          slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }, 3500);
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
    <section id="certificates" className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-transparent">
      {/* Background UI Grid & Ambient Luminous Glow (Matching EducationSection) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d70a208_1px,transparent_1px),linear-gradient(to_bottom,#1d70a208_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[300px] sm:h-[400px] rounded-full opacity-35 blur-[100px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.5) 0%, rgba(37, 99, 235, 0.3) 40%, transparent 75%)"
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center mb-10 sm:mb-16 px-4 relative z-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-[1px] bg-accent-blue/50" />
          <span className="text-accent-blue font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[0.6rem] font-outfit">Achievements</span>
          <div className="w-8 h-[1px] bg-accent-blue/50" />
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 font-outfit">
          Certificates &amp; <span className="text-accent-blue">Awards</span>
        </h2>
        <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-2xl font-medium font-inter">
          Recognitions of my dedication to continuous learning and professional growth.
        </p>
      </motion.div>

      {/* Slider Container Wrapper */}
      <div className="relative w-full z-10 max-w-7xl mx-auto px-0 sm:px-4 md:px-8">
        
        {/* Left Circular Arrow Button */}
        <button
          onClick={() => handleScroll("left")}
          className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-950/60 backdrop-blur-md text-white rounded-full hidden lg:flex items-center justify-center z-30 transition-all duration-300 border border-white/20 hover:border-accent-blue hover:bg-slate-900/90 hover:scale-105 active:scale-95 cursor-pointer shadow-lg ${
            showLeftArrow ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none -translate-x-4"
          }`}
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Right Circular Arrow Button */}
        <button
          onClick={() => handleScroll("right")}
          className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-950/60 backdrop-blur-md text-white rounded-full hidden lg:flex items-center justify-center z-30 transition-all duration-300 border border-white/20 hover:border-accent-blue hover:bg-slate-900/90 hover:scale-105 active:scale-95 cursor-pointer shadow-lg ${
            showRightArrow ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-4"
          }`}
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Scrollable Container with native snap & touch swipe */}
        <div
          ref={sliderRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth py-4 sm:py-6 px-4 select-none no-scrollbar snap-x snap-mandatory touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {certificates.map((item, index) => (
            <motion.div 
              key={index} 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 w-[82vw] max-w-[320px] sm:w-[320px] md:w-[380px] snap-center group relative flex flex-col justify-between bg-slate-950/20 border border-white/20 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-accent-blue shadow-sm hover:shadow-xl hover:shadow-accent-blue/20"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center text-accent-blue shadow-inner group-hover:border-accent-blue/60 group-hover:shadow-[0_0_12px_rgba(96,165,250,0.3)] transition-all">
                    <item.icon size={20} />
                  </div>
                  <span className="text-cyan-300 font-bold text-xs bg-white/5 px-2.5 sm:px-3 py-1 rounded-md border border-accent-blue/40 font-outfit shadow-xs">
                    {item.period}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-extrabold text-white group-hover:text-accent-blue transition-colors font-outfit">
                    {item.title}
                  </h3>
                  <p className="text-accent-blue text-xs sm:text-sm font-bold font-outfit">{item.organization}</p>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-semibold font-inter mt-3 mb-6">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Button (Matching EducationSection button design) */}
              <div className="pt-4 sm:pt-6 mt-auto border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setActiveFile(item.fileUrl);
                    setActiveTitle(item.title);
                    setActiveType(item.type);
                    setActiveOrg(item.organization);
                  }}
                  className="w-full py-2.5 px-3 sm:px-4 rounded-xl flex items-center justify-center gap-2 bg-accent-blue/10 hover:bg-accent-blue border border-accent-blue/30 hover:border-accent-blue text-xs font-bold text-accent-blue hover:text-white transition-all duration-300 group/btn cursor-pointer font-outfit uppercase tracking-wider shadow-sm hover:shadow-lg hover:shadow-accent-blue/20"
                >
                  <Eye size={15} className="group-hover/btn:scale-110 transition-transform" />
                  <span>{item.type === "pdf" ? "View Certificate (PDF)" : "View Certificate"}</span>
                  <ExternalLink size={13} className="opacity-70 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pop-up Modal (Matching EducationSection modal viewer) */}
      <AnimatePresence>
        {activeFile && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 md:p-8">
            {/* Backdrop Blur with Cosmic Glass */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFile(null)}
              className="absolute inset-0 bg-[#010413]/65 backdrop-blur-md"
            />
            
            {/* Modal Light Background Animation & Glow */}
            <ModalLightBackground />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-4xl max-h-[92vh] bg-[#020617]/90 backdrop-blur-2xl border border-accent-blue/30 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(56,189,248,0.25)] flex flex-col z-10"
            >
              {/* Header */}
              <div className="p-3 sm:p-5 border-b border-white/10 bg-slate-950/70 backdrop-blur-md flex items-center justify-between gap-3 sm:gap-4">
                <div className="min-w-0 pr-2">
                  <h3 className="text-xs sm:text-base md:text-lg font-extrabold text-white font-outfit truncate">
                    {activeTitle}
                  </h3>
                  <p className="text-[0.65rem] sm:text-[0.7rem] text-accent-blue uppercase tracking-widest font-bold font-outfit truncate">
                    {activeOrg} • {activeType === "pdf" ? "Official Document (PDF)" : "Certificate"}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={activeFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold font-outfit border border-white/10 transition-colors"
                    title="Open original file in new tab"
                  >
                    <ExternalLink size={13} />
                    <span>Original</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveFile(null)}
                    className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer border border-white/10 outline-none"
                    aria-label="Close modal"
                  >
                    <X size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
              
              {/* Content Area */}
              <div className="flex-grow w-full bg-slate-950/60 relative flex items-center justify-center overflow-auto p-2 sm:p-4 md:p-6 min-h-[280px] max-h-[72vh]">
                <InBoxLightBackground />

                {activeType === "pdf" ? (
                  <iframe
                    src={`${activeFile}#toolbar=0&navpanes=0`}
                    className="w-full h-[50vh] sm:h-[60vh] md:h-[65vh] border-0 rounded-xl relative z-10"
                    title={activeTitle}
                  />
                ) : (
                  <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[65vh] flex items-center justify-center z-10">
                    <Image
                      src={activeFile}
                      alt={activeTitle}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      className="object-contain rounded-xl shadow-2xl border border-white/10"
                      priority
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
