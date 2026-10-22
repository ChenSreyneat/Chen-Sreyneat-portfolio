"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GraduationCap, BookOpen, School, Eye, ExternalLink, X, LucideIcon, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ModalLightBackground from "../ModalLightBackground";
import InBoxLightBackground from "../InBoxLightBackground";

interface CertificateOption {
  label: string;
  url: string;
  description?: string;
}

interface EducationItem {
  school: string;
  period: string;
  major: string;
  description: string;
  icon: LucideIcon;
  certificateLabel: string;
  certificateTitle: string;
  primaryImage: string;
  certificates: CertificateOption[];
}

export default function EducationSection() {
  const [selectedItem, setSelectedItem] = useState<EducationItem | null>(null);
  const [activeCertIndex, setActiveCertIndex] = useState<number>(0);

  const education: EducationItem[] = [
    {
      school: "Royal University of Phnom Penh",
      period: "2022 - 2026",
      major: "Information Technology Engineering",
      description: "Bachelor's Degree in Information Technology Engineering, Royal University of Phnom Penh. Awarded a full 4-year scholarship based on outstanding academic performance.",
      icon: BookOpen,
      certificateLabel: "View Graduation & Academic Documents",
      certificateTitle: "Graduation Certificate & Academic Documents",
      primaryImage: "/image/graduation K.JPG",
      certificates: [
        {
          label: "Graduation (Khmer)",
          url: "/image/graduation K.JPG",
          description: "Royal University of Phnom Penh - Certificate of Graduation (Khmer)"
        },
        {
          label: "Graduation (English)",
          url: "/image/graduation E.JPG",
          description: "Royal University of Phnom Penh - Certificate of Graduation (English)"
        },
        {
          label: "Admissions & Records",
          url: "/image/admissions and records.JPG",
          description: "Royal University of Phnom Penh - Admissions & Records Certification"
        },
        {
          label: "Academic Record",
          url: "/image/admissions and records 1.JPG",
          description: "Royal University of Phnom Penh - Academic Transcript & Student Record"
        }
      ]
    },
    {
      school: "High School National Exam (BacII)",
      period: "2022",
      major: "Science Track",
      description: "Graduated with Grade B in the National Exam, demonstrating strong academic foundations in mathematics and science.",
      icon: GraduationCap,
      certificateLabel: "View 12 Years Certificate (BacII)",
      certificateTitle: "Grade 12 National Exam Certificate (BacII)",
      primaryImage: "/image/bacll.JPG",
      certificates: [
        {
          label: "Grade 12 BacII Certificate",
          url: "/image/bacll.JPG",
          description: "Ministry of Education, Youth and Sport - Upper Secondary Education Diploma (Grade B)"
        }
      ]
    },
    {
      school: "Soramrit High School",
      period: "2019",
      major: "High School Diploma",
      description: "Completed 9 years of basic general education (1 Year - 9 Years Study) at Soramrit High School, successfully obtaining the High School Diploma in 2019.",
      icon: School,
      certificateLabel: "View 9 Years Diploma (2019)",
      certificateTitle: "Soramrit High School Diploma (1 Year - 9 Years)",
      primaryImage: "/image/9 years.JPG",
      certificates: [
        {
          label: "High School Diploma (2019)",
          url: "/image/9 years.JPG",
          description: "Soramrit High School - 9 Years Basic Education Completion Diploma (2019)"
        }
      ]
    }
  ];

  // Close modal on Escape key & lock background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };

    if (selectedItem) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScrollButtons = useCallback(() => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 15);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 15);

      const card = sliderRef.current.firstElementChild as HTMLElement;
      if (card) {
        const cardWidth = card.offsetWidth + 24;
        const current = Math.min(
          education.length - 1,
          Math.max(0, Math.round(scrollLeft / cardWidth))
        );
        setActiveSlide(current);
      }
    }
  }, [education.length]);

  const handleScroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const card = sliderRef.current.firstElementChild as HTMLElement;
      const cardWidth = card ? card.offsetWidth : 300;
      const scrollAmount = cardWidth + 24;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const scrollToSlide = (index: number) => {
    if (sliderRef.current) {
      const card = sliderRef.current.firstElementChild as HTMLElement;
      const cardWidth = card ? card.offsetWidth + 24 : 320;
      sliderRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth"
      });
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
    isDownRef.current = false;
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

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const openModal = (item: EducationItem) => {
    setSelectedItem(item);
    setActiveCertIndex(0);
    setZoomLevel(1);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setZoomLevel(1);
  };

  const handleNextCert = () => {
    if (!selectedItem) return;
    setZoomLevel(1);
    if (selectedItem.certificates.length > 1) {
      setActiveCertIndex((prev) => (prev + 1) % selectedItem.certificates.length);
    } else {
      const currentIdx = education.findIndex((e) => e.school === selectedItem.school);
      const nextIdx = (currentIdx + 1) % education.length;
      setSelectedItem(education[nextIdx]);
      setActiveCertIndex(0);
    }
  };

  const handlePrevCert = () => {
    if (!selectedItem) return;
    setZoomLevel(1);
    if (selectedItem.certificates.length > 1) {
      setActiveCertIndex((prev) => (prev - 1 + selectedItem.certificates.length) % selectedItem.certificates.length);
    } else {
      const currentIdx = education.findIndex((e) => e.school === selectedItem.school);
      const prevIdx = (currentIdx - 1 + education.length) % education.length;
      setSelectedItem(education[prevIdx]);
      setActiveCertIndex(0);
    }
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(2.5, +(prev + 0.5).toFixed(1)));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(1, +(prev - 0.5).toFixed(1)));
  const handleResetZoom = () => setZoomLevel(1);
  const toggleZoom = () => setZoomLevel((prev) => (prev > 1 ? 1 : 2));

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomLevel > 1) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (zoomLevel > 1 || touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNextCert();
      } else {
        handlePrevCert();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1] as const
      }
    })
  };

  const activeCert = selectedItem?.certificates[activeCertIndex] || (selectedItem ? {
    label: selectedItem.certificateTitle,
    url: selectedItem.primaryImage,
    description: selectedItem.description
  } : null);

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background UI Grid & Ambient Luminous Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d70a208_1px,transparent_1px),linear-gradient(to_bottom,#1d70a208_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-35 blur-[100px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.5) 0%, rgba(37, 99, 235, 0.3) 40%, transparent 75%)"
        }}
      />

      <motion.div 
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center text-center mb-16 px-4 relative z-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-[1px] bg-accent-blue/50" />
          <span className="text-accent-blue font-bold uppercase tracking-[0.4em] text-[0.6rem] font-outfit">Education</span>
          <div className="w-8 h-[1px] bg-accent-blue/50" />
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3 font-outfit">Educational <span className="text-accent-blue">Journey</span></h2>
        <p className="text-slate-200 text-sm md:text-base max-w-2xl font-medium font-inter">My academic background and continuous learning path in technology.</p>
      </motion.div>

      {/* Responsive Slider / Desktop Grid Container */}
      <div className="relative w-full z-10 max-w-6xl mx-auto px-0 sm:px-4">
        {/* Left Circular Arrow Button (hidden on mobile, visible on desktop like Portfolio Showcase) */}
        <button
          type="button"
          onClick={() => handleScroll("left")}
          className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/90 backdrop-blur-md text-white rounded-full hidden lg:flex items-center justify-center z-30 transition-all duration-300 border border-white/20 hover:border-accent-blue hover:bg-slate-800 hover:scale-105 active:scale-95 cursor-pointer shadow-lg ${
            showLeftArrow ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none -translate-x-4"
          }`}
          aria-label="Previous Education"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Right Circular Arrow Button (hidden on mobile, visible on desktop like Portfolio Showcase) */}
        <button
          type="button"
          onClick={() => handleScroll("right")}
          className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/90 backdrop-blur-md text-white rounded-full hidden lg:flex items-center justify-center z-30 transition-all duration-300 border border-white/20 hover:border-accent-blue hover:bg-slate-800 hover:scale-105 active:scale-95 cursor-pointer shadow-lg ${
            showRightArrow ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-4"
          }`}
          aria-label="Next Education"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Scrollable Container with native snap & touch swipe on mobile, 3-col grid on desktop */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="flex lg:grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible py-4 lg:py-0 px-4 lg:px-0 no-scrollbar snap-x snap-proximity lg:snap-none touch-auto cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-stretch"
        >
          {education.map((item, index) => (
            <motion.div 
              key={index} 
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -4 }}
              className="w-[82vw] max-w-[340px] sm:w-[360px] lg:w-full shrink-0 lg:shrink snap-center lg:snap-align-none group relative flex h-full"
            >
              <div className="relative h-full w-full flex flex-col justify-between bg-slate-950/20 border border-white/20 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-accent-blue shadow-sm hover:shadow-xl hover:shadow-accent-blue/20 min-h-[340px] sm:min-h-[320px] lg:min-h-0">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center text-accent-blue shadow-inner group-hover:border-accent-blue/60 group-hover:shadow-[0_0_12px_rgba(96,165,250,0.3)] transition-all">
                      <item.icon size={20} />
                    </div>
                    <span className="text-cyan-300 font-bold text-xs bg-white/5 px-3 py-1 rounded-md border border-accent-blue/40 font-outfit shadow-xs">
                      {item.period}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg md:text-xl font-extrabold text-white group-hover:text-accent-blue transition-colors font-outfit">
                      {item.school}
                    </h3>
                    <p className="text-accent-blue text-sm font-bold font-outfit">{item.major}</p>
                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-semibold font-inter">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Action Button: Opens Certificate Pop-up */}
                <div className="pt-5 mt-5 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => openModal(item)}
                    className="w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 bg-accent-blue/10 hover:bg-accent-blue border border-accent-blue/30 hover:border-accent-blue text-xs font-bold text-accent-blue hover:text-white transition-all duration-300 group/btn cursor-pointer font-outfit uppercase tracking-wider shadow-sm hover:shadow-lg hover:shadow-accent-blue/20"
                  >
                    <Eye size={15} className="group-hover/btn:scale-110 transition-transform" />
                    <span>{item.certificateLabel}</span>
                    <ExternalLink size={13} className="opacity-70 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Responsive Pagination Dots Indicator (< lg) */}
        <div className="flex lg:hidden justify-center items-center gap-2 mt-4">
          {education.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === idx ? "w-6 bg-accent-blue shadow-xs shadow-accent-blue/40" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Pop-up Modal (Certificate Viewer) */}
      <AnimatePresence>
        {selectedItem && activeCert && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-2 sm:p-4 md:p-8 overscroll-contain touch-none">
            {/* Backdrop Blur with Cosmic Glass */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-[#010413]/75 backdrop-blur-md touch-none"
            />
            
            {/* Modal Light Background Animation & Glow */}
            <ModalLightBackground />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[90vh] bg-[#020617]/95 backdrop-blur-2xl border border-accent-blue/30 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(56,189,248,0.25)] flex flex-col z-10 overscroll-contain touch-auto"
            >
              {/* Header */}
              <div className="p-3.5 sm:p-5 border-b border-white/10 bg-slate-950/80 backdrop-blur-md flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 pr-2">
                    <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-white font-outfit truncate">
                      {selectedItem.certificateTitle}
                    </h3>
                    <p className="text-[0.68rem] sm:text-xs text-accent-blue uppercase tracking-widest font-bold font-outfit truncate">
                      {selectedItem.school} • {selectedItem.period}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={activeCert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold font-outfit border border-white/10 transition-colors"
                      title="Open full image in new tab"
                    >
                      <ExternalLink size={13} />
                      <span className="hidden sm:inline">Original</span>
                    </a>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer border border-white/10 outline-none w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center"
                      aria-label="Close modal"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Variant Tabs if there are multiple certificates */}
                {selectedItem.certificates.length > 1 && (
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5 overflow-x-auto no-scrollbar">
                    {selectedItem.certificates.map((cert, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setActiveCertIndex(idx);
                          setZoomLevel(1);
                        }}
                        className={`text-xs px-3 py-1.5 rounded-lg font-semibold font-outfit transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                          activeCertIndex === idx
                            ? "bg-accent-blue text-white shadow-sm shadow-accent-blue/30 scale-102"
                            : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
                        }`}
                      >
                        {cert.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Content Area with Zoom, Pan, Swipe & Floating Arrows */}
              <div 
                className="flex-grow w-full bg-slate-950/70 relative flex items-center justify-center overflow-hidden p-2 sm:p-4 md:p-6"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Inside Box Animated Cosmic Light Background */}
                <InBoxLightBackground />

                {/* Floating Left Navigation Arrow */}
                <button
                  type="button"
                  onClick={handlePrevCert}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/20 hover:border-accent-blue text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Floating Right Navigation Arrow */}
                <button
                  type="button"
                  onClick={handleNextCert}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/20 hover:border-accent-blue text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                  aria-label="Next certificate"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Main Image Frame (Pannable when zoomed) */}
                <div 
                  className={`relative w-full h-[52vh] sm:h-[60vh] md:h-[66vh] rounded-xl overflow-auto select-none no-scrollbar flex items-center justify-center ${
                    zoomLevel > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                  }`}
                  onDoubleClick={toggleZoom}
                >
                  <div 
                    className="relative flex items-center justify-center transition-transform duration-200 origin-center"
                    style={{
                      transform: `scale(${zoomLevel})`,
                      width: zoomLevel > 1 ? `${zoomLevel * 100}%` : "100%",
                      height: zoomLevel > 1 ? `${zoomLevel * 100}%` : "100%",
                      minWidth: "100%",
                      minHeight: "100%",
                    }}
                  >
                    <Image
                      src={activeCert.url}
                      alt={activeCert.label || selectedItem.certificateTitle}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      className="object-contain rounded-xl drop-shadow-2xl"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Responsive Control Bar: Zoom controls, document indicator, and double-tap tip */}
              <div className="p-2.5 sm:p-3.5 border-t border-white/10 bg-slate-950/85 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 z-20">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold font-outfit text-white truncate max-w-[200px] sm:max-w-none">
                    {activeCert.label || selectedItem.certificateTitle}
                  </span>
                  {selectedItem.certificates.length > 1 && (
                    <span className="text-[11px] font-semibold text-accent-blue bg-accent-blue/10 border border-accent-blue/30 px-2 py-0.5 rounded-md font-outfit">
                      {activeCertIndex + 1} of {selectedItem.certificates.length}
                    </span>
                  )}
                </div>

                {/* Zoom & Navigation Controls */}
                <div className="flex items-center gap-1.5 ml-auto">
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 shadow-xs">
                    <button
                      type="button"
                      onClick={handleZoomOut}
                      disabled={zoomLevel <= 1}
                      className="p-1 sm:p-1.5 rounded-md text-white/70 hover:text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-white/10 transition-colors cursor-pointer"
                      title="Zoom Out"
                      aria-label="Zoom Out"
                    >
                      <ZoomOut size={14} />
                    </button>
                    <span className="text-[11px] font-bold font-outfit text-accent-blue px-2 min-w-[42px] text-center select-none">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={handleZoomIn}
                      disabled={zoomLevel >= 2.5}
                      className="p-1 sm:p-1.5 rounded-md text-white/70 hover:text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-white/10 transition-colors cursor-pointer"
                      title="Zoom In"
                      aria-label="Zoom In"
                    >
                      <ZoomIn size={14} />
                    </button>
                    {zoomLevel > 1 && (
                      <button
                        type="button"
                        onClick={handleResetZoom}
                        className="p-1 sm:p-1.5 rounded-md text-cyan-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-1"
                        title="Reset Zoom"
                        aria-label="Reset Zoom"
                      >
                        <RotateCcw size={12} />
                      </button>
                    )}
                  </div>
                  <span className="hidden md:inline-block text-[11px] text-slate-400 font-inter italic ml-2">
                    Double-click to zoom
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
