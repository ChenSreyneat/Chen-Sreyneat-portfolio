"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Award,
  Trophy,
  Star,
  ExternalLink,
  FileText,
  Code,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  LucideIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CertificateItem {
  title: string;
  period: string;
  organization: string;
  description: string;
  fileUrl: string;
  pdfUrl?: string;
  pages?: string[];
  type: "image";
  icon: LucideIcon;
}

export default function CertificatesSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  // Pop-up modal state
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const certificates: CertificateItem[] = [
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
      fileUrl: "/image/certificate record.png",
      pdfUrl: "/image/certificate record.pdf",
      type: "image" as const,
      icon: FileText
    },
    {
      title: "General Achievements & Awards",
      period: "Various",
      organization: "Tech Communities & Workshops",
      description: "Compiled certificates and awards from tech workshops, seminars, and extra-curricular participations.",
      fileUrl: "/image/Certificate.png",
      pdfUrl: "/image/Certificate.pdf",
      type: "image" as const,
      icon: Trophy
    }
  ];

  const activeCert = selectedCertIndex !== null ? certificates[selectedCertIndex] : null;

  // Close modal on Escape key & manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCertIndex(null);
      }
    };

    if (selectedCertIndex !== null) {
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
  }, [selectedCertIndex]);

  const openCertModal = (index: number) => {
    setSelectedCertIndex(index);
    setActivePageIndex(0);
    setZoomLevel(1);
  };

  const closeCertModal = () => {
    setSelectedCertIndex(null);
    setActivePageIndex(0);
    setZoomLevel(1);
  };

  const handleNextCert = () => {
    if (selectedCertIndex === null) return;
    setZoomLevel(1);
    setActivePageIndex(0);
    setSelectedCertIndex((prev) => (prev! + 1) % certificates.length);
  };

  const handlePrevCert = () => {
    if (selectedCertIndex === null) return;
    setZoomLevel(1);
    setActivePageIndex(0);
    setSelectedCertIndex((prev) => (prev! - 1 + certificates.length) % certificates.length);
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

  const handleScroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const nextIndex = direction === "left"
        ? Math.max(0, activeSlide - 1)
        : Math.min(certificates.length - 1, activeSlide + 1);
      scrollToSlide(nextIndex);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener("scroll", handleScrollButtons, { passive: true });
    handleScrollButtons();
    window.addEventListener("resize", handleScrollButtons, { passive: true });

    return () => {
      slider.removeEventListener("scroll", handleScrollButtons);
      window.removeEventListener("resize", handleScrollButtons);
    };
  }, [handleScrollButtons]);

  return (
    <section id="certificates" className="py-12 sm:py-16 md:py-24 relative overflow-hidden bg-transparent scroll-mt-20">
      {/* Background UI Grid & Ambient Luminous Glow (Matching EducationSection) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d70a208_1px,transparent_1px),linear-gradient(to_bottom,#1d70a208_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[300px] sm:h-[400px] rounded-full opacity-25 blur-[100px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(30, 58, 138, 0.3) 0%, rgba(15, 23, 42, 0.2) 50%, transparent 75%)"
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center mb-6 sm:mb-10 md:mb-14 px-4 relative z-10"
      >
        <div className="flex items-center gap-3 mb-2 sm:mb-3">
          <div className="w-8 h-[1px] bg-accent-blue/50" />
          <span className="text-accent-blue font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[0.6rem] font-outfit">Achievements</span>
          <div className="w-8 h-[1px] bg-accent-blue/50" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-2 sm:mb-3 font-outfit">
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
          type="button"
          onClick={() => handleScroll("left")}
          className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/90 dark:bg-white/10 backdrop-blur-md text-white rounded-full hidden lg:flex items-center justify-center z-30 transition-all duration-300 border border-white/20 hover:border-accent-blue hover:bg-slate-800 hover:scale-105 active:scale-95 cursor-pointer shadow-lg ${showLeftArrow ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none -translate-x-4"
            }`}
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Right Circular Arrow Button */}
        <button
          type="button"
          onClick={() => handleScroll("right")}
          className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/90 dark:bg-white/10 backdrop-blur-md text-white rounded-full hidden lg:flex items-center justify-center z-30 transition-all duration-300 border border-white/20 hover:border-accent-blue hover:bg-slate-800 hover:scale-105 active:scale-95 cursor-pointer shadow-lg ${showRightArrow ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-4"
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
          className="flex gap-4 sm:gap-6 overflow-x-auto py-4 sm:py-6 px-4 no-scrollbar snap-x snap-proximity scroll-smooth touch-pan-x touch-pan-y overscroll-x-contain cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {certificates.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="flex-shrink-0 w-[calc(100vw-2.5rem)] max-w-[360px] sm:w-[320px] md:w-[360px] snap-start group relative flex flex-col justify-between rounded-2xl bg-slate-950/20 border border-white/20 hover:border-accent-blue p-5 md:p-6 shadow-sm hover:shadow-xl hover:shadow-accent-blue/20 transition-all duration-300 mx-auto sm:mx-0 min-h-[340px]"
            >
              <div className="flex flex-col h-full justify-between">
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
                    onClick={() => openCertModal(index)}
                    className="w-full py-2.5 px-3 sm:px-4 rounded-xl flex items-center justify-center gap-2 bg-[#4185DB] hover:bg-[#3273c5] border border-[#4185DB] text-xs font-bold text-white transition-all duration-300 group/btn cursor-pointer font-outfit uppercase tracking-wider shadow-md shadow-[#4185DB]/25 hover:shadow-lg hover:shadow-[#4185DB]/40 active:scale-[0.98]"
                  >
                    <Eye size={15} className="group-hover/btn:scale-110 transition-transform" />
                    <span>View Certificate</span>
                    <ExternalLink size={13} className="opacity-80 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Responsive Pagination Dots Indicator (< lg) */}
        <div className="flex lg:hidden justify-center items-center gap-2 mt-4 sm:mt-6">
          {certificates.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeSlide === idx ? "w-6 bg-accent-blue shadow-xs shadow-accent-blue/40" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              aria-label={`Go to certificate ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Pop-up Modal (Matching EducationSection modal viewer) */}
      <AnimatePresence>
        {selectedCertIndex !== null && activeCert && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-2 sm:p-4 md:p-8 overscroll-contain touch-none">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={closeCertModal}
              className="absolute inset-0 bg-[#010413]/80 backdrop-blur-md touch-none"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 14 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl max-h-[92dvh] sm:max-h-[90vh] bg-[#020617]/95 backdrop-blur-2xl border border-accent-blue/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col z-10 overscroll-contain touch-auto"
            >
              {/* Header */}
              <div className="p-3.5 sm:p-5 border-b border-white/10 bg-slate-950/80 backdrop-blur-md flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 pr-2">
                    <h3 className="text-xs sm:text-base md:text-lg font-extrabold text-white font-outfit truncate">
                      {activeCert.title}
                    </h3>
                    <p className="text-[0.65rem] sm:text-xs text-accent-blue uppercase tracking-widest font-bold font-outfit truncate">
                      {activeCert.organization} • {activeCert.period} • Certificate
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={activeCert.pdfUrl || activeCert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold font-outfit border border-white/10 transition-colors"
                      title="Open original file in new tab"
                    >
                      <ExternalLink size={13} />
                      <span className="hidden sm:inline">{activeCert.pdfUrl ? "Original PDF" : "Original"}</span>
                    </a>
                    <button
                      type="button"
                      onClick={closeCertModal}
                      className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer border border-white/10 outline-none w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center"
                      aria-label="Close modal"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Quick Certificate Switcher Pills */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-white/5 overflow-x-auto no-scrollbar">
                  {certificates.map((cert, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => openCertModal(idx)}
                      className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-lg font-semibold font-outfit transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${selectedCertIndex === idx
                        ? "bg-accent-blue text-white shadow-sm shadow-accent-blue/30 scale-102"
                        : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
                        }`}
                    >
                      <cert.icon size={11} className={selectedCertIndex === idx ? "text-white" : "text-accent-blue"} />
                      <span>{cert.title.length > 22 ? cert.title.slice(0, 20) + "..." : cert.title}</span>
                    </button>
                  ))}
                </div>

                {/* Multi-Page Selector Pills (for multi-page certificates) */}
                {activeCert.pages && activeCert.pages.length > 1 && (
                  <div className="flex items-center gap-1.5 pt-1.5 border-t border-white/5 overflow-x-auto no-scrollbar">
                    <span className="text-[10px] sm:text-[11px] font-bold text-cyan-300 font-outfit uppercase tracking-wider shrink-0">
                      Pages ({activeCert.pages.length}):
                    </span>
                    {activeCert.pages.map((_, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => {
                          setActivePageIndex(pIdx);
                          setZoomLevel(1);
                        }}
                        className={`text-[11px] px-2.5 py-0.5 rounded-md font-semibold font-outfit transition-all cursor-pointer shrink-0 ${activePageIndex === pIdx
                          ? "bg-cyan-500 text-white shadow-xs shadow-cyan-500/30 scale-105 border border-cyan-400"
                          : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                          }`}
                      >
                        Page {pIdx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Content Area with Zoom, Pan, Swipe & Floating Arrows */}
              <div
                className="flex-grow w-full bg-slate-950/80 relative flex items-center justify-center overflow-hidden p-2 sm:p-4 md:p-6"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className={`relative w-full h-[54vh] sm:h-[64vh] md:h-[72vh] rounded-xl overflow-auto select-none no-scrollbar flex items-center justify-center ${zoomLevel > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
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
                      src={(activeCert.pages && activeCert.pages[activePageIndex]) || activeCert.fileUrl}
                      alt={activeCert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 1024px"
                      className="object-contain rounded-xl drop-shadow-2xl"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Responsive Control Bar: Next/Prev, Zoom controls, indicator */}
              <div className="p-2.5 sm:p-3.5 border-t border-white/10 bg-slate-950/85 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 z-20">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevCert}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold font-outfit text-slate-200 border border-white/10 flex items-center gap-1 cursor-pointer transition-colors active:scale-95"
                  >
                    <ChevronLeft size={14} /> Prev
                  </button>

                  <span className="text-[11px] sm:text-xs font-semibold text-accent-blue bg-accent-blue/10 border border-accent-blue/30 px-2 py-0.5 rounded-md font-outfit">
                    Certificate {selectedCertIndex! + 1} of {certificates.length}
                  </span>

                  <button
                    type="button"
                    onClick={handleNextCert}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold font-outfit text-slate-200 border border-white/10 flex items-center gap-1 cursor-pointer transition-colors active:scale-95"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>

                {/* Image Zoom Controls (when image type) */}
                {activeCert.type === "image" && (
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
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
