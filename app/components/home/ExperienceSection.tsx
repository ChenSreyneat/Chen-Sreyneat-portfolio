"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { 
  Palette, 
  GraduationCap, 
  Laptop, 
  Eye, 
  ExternalLink, 
  X, 
  CheckCircle2, 
  Building2,
  Clock, 
  FileText, 
  Film, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Loader2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Image as ImageIcon, 
  Sparkles, 
  Wrench
} from "lucide-react";
import { FaBehance } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ModalLightBackground from "../ModalLightBackground";
import InBoxLightBackground from "../InBoxLightBackground";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  category: string;
  icon: React.ElementType;
  summary: string;
  metrics: { label: string; value: string }[];
  highlights: string[];
  bullets: string[];
  skills: string[];
  tools: string[];
  impact: string[];
  behanceUrl?: string;
  certificatePdf?: string;
  videos?: string[];
  images?: { url: string; label: string }[];
}

export default function ExperienceSection({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "certificate" | "videos" | "photos" | "tools">("overview");
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(1);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const experiences: ExperienceItem[] = [
    {
      id: "teaching",
      role: "Teaching Staff",
      company: "Center of Digital and Distance Education",
      period: "Jan - Mar 2025",
      category: "Education & Digital Training",
      icon: GraduationCap,
      summary: "Delivered interactive education app training and digital learning workshops for the Ministry of Education, Youth and Sport (MoEYS Cambodia).",
      metrics: [
        { label: "Students Trained", value: "578+" },
        { label: "High Schools", value: "9" },
        { label: "Partner", value: "MoEYS Cambodia" },
        { label: "App Adoption", value: "100% Hands-On" }
      ],
      images: [
        { url: "/image/Teaching 1.PNG", label: "Classroom Instruction on MoEYS Educational App (~578 Students)" },
        { url: "/image/Teaching 2.jpg", label: "Interactive Student Activities & Classroom Engagement" }
      ],
      highlights: [
        "Educated ~578 high school students across 9 schools",
        "Conducted training for the official MoEYS education app",
        "Designed interactive classroom activities for retention",
        "Managed classes & boosted student app download rates"
      ],
      bullets: [
        "Delivered lessons to high school students about the app which made by the MOEYS Cambodia to 9 high schools around 578 students.",
        "Designed some activities in the class to ensure students can get and understand the lessons.",
        "Responsible for managing each class and share lesson effectively.",
        "Increase the number of students to download the education app."
      ],
      skills: ["MoEYS Cambodia", "578+ Students", "9 High Schools", "Classroom Instruction", "App Adoption", "Activity Design", "Public Speaking", "Classroom Management"],
      tools: ["MoEYS Mobile App", "Presentation Slides", "Interactive Games", "Android & iOS Platforms", "Digital Classroom Tools"],
      impact: [
        "Guided 578+ Cambodian high school students across 9 campuses to actively download and engage with modern digital education tools.",
        "Fostered high classroom participation and knowledge retention through custom educational games and collaborative activities.",
        "Provided direct feedback and user experience reporting to the distance education development team to optimize app onboarding."
      ]
    },
    {
      id: "marketing",
      role: "Digital Marketing And Designer",
      company: "First Service Company",
      period: "1 Year • July 2026",
      category: "Marketing & Creative Design",
      icon: Palette,
      summary: "Spearheaded digital marketing campaigns, creative social media content, visual graphics, video scripting, and brand promotion.",
      metrics: [
        { label: "Original Videos", value: "9 Clips" },
        { label: "Platforms", value: "FB • TikTok • Behance" },
        { label: "Certificate", value: "Digital Marketing" },
        { label: "Experience", value: "1 Year" }
      ],
      behanceUrl: "https://www.behance.net/chensreyneat",
      certificatePdf: "/image/Digital Marketing Certificate.pdf",
      videos: [
        "/video/1.mp4",
        "/video/2.mp4",
        "/video/3.mp4",
        "/video/4.mp4",
        "/video/5.mp4",
        "/video/6.mp4",
        "/video/7.mp4",
        "/video/8.mp4",
        "/video/9.mp4"
      ],
      highlights: [
        "Managed Facebook, TikTok, and Behance platforms",
        "Created engaging content, captions & promotional posts",
        "Wrote scripts for short videos & designed posters",
        "Produced 9 marketing videos & earned marketing certificate"
      ],
      bullets: [
        "Managed social media platforms (Facebook, TikTok, Behance).",
        "Created engaging content, captions, and promotional posts.",
        "Wrote scripts for short marketing videos.",
        "Designed posters, and social media graphics.",
        "Edited basic videos.",
        "Researched content trends to increase audience engagement.",
        "Supported digital marketing campaigns and brand promotion.",
        "Collaborated with the sales team to create marketing content."
      ],
      skills: ["Facebook", "TikTok", "Behance", "Graphic Design", "Content Strategy", "Video Editing", "Campaign Promotion", "Brand Identity", "Copywriting", "Audience Engagement"],
      tools: ["Adobe Photoshop", "Adobe Illustrator", "Canva", "CapCut / Premiere", "Meta Business Suite", "TikTok Studio", "Behance Portfolio"],
      impact: [
        "Authored and edited 9 self-created promotional video assets that effectively drove company brand awareness.",
        "Elevated cross-platform engagement across Facebook, TikTok, and Behance with consistent visual styling and tailored captions.",
        "Collaborated closely with the sales team to produce compelling promotional campaigns that converted viewers into customers."
      ]
    },
    {
      id: "computer",
      role: "Practical Computer Experience",
      company: "Royal University of Phnom Penh (RUPP)",
      period: "4 Years (2022 - 2026)",
      category: "IT Support & Practical IT",
      icon: Laptop,
      summary: "Acquired 4 years of intensive hands-on IT engineering experience in software configuration, hardware troubleshooting, and web programming.",
      metrics: [
        { label: "Engineering Study", value: "4 Years" },
        { label: "Institution", value: "RUPP Cambodia" },
        { label: "Core Focus", value: "Hardware & Software" },
        { label: "Solutions", value: "Web Apps & IT Support" }
      ],
      highlights: [
        "Strong knowledge of computer hardware, software & OS",
        "Installed, configured & troubleshot software apps",
        "Built web applications & completed coding projects",
        "Provided technical support & problem-solving for peers"
      ],
      bullets: [
        "Developed strong knowledge of computer hardware, software, and operating systems.",
        "Installed, configured, and troubleshot computer software and applications.",
        "Gained hands-on experience with Microsoft Office (Word, Excel, and PowerPoint).",
        "Built websites and completed programming projects.",
        "Assisted classmates with computer-related problems and technical support.",
        "Applied problem-solving and teamwork skills through academic and practical IT projects."
      ],
      skills: ["Hardware & Systems", "OS Configuration", "Troubleshooting", "Web Development", "Microsoft Office", "Technical Support", "Networking Basics", "Problem Solving", "Team Collaboration"],
      tools: ["Windows OS", "Linux", "VS Code", "Next.js / React", "HTML5 / CSS3 / JavaScript", "MS Word, Excel & PowerPoint", "Git & GitHub", "Hardware Diagnostics Tools"],
      impact: [
        "Delivered continuous technical troubleshooting support for university peers, resolving operating system errors, software crashes, and hardware faults.",
        "Developed and deployed functional web applications demonstrating full front-end and engineering problem-solving principles.",
        "Mastered advanced Microsoft Office productivity workflows and software installations across diverse PC environments."
      ]
    }
  ];

  // Close modal on Escape key & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };

    if (selectedItem) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
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
          experiences.length - 1,
          Math.max(0, Math.round(scrollLeft / cardWidth))
        );
        setActiveSlide(current);
      }
    }
  }, [experiences.length]);

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

  const [photoZoomLevel, setPhotoZoomLevel] = useState<number>(1);
  const touchPhotoStartXRef = useRef<number | null>(null);
  const touchPhotoStartYRef = useRef<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoPillsRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isVideoBuffering, setIsVideoBuffering] = useState<boolean>(false);
  const [videoShowTapFeedback, setVideoShowTapFeedback] = useState<"play" | "pause" | null>(null);
  const touchVideoStartXRef = useRef<number | null>(null);
  const touchVideoStartYRef = useRef<number | null>(null);

  // Auto-scroll active video pill into view
  useEffect(() => {
    if (videoPillsRef.current) {
      const activeBtn = videoPillsRef.current.children[activeVideoIndex - 1] as HTMLElement;
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [activeVideoIndex]);

  const selectVideoClip = (num: number) => {
    setActiveVideoIndex(num);
    setIsVideoPlaying(false);
    setIsVideoBuffering(false);
  };

  const openExperienceModal = (item: ExperienceItem, initialTab: "overview" | "certificate" | "videos" | "photos" | "tools" = "overview") => {
    setSelectedItem(item);
    setActiveTab(initialTab);
    setActiveVideoIndex(1);
    setActivePhotoIndex(0);
    setPhotoZoomLevel(1);
    setIsVideoPlaying(false);
    setIsVideoBuffering(false);
  };

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsVideoPlaying(true);
        setVideoShowTapFeedback("play");
        setTimeout(() => setVideoShowTapFeedback(null), 600);
      }).catch((err) => {
        console.warn("Video playback error:", err);
      });
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
      setVideoShowTapFeedback("pause");
      setTimeout(() => setVideoShowTapFeedback(null), 600);
    }
  };

  const handleVideoTouchStart = (e: React.TouchEvent) => {
    touchVideoStartXRef.current = e.touches[0].clientX;
    touchVideoStartYRef.current = e.touches[0].clientY;
  };

  const handleVideoTouchEnd = (e: React.TouchEvent) => {
    if (touchVideoStartXRef.current === null || touchVideoStartYRef.current === null) return;
    const diffX = touchVideoStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchVideoStartYRef.current - e.changedTouches[0].clientY;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        selectVideoClip(activeVideoIndex < 9 ? activeVideoIndex + 1 : 1);
      } else {
        selectVideoClip(activeVideoIndex > 1 ? activeVideoIndex - 1 : 9);
      }
    }
    touchVideoStartXRef.current = null;
    touchVideoStartYRef.current = null;
  };

  const handlePhotoZoomIn = () => setPhotoZoomLevel((prev) => Math.min(2.5, +(prev + 0.5).toFixed(1)));
  const handlePhotoZoomOut = () => setPhotoZoomLevel((prev) => Math.max(1, +(prev - 0.5).toFixed(1)));
  const handleResetPhotoZoom = () => setPhotoZoomLevel(1);
  const togglePhotoZoom = () => setPhotoZoomLevel((prev) => (prev > 1 ? 1 : 2));

  const handlePhotoTouchStart = (e: React.TouchEvent) => {
    if (photoZoomLevel > 1) return;
    touchPhotoStartXRef.current = e.touches[0].clientX;
    touchPhotoStartYRef.current = e.touches[0].clientY;
  };

  const handlePhotoTouchEnd = (e: React.TouchEvent) => {
    if (photoZoomLevel > 1 || touchPhotoStartXRef.current === null || touchPhotoStartYRef.current === null || !selectedItem?.images) return;
    const diffX = touchPhotoStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchPhotoStartYRef.current - e.changedTouches[0].clientY;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      setPhotoZoomLevel(1);
      if (diffX > 0) {
        setActivePhotoIndex((prev) => (prev < selectedItem.images!.length - 1 ? prev + 1 : 0));
      } else {
        setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : selectedItem.images!.length - 1));
      }
    }
    touchPhotoStartXRef.current = null;
    touchPhotoStartYRef.current = null;
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
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

  return (
    <section id="experience" className={`relative overflow-hidden bg-transparent ${hideHeader ? "py-2" : "py-20 md:py-28"}`}>
      {/* Background UI Grid & Ambient Cosmic Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d70a208_1px,transparent_1px),linear-gradient(to_bottom,#1d70a208_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-35 blur-[100px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.5) 0%, rgba(37, 99, 235, 0.3) 40%, transparent 75%)"
        }}
      />

      {/* Header section */}
      {!hideHeader && (
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center text-center mb-14 md:mb-16 px-4 relative z-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-accent-blue/50" />
            <span className="text-accent-blue font-bold uppercase tracking-[0.4em] text-[0.6rem] font-outfit">
              Work Experience
            </span>
            <div className="w-8 h-[1px] bg-accent-blue/50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3 font-outfit">
            Work <span className="text-accent-blue">Experience</span>
          </h2>
          <p className="text-slate-200 text-sm md:text-base max-w-2xl font-medium font-inter">
            Professional roles, digital marketing achievements, and practical IT engineering expertise.
          </p>
        </motion.div>
      )}

      {/* Responsive Slider / Desktop 3-Column Grid Container */}
      <div className="relative w-full z-10 max-w-6xl mx-auto px-0 sm:px-4">
        {/* Left Circular Arrow Button (hidden on mobile, visible on desktop like Portfolio Showcase) */}
        <button
          type="button"
          onClick={() => handleScroll("left")}
          className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/90 backdrop-blur-md text-white rounded-full hidden lg:flex items-center justify-center z-30 transition-all duration-300 border border-white/20 hover:border-accent-blue hover:bg-slate-800 hover:scale-105 active:scale-95 cursor-pointer shadow-lg ${
            showLeftArrow ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none -translate-x-4"
          }`}
          aria-label="Previous Experience"
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
          aria-label="Next Experience"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Scrollable Container with native snap & touch swipe on mobile/tablet, 3-col grid on desktop */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="flex lg:grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible py-4 lg:py-0 px-4 lg:px-0 no-scrollbar snap-x snap-proximity lg:snap-none touch-auto cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-stretch"
        >
          {experiences.map((item, index) => (
            <motion.div 
              key={index} 
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -6 }}
              className="w-[82vw] max-w-[340px] sm:w-[350px] lg:w-full shrink-0 lg:shrink snap-center lg:snap-align-none h-[450px] group relative flex"
            >
              <div className="relative h-[450px] w-full flex flex-col justify-between bg-slate-900/40 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-accent-blue/70 hover:shadow-[0_12px_35px_-5px_rgba(96,165,250,0.22)] hover:bg-slate-900/60 shadow-lg overflow-hidden">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Top Row: Icon & Period Pill */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-linear-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center text-accent-blue shadow-inner group-hover:border-accent-blue/60 group-hover:shadow-[0_0_18px_rgba(96,165,250,0.35)] transition-all">
                        <item.icon size={22} className="text-accent-blue group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-cyan-300 font-bold text-xs bg-white/5 px-3 py-1.5 rounded-full border border-accent-blue/40 font-outfit shadow-xs">
                        <Clock size={12} className="text-cyan-400" />
                        <span>{item.period}</span>
                      </span>
                    </div>

                    {/* Role & Company Header */}
                    <div className="space-y-1 mb-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent-blue/90 font-outfit">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-extrabold text-white group-hover:text-accent-blue transition-colors font-outfit tracking-tight leading-snug line-clamp-1">
                        {item.role}
                      </h3>
                      <p className="text-accent-blue text-xs font-bold font-outfit flex items-center gap-1.5">
                        <Building2 size={13} className="shrink-0 text-accent-blue/80" />
                        <span className="truncate">{item.company}</span>
                      </p>
                    </div>

                    {/* Summary Description (Clean 2-line clamp) */}
                    <p className="text-slate-300 text-xs leading-relaxed font-medium font-inter mb-3 line-clamp-2">
                      {item.summary}
                    </p>

                    {/* Middle Feature Section for Teaching Staff */}
                    {item.id === "teaching" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-sky-500/10 text-sky-300 border border-sky-400/30 text-[11px] font-bold font-outfit">
                            <ImageIcon size={12} />
                            <span>2 Teaching Photos</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => openExperienceModal(item, "photos")}
                            className="text-[11px] font-bold text-accent-blue hover:text-white transition-colors cursor-pointer font-outfit"
                          >
                            Enlarge →
                          </button>
                        </div>

                        {/* 2-Photo Thumbnail Grid */}
                        <div className="grid grid-cols-2 gap-2">
                          {item.images?.map((img, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedItem(item);
                                setActiveTab("photos");
                                setActivePhotoIndex(pIdx);
                              }}
                              className="group/thumb relative h-20 rounded-xl overflow-hidden border border-white/10 hover:border-sky-400/60 transition-all cursor-pointer shadow-md bg-slate-950/60"
                              title={`Click to view ${img.label}`}
                            >
                              <Image
                                src={img.url}
                                alt={img.label}
                                fill
                                sizes="200px"
                                className="object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover/thumb:opacity-100 transition-opacity flex items-end justify-between p-1.5">
                                <span className="text-[10px] font-bold text-white font-outfit truncate">
                                  Photo {pIdx + 1}
                                </span>
                                <ImageIcon size={11} className="text-sky-300 shrink-0" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Middle Feature Section for Digital Marketing */}
                    {item.id === "marketing" && (
                      <div className="space-y-2.5">
                        <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-white/[0.03] border border-white/10">
                          {item.behanceUrl && (
                            <a
                              href={item.behanceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#0057ff]/15 hover:bg-[#0057ff]/30 text-[#60a5fa] hover:text-white border border-[#0057ff]/30 text-[11px] font-bold font-outfit transition-all hover:scale-105"
                            >
                              <FaBehance size={12} />
                              <span>Behance</span>
                              <ExternalLink size={9} className="opacity-70" />
                            </a>
                          )}
                          {item.certificatePdf && (
                            <button
                              type="button"
                              onClick={() => openExperienceModal(item, "certificate")}
                              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[11px] font-bold font-outfit transition-all hover:scale-105 cursor-pointer"
                            >
                              <FileText size={11} />
                              <span>Certificate</span>
                            </button>
                          )}
                          {item.videos && (
                            <button
                              type="button"
                              onClick={() => openExperienceModal(item, "videos")}
                              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold font-outfit transition-all hover:scale-105 cursor-pointer"
                            >
                              <Film size={11} />
                              <span>9 Videos</span>
                            </button>
                          )}
                        </div>

                        {/* Marketing Key Focus Items */}
                        <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold text-slate-300 font-inter">
                          <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0 shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
                            <span className="truncate">Facebook &amp; TikTok</span>
                          </div>
                          <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0 shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
                            <span className="truncate">9 Video Scripts</span>
                          </div>
                          <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0 shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
                            <span className="truncate">Poster Graphics</span>
                          </div>
                          <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0 shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
                            <span className="truncate">Audience Growth</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Middle Feature Section for Practical Computer */}
                    {item.id === "computer" && (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-accent-blue/10 text-cyan-300 border border-accent-blue/30 text-[11px] font-bold font-outfit">
                            <Laptop size={12} />
                            <span>4-Year IT Program</span>
                          </span>
                          <span className="text-[11px] text-slate-400 font-outfit">RUPP Campus</span>
                        </div>

                        {/* Computer Key Focus Items */}
                        <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold text-slate-300 font-inter">
                          <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0 shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
                            <span className="truncate">Hardware &amp; Systems</span>
                          </div>
                          <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0 shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
                            <span className="truncate">OS &amp; Troubleshooting</span>
                          </div>
                          <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0 shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
                            <span className="truncate">Web Development</span>
                          </div>
                          <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0 shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
                            <span className="truncate">Technical Support</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Button: Fixed at bottom */}
                  <div className="pt-3 border-t border-white/10 mt-auto">
                    <button
                      type="button"
                      onClick={() => openExperienceModal(item, "overview")}
                      className="w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 bg-accent-blue/10 hover:bg-accent-blue border border-accent-blue/30 hover:border-accent-blue text-xs font-bold text-accent-blue hover:text-white transition-all duration-300 group/btn cursor-pointer font-outfit uppercase tracking-wider shadow-sm hover:shadow-lg hover:shadow-accent-blue/25 active:scale-[0.98]"
                    >
                      <Eye size={15} className="group-hover/btn:scale-110 transition-transform" />
                      <span>View Details &amp; Pop-up</span>
                      <ExternalLink size={13} className="opacity-70 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Responsive Pagination Dots Indicator (< lg) */}
        <div className="flex lg:hidden justify-center items-center gap-2 mt-4">
          {experiences.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === idx ? "w-6 bg-accent-blue shadow-xs shadow-accent-blue/40" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to experience ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Pop-up Modal: Rich With Detailed Inputs, Metrics, Deliverables & Media */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 md:p-8">
            {/* Backdrop Blur with Cosmic Glass */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-[#010413]/80 backdrop-blur-md"
            />
            
            {/* Modal Light Background Animation & Glow */}
            <ModalLightBackground />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-3xl max-h-[92dvh] sm:max-h-[90vh] bg-[#020617]/95 backdrop-blur-2xl border border-accent-blue/30 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(56,189,248,0.25)] flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 bg-slate-950/80 backdrop-blur-md flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center text-accent-blue shrink-0 shadow-sm">
                    <selectedItem.icon size={22} className="text-accent-blue" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent-blue font-outfit">
                      {selectedItem.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-white font-outfit truncate">
                      {selectedItem.role}
                    </h3>
                    <p className="text-xs sm:text-sm text-accent-blue font-bold font-outfit truncate">
                      {selectedItem.company}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="hidden sm:inline-block text-cyan-300 font-bold text-xs bg-white/5 px-3 py-1 rounded-md border border-accent-blue/40 font-outfit shadow-xs">
                    {selectedItem.period}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer border border-white/10 outline-none"
                    aria-label="Close modal"
                  >
                    <X size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Navigation Tabs */}
              <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 pt-2 border-b border-white/10 bg-slate-950/60 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`px-3 py-2 text-xs sm:text-sm font-bold font-outfit border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === "overview"
                      ? "border-accent-blue text-white"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Overview &amp; Deliverables
                </button>

                {selectedItem.images && selectedItem.images.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("photos")}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold font-outfit border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                      activeTab === "photos"
                        ? "border-sky-400 text-white"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <ImageIcon size={14} className="text-sky-400" />
                    <span>Teaching Photos ({selectedItem.images.length})</span>
                  </button>
                )}

                {selectedItem.certificatePdf && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("certificate")}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold font-outfit border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                      activeTab === "certificate"
                        ? "border-cyan-400 text-white"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <FileText size={14} className="text-cyan-400" />
                    <span>Certificate (PDF)</span>
                  </button>
                )}

                {selectedItem.videos && selectedItem.videos.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("videos")}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold font-outfit border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                      activeTab === "videos"
                        ? "border-emerald-400 text-white"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Film size={14} className="text-emerald-400" />
                    <span>My Videos ({selectedItem.videos.length})</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setActiveTab("tools")}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold font-outfit border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === "tools"
                      ? "border-amber-400 text-white"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Wrench size={13} className="text-amber-400" />
                  <span>Tools &amp; Stack</span>
                </button>

                {selectedItem.behanceUrl && (
                  <a
                    href={selectedItem.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 mb-1 rounded-lg bg-[#0057ff]/15 hover:bg-[#0057ff]/25 border border-[#0057ff]/30 text-[#60a5fa] hover:text-white text-xs font-bold font-outfit transition-all shrink-0"
                  >
                    <FaBehance size={13} />
                    <span className="hidden sm:inline">Behance</span>
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>

              {/* Modal Body */}
              <div className="flex-grow w-full bg-slate-950/50 relative overflow-y-auto p-4 sm:p-6 space-y-6">
                <InBoxLightBackground />

                {/* Tab 1: Overview & Responsibilities with Deep Inputs */}
                {activeTab === "overview" && (
                  <div className="space-y-6 relative z-10">
                    {/* Performance Metrics Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {selectedItem.metrics.map((metric, mIdx) => (
                        <div 
                          key={mIdx} 
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-accent-blue/40 transition-colors shadow-xs"
                        >
                          <div className="text-base sm:text-lg font-extrabold text-cyan-300 font-outfit">
                            {metric.value}
                          </div>
                          <div className="text-[11px] font-semibold text-slate-400 font-inter mt-0.5">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Behance Banner Card (If Available) */}
                    {selectedItem.behanceUrl && (
                      <div className="p-4 rounded-xl bg-linear-to-r from-[#0057ff]/20 via-[#0057ff]/10 to-transparent border border-[#0057ff]/35 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#0057ff]/25 border border-[#0057ff]/40 flex items-center justify-center text-[#60a5fa] shrink-0">
                            <FaBehance size={22} />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white font-outfit">
                              Behance Portfolio Profile
                            </h4>
                            <p className="text-xs text-slate-300 font-inter">
                              Explore my design projects, branding assets, and creative marketing artwork.
                            </p>
                          </div>
                        </div>
                        <a
                          href={selectedItem.behanceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-lg bg-[#0057ff] hover:bg-[#0046d1] text-white text-xs font-bold font-outfit uppercase tracking-wider inline-flex items-center gap-2 shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
                        >
                          <span>Visit Behance</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    )}

                    {/* Role In-Depth Overview */}
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-accent-blue font-outfit">
                        Role Overview &amp; Context
                      </h4>
                      <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-semibold font-inter">
                        {selectedItem.summary}
                      </p>
                    </div>

                    {/* Full Key Responsibilities List */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-accent-blue font-outfit">
                        Core Responsibilities &amp; Deliverables
                      </h4>
                      <div className="space-y-2.5">
                        {selectedItem.bullets.map((bullet, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent-blue/30 transition-colors"
                          >
                            <CheckCircle2 size={16} className="text-accent-blue shrink-0 mt-0.5" />
                            <span className="text-slate-200 text-xs sm:text-sm font-semibold font-inter leading-relaxed">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Achievements & Real-World Impact */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/30 space-y-2.5 shadow-sm">
                      <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider font-outfit">
                        <Sparkles size={14} className="text-cyan-400" />
                        <span>Key Achievements &amp; Measurable Impact</span>
                      </div>
                      <div className="space-y-2">
                        {selectedItem.impact.map((imp, impIdx) => (
                          <div key={impIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-200 font-inter font-medium leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5 shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
                            <span>{imp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Applied Skills Badges */}
                    <div className="space-y-2 pt-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-accent-blue font-outfit">
                        Skills &amp; Competencies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.skills.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs font-bold text-cyan-300 bg-white/5 border border-accent-blue/30 px-3 py-1 rounded-lg font-outfit shadow-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Photos Viewer (Teaching Staff) */}
                {activeTab === "photos" && selectedItem.images && selectedItem.images.length > 0 && (
                  <div className="space-y-4 relative z-10">
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white font-outfit flex items-center gap-2">
                          <ImageIcon size={15} className="text-sky-400" />
                          <span>Classroom Instruction &amp; Student Outreach Photos</span>
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-300 font-inter">
                          MoEYS Cambodia educational app instruction across 9 high schools (~578 students).
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-md font-outfit">
                          Photo {activePhotoIndex + 1} of {selectedItem.images.length}
                        </span>
                        <a
                          href={selectedItem.images[activePhotoIndex].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold font-outfit border border-white/10 transition-colors"
                          title="Open full photo"
                        >
                          <ExternalLink size={12} />
                          <span className="hidden sm:inline">Original</span>
                        </a>
                      </div>
                    </div>

                    {/* Photo Selector Pills */}
                    <div className="flex items-center gap-2">
                      {selectedItem.images.map((_, pIdx) => {
                        const isCurrent = activePhotoIndex === pIdx;
                        return (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => {
                              setActivePhotoIndex(pIdx);
                              setPhotoZoomLevel(1);
                            }}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-outfit transition-all cursor-pointer flex items-center gap-1.5 ${
                              isCurrent
                                ? "bg-sky-500 text-white shadow-md shadow-sky-500/30 scale-105 border border-sky-400"
                                : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                            }`}
                          >
                            <ImageIcon size={12} />
                            <span>Photo {pIdx + 1}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Main Photo Frame with Zoom, Pan, Swipe & Floating Arrows */}
                    <div 
                      className="relative w-full rounded-2xl overflow-hidden bg-black/90 border border-white/15 shadow-2xl flex flex-col items-center"
                      onTouchStart={handlePhotoTouchStart}
                      onTouchEnd={handlePhotoTouchEnd}
                    >
                      {/* Floating Prev Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoZoomLevel(1);
                          setActivePhotoIndex(prev => prev > 0 ? prev - 1 : selectedItem.images!.length - 1);
                        }}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/20 hover:border-sky-400 text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      {/* Floating Next Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoZoomLevel(1);
                          setActivePhotoIndex(prev => prev < selectedItem.images!.length - 1 ? prev + 1 : 0);
                        }}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/20 hover:border-sky-400 text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                        aria-label="Next photo"
                      >
                        <ChevronRight size={20} />
                      </button>

                      <div 
                        className={`relative w-full h-[46vh] sm:h-[54vh] flex items-center justify-center bg-black/60 overflow-auto select-none no-scrollbar ${
                          photoZoomLevel > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                        }`}
                        onDoubleClick={togglePhotoZoom}
                      >
                        <div
                          className="relative flex items-center justify-center transition-transform duration-200 origin-center"
                          style={{
                            transform: `scale(${photoZoomLevel})`,
                            width: photoZoomLevel > 1 ? `${photoZoomLevel * 100}%` : "100%",
                            height: photoZoomLevel > 1 ? `${photoZoomLevel * 100}%` : "100%",
                            minWidth: "100%",
                            minHeight: "100%",
                          }}
                        >
                          <Image
                            src={selectedItem.images[activePhotoIndex].url}
                            alt={selectedItem.images[activePhotoIndex].label}
                            fill
                            sizes="(max-width: 1024px) 100vw, 850px"
                            className="object-contain"
                            priority
                          />
                        </div>
                      </div>

                      {/* Photo Bottom Bar: Prev/Next & Zoom Controls */}
                      <div className="w-full p-2.5 sm:p-3 bg-slate-900/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 z-20">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setPhotoZoomLevel(1);
                              setActivePhotoIndex(prev => prev > 0 ? prev - 1 : selectedItem.images!.length - 1);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold font-outfit text-slate-200 border border-white/10 flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <ChevronLeft size={14} /> Prev
                          </button>

                          <span className="text-xs font-semibold font-inter text-slate-200 truncate max-w-[150px] sm:max-w-xs">
                            {selectedItem.images[activePhotoIndex].label}
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              setPhotoZoomLevel(1);
                              setActivePhotoIndex(prev => prev < selectedItem.images!.length - 1 ? prev + 1 : 0);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold font-outfit text-slate-200 border border-white/10 flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            Next <ChevronRight size={14} />
                          </button>
                        </div>

                        {/* Photo Zoom Controls */}
                        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5 ml-auto">
                          <button
                            type="button"
                            onClick={handlePhotoZoomOut}
                            disabled={photoZoomLevel <= 1}
                            className="p-1 sm:p-1.5 rounded-md text-white/70 hover:text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-white/10 transition-colors cursor-pointer"
                            title="Zoom Out"
                          >
                            <ZoomOut size={13} />
                          </button>
                          <span className="text-[11px] font-bold font-outfit text-sky-400 px-1.5 min-w-[38px] text-center select-none">
                            {Math.round(photoZoomLevel * 100)}%
                          </span>
                          <button
                            type="button"
                            onClick={handlePhotoZoomIn}
                            disabled={photoZoomLevel >= 2.5}
                            className="p-1 sm:p-1.5 rounded-md text-white/70 hover:text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-white/10 transition-colors cursor-pointer"
                            title="Zoom In"
                          >
                            <ZoomIn size={13} />
                          </button>
                          {photoZoomLevel > 1 && (
                            <button
                              type="button"
                              onClick={handleResetPhotoZoom}
                              className="p-1 sm:p-1.5 rounded-md text-sky-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                              title="Reset Zoom"
                            >
                              <RotateCcw size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Certificate PDF Viewer */}
                {activeTab === "certificate" && selectedItem.certificatePdf && (
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-cyan-400" />
                        <span className="text-xs sm:text-sm font-bold text-white font-outfit">
                          Digital Marketing Certificate (Official Document)
                        </span>
                      </div>
                      <a
                        href={selectedItem.certificatePdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 text-xs font-bold font-outfit transition-colors cursor-pointer"
                      >
                        <ExternalLink size={13} />
                        <span>Open Original PDF</span>
                      </a>
                    </div>

                    <div className="w-full h-[52vh] sm:h-[60vh] rounded-xl overflow-hidden border border-white/10 bg-slate-950/80 shadow-2xl">
                      <iframe
                        src={`${selectedItem.certificatePdf}#toolbar=0&navpanes=0`}
                        className="w-full h-full border-0 rounded-xl"
                        title="Digital Marketing Certificate"
                      />
                    </div>
                  </div>
                )}

                {/* Tab 4: Video Creations (9 Self-Created Marketing Videos) */}
                {activeTab === "videos" && selectedItem.videos && (
                  <div className="space-y-4 sm:space-y-5 relative z-10">
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white font-outfit flex items-center gap-2">
                          <Film size={15} className="text-emerald-400" />
                          <span>Self-Created Marketing Videos</span>
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-300 font-inter">
                          Scripts, editing, visual pacing, and promotional video clips created by Chen Sreyneat.
                        </p>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md font-outfit shrink-0 w-fit">
                        Video {activeVideoIndex} of {selectedItem.videos.length}
                      </span>
                    </div>

                    {/* Video Selector Pills (1 to 9) */}
                    <div 
                      ref={videoPillsRef}
                      className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar"
                    >
                      {selectedItem.videos.map((_, vIdx) => {
                        const num = vIdx + 1;
                        const isCurrent = activeVideoIndex === num;
                        return (
                          <button
                            key={num}
                            type="button"
                            onClick={() => selectVideoClip(num)}
                            className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-bold font-outfit whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                              isCurrent
                                ? "bg-accent-blue text-white shadow-md shadow-blue-500/30 scale-105 border border-blue-400"
                                : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                            }`}
                          >
                            <Play size={11} className={isCurrent ? "fill-white" : ""} />
                            <span>Clip {num}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Main Video Theater: Tap to Play/Pause, Buffering Spinner, Touch Swipe */}
                    <div 
                      className="relative w-full max-w-xl mx-auto rounded-2xl overflow-hidden bg-black/95 border border-white/15 shadow-2xl flex flex-col items-center"
                      onTouchStart={handleVideoTouchStart}
                      onTouchEnd={handleVideoTouchEnd}
                    >
                      {/* Video Player Container */}
                      <div className="relative w-full flex items-center justify-center bg-black min-h-[220px]">
                        <video
                          ref={videoRef}
                          key={activeVideoIndex}
                          src={`/video/${activeVideoIndex}.mp4`}
                          controls
                          playsInline
                          preload="metadata"
                          onWaiting={() => setIsVideoBuffering(true)}
                          onPlaying={() => {
                            setIsVideoBuffering(false);
                            setIsVideoPlaying(true);
                          }}
                          onPause={() => setIsVideoPlaying(false)}
                          onEnded={() => setIsVideoPlaying(false)}
                          onLoadedData={() => setIsVideoBuffering(false)}
                          className="w-full max-h-[46vh] sm:max-h-[52vh] object-contain rounded-t-2xl bg-black cursor-pointer"
                        />

                        {/* Interactive Centered Play Button Overlay when paused */}
                        {!isVideoPlaying && !isVideoBuffering && (
                          <div 
                            onClick={toggleVideoPlay}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[2px] transition-all cursor-pointer z-20 group/play"
                          >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent-blue/90 text-white flex items-center justify-center shadow-[0_0_35px_rgba(56,189,248,0.7)] group-hover/play:scale-110 group-hover/play:bg-accent-blue transition-all cursor-pointer border border-white/30">
                              <Play size={28} className="fill-white translate-x-0.5" />
                            </div>
                            <span className="mt-3 text-xs sm:text-sm font-bold font-outfit text-white tracking-wide bg-slate-950/80 px-3 py-1 rounded-full border border-white/10 shadow-md">
                              Click to Play Video #{activeVideoIndex}
                            </span>
                          </div>
                        )}

                        {/* Buffering Loading Spinner Overlay */}
                        {isVideoBuffering && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-20 pointer-events-none">
                            <Loader2 size={36} className="text-accent-blue animate-spin" />
                            <span className="mt-2 text-xs font-bold text-white font-outfit bg-slate-950/80 px-3 py-1 rounded-full border border-white/10">
                              Loading Video #{activeVideoIndex}...
                            </span>
                          </div>
                        )}

                        {/* Tap Feedback Flash */}
                        <AnimatePresence>
                          {videoShowTapFeedback && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.6 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 1.3 }}
                              transition={{ duration: 0.4 }}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-slate-950/80 backdrop-blur-md text-white flex items-center justify-center pointer-events-none z-30 border border-white/20"
                            >
                              {videoShowTapFeedback === "play" ? (
                                <Play size={24} className="fill-white translate-x-0.5 text-accent-blue" />
                              ) : (
                                <Pause size={24} className="fill-white text-accent-blue" />
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Video Bottom Navigation Controls */}
                      <div className="w-full p-3 bg-slate-900/90 border-t border-white/10 flex items-center justify-between gap-2 z-10">
                        <button
                          type="button"
                          onClick={() => selectVideoClip(activeVideoIndex > 1 ? activeVideoIndex - 1 : 9)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold font-outfit text-slate-200 border border-white/10 flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95"
                        >
                          <ChevronLeft size={14} /> Prev Clip
                        </button>

                        <div className="text-center">
                          <span className="text-xs font-bold font-outfit text-white block">
                            Marketing Video #{activeVideoIndex}
                          </span>
                          <span className="text-[10px] text-slate-400 font-inter">
                            Swipe or tap to switch
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => selectVideoClip(activeVideoIndex < 9 ? activeVideoIndex + 1 : 1)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold font-outfit text-slate-200 border border-white/10 flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95"
                        >
                          Next Clip <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 5: Tools & Technologies Stack */}
                {activeTab === "tools" && (
                  <div className="space-y-5 relative z-10">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-outfit flex items-center gap-2">
                        <Wrench size={15} />
                        <span>Tools, Software &amp; Environments</span>
                      </h4>
                      <p className="text-slate-300 text-xs sm:text-sm font-inter">
                        Comprehensive list of software, operating systems, hardware diagnostics, and creative platforms leveraged in this role.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedItem.tools.map((tool, tIdx) => (
                        <div 
                          key={tIdx} 
                          className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-accent-blue/40 transition-colors flex items-center gap-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue shrink-0">
                            <Wrench size={14} />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-white font-outfit">
                            {tool}
                          </span>
                        </div>
                      ))}
                    </div>
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
