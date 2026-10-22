"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  ExternalLink,
  Download,
  Mail,
  MapPin,
  Globe,
  User,
  Users,
  Lightbulb,
  CheckCircle2,
  MessageSquare
} from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTelegram
} from "react-icons/fa";

import { useState, useRef, useCallback } from "react";

export default function AboutSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollToSlide = useCallback((index: number) => {
    if (sliderRef.current) {
      const cards = Array.from(sliderRef.current.children) as HTMLElement[];
      if (cards[index]) {
        cards[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
        setActiveSlide(index);
      }
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (sliderRef.current) {
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
        setActiveSlide(closestIndex);
      }
    }
  }, []);

  // Mouse drag-to-scroll support
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || !sliderRef.current) return;
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = x - startXRef.current;
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

  return (
    <section id="about" className="min-h-[calc(100dvh-4.5rem)] flex flex-col justify-center py-4 sm:py-8 md:py-16 lg:py-24 relative overflow-hidden bg-transparent snap-center snap-always scroll-mt-16">
      {/* Background UI Grid & Ambient Luminous Glow (Matching EducationSection) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d70a208_1px,transparent_1px),linear-gradient(to_bottom,#1d70a208_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[350px] sm:h-[400px] rounded-full opacity-35 blur-[100px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.5) 0%, rgba(37, 99, 235, 0.3) 40%, transparent 75%)"
        }}
      />

      <div className="max-w-6xl mx-auto px-0 sm:px-4 md:px-8 relative z-10 w-full">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-4 sm:mb-8 md:mb-12 px-4"
        >
          <div className="flex items-center justify-center gap-3 mb-2 sm:mb-3">
            <div className="w-8 h-[1px] bg-accent-blue/50" />
            <span className="text-accent-blue font-bold uppercase tracking-[0.4em] text-[0.6rem] font-outfit">Get To Know Me</span>
            <div className="w-8 h-[1px] bg-accent-blue/50" />
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 sm:mb-3 font-outfit">
            About <span className="text-accent-blue">Me</span>
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-2xl font-medium font-inter">
            A glimpse into my background, creative design skills, and practical IT engineering journey.
          </p>
        </motion.div>

        {/* Mobile View: Single-Screen Snap Slider with Pagination Dots (< lg) */}
        <div className="block lg:hidden relative w-full z-10 max-w-6xl mx-auto px-0">
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="flex gap-4 overflow-x-auto py-2 px-4 no-scrollbar snap-x snap-mandatory scroll-smooth touch-auto cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-stretch"
          >
            {/* Card 1: Profile & Identity */}
            <div className="w-[calc(100vw-2.5rem)] max-w-[360px] shrink-0 snap-center snap-always h-[450px] group relative flex mx-auto">
              <div className="relative h-[450px] w-full flex flex-col justify-between bg-slate-900/40 backdrop-blur-md border border-white/15 rounded-2xl p-5 transition-all duration-300 hover:border-accent-blue/70 shadow-lg overflow-hidden">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Top Row: Status badge & Location */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-accent-blue/40 text-cyan-300 text-[10px] font-bold font-outfit uppercase tracking-wider shadow-xs">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                        </span>
                        Available for Hire
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-300 font-medium font-outfit">
                        <MapPin size={12} className="text-accent-blue" />
                        Phnom Penh, KH
                      </span>
                    </div>

                    {/* Avatar & Title */}
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="relative w-16 h-16 rounded-full border-2 border-accent-blue/50 p-0.5 shrink-0 shadow-md">
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                          <Image src="/image/1.png" alt="Chen Sreyneat" fill sizes="64px" className="object-cover" priority />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-extrabold text-white font-outfit truncate">Chen Sreyneat</h3>
                        <p className="text-accent-blue text-xs font-bold font-outfit leading-tight line-clamp-2">
                          IT Engineering Graduate • Digital Marketing &amp; Designer
                        </p>
                      </div>
                    </div>

                    {/* Bio Summary */}
                    <p className="text-slate-200 text-xs leading-relaxed font-semibold font-inter line-clamp-5">
                      Combining IT engineering foundations from Royal University of Phnom Penh with creative visual design and digital marketing. I specialize in crafting high-impact branding, interactive digital interfaces, and modern technology solutions that connect.
                    </p>
                  </div>

                  {/* Action Button: Download CV */}
                  <div className="pt-3 border-t border-white/10 w-full">
                    <a
                      href="/image/CV_Chen_Sreyneat.pdf"
                      download="CV_Chen_Sreyneat.pdf"
                      className="w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 bg-[#4185DB] hover:bg-[#3273c5] border border-[#4185DB] text-xs font-bold text-white transition-all duration-300 group/btn cursor-pointer font-outfit uppercase tracking-wider shadow-md shadow-[#4185DB]/25 hover:shadow-lg hover:shadow-[#4185DB]/40 active:scale-[0.98]"
                    >
                      <Download size={14} className="stroke-[2.5]" />
                      <span>Download Full CV</span>
                      <ExternalLink size={12} className="opacity-80" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Languages, Skills & Connect */}
            <div className="w-[calc(100vw-2.5rem)] max-w-[360px] shrink-0 snap-center snap-always h-[450px] group relative flex mx-auto">
              <div className="relative h-[450px] w-full flex flex-col justify-between bg-slate-900/40 backdrop-blur-md border border-white/15 rounded-2xl p-5 transition-all duration-300 hover:border-accent-blue/70 shadow-lg overflow-hidden">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Top Row: Heading Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-accent-blue font-bold uppercase tracking-wider text-[11px] font-outfit flex items-center gap-1.5">
                        <Globe size={13} /> Languages &amp; Skills
                      </span>
                      <span className="text-[10px] text-cyan-300 font-bold font-outfit bg-white/5 border border-accent-blue/30 px-2 py-0.5 rounded">
                        RUPP Scholarship
                      </span>
                    </div>

                    {/* Languages Mini Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                        <div className="font-bold text-xs text-white font-outfit">Khmer</div>
                        <div className="text-[11px] text-slate-400 font-inter">Native Proficiency</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                        <div className="font-bold text-xs text-white font-outfit">English</div>
                        <div className="text-[11px] text-slate-400 font-inter">Professional Working</div>
                      </div>
                    </div>

                    {/* Soft Skills Chips */}
                    <div className="mb-3">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-outfit">Core Strengths</div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {["Teamwork & Leadership", "Creative Direction", "Problem Solving", "Communication"].map((skill, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-200 font-medium font-outfit">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0" />
                            <span className="truncate">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Direct Social Channels Row */}
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-outfit">Direct Channels</div>
                      <div className="flex items-center gap-2">
                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:text-accent-blue hover:border-accent-blue transition-colors" aria-label="GitHub"><FaGithub size={14} /></a>
                        <a href="https://www.linkedin.com/in/chen-sreyneat-749654313/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#0a66c2] hover:border-accent-blue transition-colors" aria-label="LinkedIn"><FaLinkedin size={14} /></a>
                        <a href="https://t.me/Neat198" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#229ed9] hover:border-accent-blue transition-colors" aria-label="Telegram"><FaTelegram size={14} /></a>
                        <a href="mailto:chensreyneat198@gmail.com" className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#ea4335] hover:border-accent-blue transition-colors" aria-label="Email"><Mail size={14} /></a>
                      </div>
                    </div>
                  </div>

                  {/* Action Button: Get In Touch */}
                  <div className="pt-3 border-t border-white/10 w-full">
                    <Link
                      href="/#contact"
                      className="w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 bg-[#4185DB] hover:bg-[#3273c5] border border-[#4185DB] text-xs font-bold text-white transition-all duration-300 group/btn cursor-pointer font-outfit uppercase tracking-wider shadow-md shadow-[#4185DB]/25 hover:shadow-lg hover:shadow-[#4185DB]/40 active:scale-[0.98]"
                    >
                      <Calendar size={14} className="stroke-[2.5]" />
                      <span>Get In Touch / Schedule A Call</span>
                      <ExternalLink size={12} className="opacity-80" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Responsive Pagination Dots Indicator (< lg) */}
          <div className="flex lg:hidden justify-center items-center gap-2 mt-4">
            {[0, 1].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === idx ? "w-6 bg-accent-blue shadow-xs shadow-accent-blue/40" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to about card ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop View: Wide Grid (hidden on mobile, visible lg:) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 hidden lg:grid lg:grid-cols-12 gap-6 lg:gap-12 items-start"
        >

          {/* Left Column: Profile Card Sidebar (Unboxed Column) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start pb-8 lg:pb-0 lg:pr-4">

            {/* Circular Avatar with Vivid Blue Ring */}
            <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full border-[1.5px] border-accent-blue/40 p-1 bg-transparent shadow-sm mx-auto lg:mx-0">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/image/1.png"
                  alt="Chen Sreyneat"
                  fill
                  sizes="(max-width: 768px) 192px, 192px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Status Badge: Open to Opportunities (Education Badge Background) */}
            <div className="relative -mt-3 z-10 flex justify-center w-full lg:w-auto mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-accent-blue/40 text-cyan-300 text-xs font-bold font-outfit uppercase tracking-wider shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Open to Opportunities
              </span>
            </div>

            {/* Location Small Box (Education Box Background) */}
            <div className="w-full flex items-center gap-3 mb-4 p-3 rounded-xl bg-slate-950/20 border border-white/20 hover:border-accent-blue shadow-sm hover:shadow-accent-blue/20 transition-all group">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/20 flex items-center justify-center shrink-0 text-accent-blue shadow-inner group-hover:border-accent-blue/60 group-hover:shadow-[0_0_12px_rgba(96,165,250,0.3)] transition-all">
                <MapPin size={15} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-sm font-outfit">
                  Phnom Penh, Cambodia
                </span>
                <span className="font-mono text-slate-400 text-xs font-medium">
                  11.5564° N, 104.9282° E
                </span>
              </div>
            </div>

            {/* Languages Mini Boxes (Education Box Background) */}
            <div className="w-full mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-accent-blue/80 uppercase tracking-[0.25em] mb-2 font-outfit">
                <Globe size={13} className="text-accent-blue/80" />
                <span>Languages</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl p-2.5 bg-slate-950/20 border border-white/20 hover:border-accent-blue shadow-sm hover:shadow-accent-blue/20 transition-all group">
                  <div className="font-bold text-sm text-white group-hover:text-accent-blue transition-colors font-outfit">Khmer</div>
                  <div className="text-xs text-slate-400 font-inter">Native</div>
                </div>
                <div className="rounded-xl p-2.5 bg-slate-950/20 border border-white/20 hover:border-accent-blue shadow-sm hover:shadow-accent-blue/20 transition-all group">
                  <div className="font-bold text-sm text-white group-hover:text-accent-blue transition-colors font-outfit">English</div>
                  <div className="text-xs text-slate-400 font-inter">Professional</div>
                </div>
              </div>
            </div>

            {/* Soft Skills Mini Boxes Grid (Education Box Background) */}
            <div className="w-full">
              <div className="flex items-center gap-2 text-xs font-bold text-accent-blue/80 uppercase tracking-[0.25em] mb-2 font-outfit">
                <User size={13} className="text-accent-blue/80" />
                <span>Soft Skills</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/20 border border-white/20 hover:border-accent-blue shadow-sm hover:shadow-accent-blue/20 transition-all group">
                  <div className="w-6 h-6 rounded-md bg-white/5 border border-white/20 flex items-center justify-center text-accent-blue shrink-0 shadow-inner group-hover:border-accent-blue/60 group-hover:shadow-[0_0_12px_rgba(96,165,250,0.3)] transition-all">
                    <Users size={12} />
                  </div>
                  <span className="text-xs font-bold text-white group-hover:text-accent-blue transition-colors font-outfit">Teamwork</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/20 border border-white/20 hover:border-accent-blue shadow-sm hover:shadow-accent-blue/20 transition-all group">
                  <div className="w-6 h-6 rounded-md bg-white/5 border border-white/20 flex items-center justify-center text-accent-blue shrink-0 shadow-inner group-hover:border-accent-blue/60 group-hover:shadow-[0_0_12px_rgba(96,165,250,0.3)] transition-all">
                    <Lightbulb size={12} />
                  </div>
                  <span className="text-xs font-bold text-white group-hover:text-accent-blue transition-colors font-outfit">Problem Solving</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/20 border border-white/20 hover:border-accent-blue shadow-sm hover:shadow-accent-blue/20 transition-all group">
                  <div className="w-6 h-6 rounded-md bg-white/5 border border-white/20 flex items-center justify-center text-accent-blue shrink-0 shadow-inner group-hover:border-accent-blue/60 group-hover:shadow-[0_0_12px_rgba(96,165,250,0.3)] transition-all">
                    <CheckCircle2 size={12} />
                  </div>
                  <span className="text-xs font-bold text-white group-hover:text-accent-blue transition-colors font-outfit">Responsible</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/20 border border-white/20 hover:border-accent-blue shadow-sm hover:shadow-accent-blue/20 transition-all group">
                  <div className="w-6 h-6 rounded-md bg-white/5 border border-white/20 flex items-center justify-center text-accent-blue shrink-0 shadow-inner group-hover:border-accent-blue/60 group-hover:shadow-[0_0_12px_rgba(96,165,250,0.3)] transition-all">
                    <MessageSquare size={12} />
                  </div>
                  <span className="text-xs font-bold text-white group-hover:text-accent-blue transition-colors font-outfit">Communication</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Bio & Actions (Unboxed Column) */}
          <div className="lg:col-span-8 flex flex-col justify-center">

            {/* Schedule a Call Button */}
            <div className="mb-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl bg-[#4185DB] hover:bg-[#3273c5] border border-[#4185DB] text-xs font-bold text-white transition-all duration-300 group/btn cursor-pointer font-outfit uppercase tracking-wider shadow-md shadow-[#4185DB]/25 hover:shadow-lg hover:shadow-[#4185DB]/40 active:scale-[0.98] w-fit"
              >
                <Calendar size={13} className="stroke-[2.5]" />
                <span>Schedule a call</span>
                <ExternalLink size={12} className="stroke-[2.5]" />
              </Link>
            </div>

            {/* Main Name Heading */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2 font-outfit">
              Chen <span className="text-accent-blue">Sreyneat</span>
            </h3>

            {/* Role Subtitle */}
            <p className="text-accent-blue text-sm sm:text-base font-bold uppercase tracking-wider font-outfit mb-5">
              Information Technology Engineering Graduate • Digital Marketing &amp; Designer
            </p>

            {/* Social and Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {/* Download CV */}
              <a
                href="/image/CV_Chen_Sreyneat.pdf"
                download="CV_Chen_Sreyneat.pdf"
                className="py-1.5 px-3 rounded-xl bg-[#4185DB] hover:bg-[#3273c5] border border-[#4185DB] text-xs font-bold text-white transition-all duration-300 inline-flex items-center gap-2 font-outfit uppercase tracking-wider shadow-md shadow-[#4185DB]/25 hover:shadow-lg hover:shadow-[#4185DB]/40 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Download size={14} className="stroke-[2.5]" />
                <span>Download CV</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-950/20 border border-white/20 hover:border-accent-blue hover:bg-accent-blue/10 text-xs font-bold text-white transition-all inline-flex items-center gap-2 font-outfit hover:scale-105 active:scale-95 shadow-sm hover:shadow-accent-blue/20"
              >
                <FaGithub size={14} className="text-white/90" />
                <span>GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/chen-sreyneat-749654313/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-950/20 border border-white/20 hover:border-accent-blue hover:bg-accent-blue/10 text-xs font-bold text-white transition-all inline-flex items-center gap-2 font-outfit hover:scale-105 active:scale-95 shadow-sm hover:shadow-accent-blue/20"
              >
                <FaLinkedin size={14} className="text-[#0a66c2]" />
                <span>LinkedIn</span>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-950/20 border border-white/20 hover:border-accent-blue hover:bg-accent-blue/10 text-xs font-bold text-white transition-all inline-flex items-center gap-2 font-outfit hover:scale-105 active:scale-95 shadow-sm hover:shadow-accent-blue/20"
              >
                <FaFacebook size={14} className="text-[#1877f2]" />
                <span>Facebook</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-950/20 border border-white/20 hover:border-accent-blue hover:bg-accent-blue/10 text-xs font-bold text-white transition-all inline-flex items-center gap-2 font-outfit hover:scale-105 active:scale-95 shadow-sm hover:shadow-accent-blue/20"
              >
                <FaInstagram size={14} className="text-[#e4405f]" />
                <span>Instagram</span>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/Neat198"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-950/20 border border-white/20 hover:border-accent-blue hover:bg-accent-blue/10 text-xs font-bold text-white transition-all inline-flex items-center gap-2 font-outfit hover:scale-105 active:scale-95 shadow-sm hover:shadow-accent-blue/20"
              >
                <FaTelegram size={14} className="text-[#229ed9]" />
                <span>Telegram</span>
              </a>

              {/* Email */}
              <a
                href="mailto:chensreyneat198@gmail.com"
                className="px-3 py-1.5 rounded-xl bg-slate-950/20 border border-white/20 hover:border-accent-blue hover:bg-accent-blue/10 text-xs font-bold text-white transition-all inline-flex items-center gap-2 font-outfit hover:scale-105 active:scale-95 shadow-sm hover:shadow-accent-blue/20"
              >
                <Mail size={14} className="text-[#ea4335]" />
                <span>Email</span>
              </a>
            </div>

            {/* Bio Paragraphs */}
            <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed font-semibold font-inter">
              <p>
                I am a Digital Marketing and Designer with a passion for creating engaging content, eye-catching visuals, and meaningful digital experiences. I enjoy combining creativity with technology to help businesses build their online presence and connect with their audience.
              </p>
              <p>
                As an Information Technology Engineering graduate from the Royal University of Phnom Penh, I combine technical knowledge with creative design and digital marketing skills to create compelling content, strengthen brand identity, and deliver effective digital solutions. I am always eager to learn new trends, improve my skills, and contribute to projects that make a positive impact.
              </p>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
