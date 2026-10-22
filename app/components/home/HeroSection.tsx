"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="home"
      className="min-h-[calc(100dvh-5rem)] flex flex-col justify-center items-center text-center py-8 sm:py-12 md:py-20 relative overflow-hidden snap-start scroll-mt-20"
    >
      {/* Ambient Cosmic Radial Light Glow matching reference image & background light */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[850px] h-[320px] sm:h-[450px] md:h-[550px] rounded-full opacity-35 blur-[80px] sm:blur-[120px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.45) 0%, rgba(37, 99, 235, 0.25) 45%, rgba(1, 4, 19, 0) 75%)"
        }}
      />

      {/* Decorative ambient subtle light arcs (matching reference image) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[95vw] max-w-[1000px] h-[250px] md:h-[450px] rounded-full border border-sky-400/10 opacity-40 blur-xs" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[85vw] max-w-[800px] h-[200px] md:h-[360px] rounded-full border border-blue-500/10 opacity-30 blur-xs" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl mx-auto px-2 sm:px-4 flex flex-col items-center relative z-10"
      >
        {/* Top Status Badge Pill */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-slate-900/70 border border-white/20 backdrop-blur-md shadow-xs hover:border-accent-blue/50 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-200 font-outfit uppercase tracking-[0.16em] sm:tracking-[0.2em]">
              Available for Hire <span className="text-slate-400 mx-1">•</span> Portfolio 2026
            </span>
          </div>
        </motion.div>

        {/* Main Impact Headline matching letter font & gradient from reference */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight leading-[1.12] sm:leading-[1.08] font-outfit mb-4 sm:mb-6 text-center px-1"
        >
          Crafting engaging visuals &amp;{" "}
          <span className="bg-linear-to-r from-[#0080ff] via-[#38bdf8] to-[#a855f7] bg-clip-text text-transparent font-black">
            digital experiences.
          </span>
        </motion.h1>

        {/* Subtitle Tailored to Chen Sreyneat's Profile */}
        <motion.p
          variants={itemVariants}
          className="text-slate-200 text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-2xl mx-auto font-inter mb-8 sm:mb-10 text-center px-2"
        >
          Combining IT engineering foundations with creative design and digital marketing.
          I build high-impact visuals, strengthen brand identity, and deliver digital solutions that connect.
        </motion.p>

        {/* Action Buttons Row with User Signature Blue Theme - Equal side-by-side on responsive screens */}
        <motion.div
          variants={itemVariants}
          className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-sm sm:max-w-none mx-auto mb-10 sm:mb-14 px-2"
        >
          {/* Primary CTA: View My Work */}
          <Link
            href="#projects"
            className="flex-1 sm:flex-initial group inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-4 sm:px-7 py-3 rounded-full bg-linear-to-r from-[#214185] via-[#4185DB] to-[#60a5fa] hover:from-[#1b3469] hover:to-[#3273c5] border border-[#4185DB]/50 text-white font-bold text-xs sm:text-sm font-outfit tracking-wide transition-all duration-300 shadow-lg shadow-[#4185DB]/25 hover:shadow-xl hover:shadow-[#4185DB]/35 cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap text-center"
          >
            <span>View My Work</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>

          {/* Secondary CTA: Learn More */}
          <Link
            href="#about"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-7 py-3 rounded-full bg-[#4185DB]/15 hover:bg-[#4185DB] border border-[#4185DB]/40 hover:border-[#4185DB] text-[#4185DB] hover:text-white font-bold text-xs sm:text-sm font-outfit tracking-wide transition-all duration-300 shadow-md shadow-[#4185DB]/10 hover:shadow-lg hover:shadow-[#4185DB]/20 cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap text-center"
          >
            <span>Learn More</span>
          </Link>
        </motion.div>

        {/* Bottom Credibility Highlights Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-slate-300 font-outfit px-2"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            <span>IT Engineering Graduate</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            <span>4-Year Full Scholarship</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            <span>Digital Marketing &amp; Design</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Rotating "LET'S TALK" Badge (Bottom Right on Tablet/Desktop) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="hidden md:block absolute right-4 lg:right-8 bottom-4 z-20"
      >
        <Link
          href="#contact"
          className="group relative block w-24 h-24 lg:w-28 lg:h-28 rounded-full cursor-pointer transition-transform duration-300 hover:scale-105"
          aria-label="Let's Talk - Contact Chen Sreyneat"
        >
          {/* Circular Rotating SVG Text */}
          <svg
            className="w-full h-full animate-[spin_12s_linear_infinite] group-hover:[animation-play-state:paused]"
            viewBox="0 0 120 120"
          >
            <defs>
              <path
                id="heroRotatingTextPath"
                d="M 60, 60 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
              />
            </defs>
            <text className="text-[9.5px] uppercase tracking-[0.24em] fill-slate-300 group-hover:fill-accent-blue font-bold font-outfit transition-colors">
              <textPath href="#heroRotatingTextPath" startOffset="0%">
                • LET&apos;S TALK • GET IN TOUCH •
              </textPath>
            </text>
          </svg>

          {/* Center Profile Avatar */}
          <div className="absolute inset-0 m-auto w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden border-2 border-accent-blue/60 group-hover:border-accent-blue shadow-md transition-all">
            <Image
              src="/image/1.png"
              alt="Chen Sreyneat"
              fill
              sizes="56px"
              className="object-cover"
              priority
            />
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
