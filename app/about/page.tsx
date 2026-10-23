"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ExperienceSection from "../components/home/ExperienceSection";
import { 
  Calendar, 
  ExternalLink, 
  Download, 
  Mail, 
  GraduationCap, 
  MapPin, 
  ChevronLeft,
  Award,
  Globe,
  User,
  Users,
  Lightbulb,
  CheckCircle2,
  MessageSquare,
  Briefcase
} from "lucide-react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaFacebook, 
  FaInstagram, 
  FaTelegram
} from "react-icons/fa";

export default function About() {
  const education = [
    {
      school: "Royal University of Phnom Penh (RUPP)",
      period: "2022 – 2026",
      degree: "Bachelor of Information Technology Engineering",
      location: "Phnom Penh, Cambodia",
      highlight: "Awarded a full 4-year scholarship based on outstanding academic performance."
    },
    {
      school: "High School National Exam (BacII)",
      period: "2022",
      degree: "Upper Secondary Education Diploma (Grade B)",
      location: "Cambodia",
      highlight: "Graduated with Grade B in the BacII (12th grade National Examination)."
    },
    {
      school: "Soramrit High School",
      period: "2019",
      degree: "High School Diploma (1 Year – 9 Years Study)",
      location: "Cambodia",
      highlight: "Completed 9 years of basic general education (Grade 1 to Grade 9) at Soramrit High School."
    }
  ];

  return (
    <div className="relative min-h-screen bg-transparent overflow-hidden pb-24 pt-6">
      {/* Background UI Grid & Ambient Luminous Glow (Matching EducationSection) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d70a208_1px,transparent_1px),linear-gradient(to_bottom,#1d70a208_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[350px] sm:h-[400px] rounded-full opacity-35 blur-[100px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.5) 0%, rgba(37, 99, 235, 0.3) 40%, transparent 75%)"
        }}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Back Link */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-accent-blue transition-colors group font-outfit text-sm font-semibold"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-14 px-4"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-accent-blue/50" />
            <span className="text-accent-blue font-bold uppercase tracking-[0.4em] text-[0.6rem] font-outfit">Get To Know Me</span>
            <div className="w-8 h-[1px] bg-accent-blue/50" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 font-outfit">
            About <span className="text-accent-blue">Me</span>
          </h1>
          <p className="text-slate-200 text-sm md:text-base max-w-2xl font-medium font-inter">
            A glimpse into my background, creative design skills, and practical IT engineering journey.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20"
        >
          
          {/* Left Column: Profile Card Sidebar (Unboxed) */}
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

          {/* Right Column: Bio & Actions (Unboxed) */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            
            {/* Schedule a Call Button (Education Button Background) */}
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2 font-outfit">
              Chen <span className="text-accent-blue">Sreyneat</span>
            </h2>

            {/* Role Subtitle */}
            <p className="text-accent-blue text-sm sm:text-base font-bold uppercase tracking-wider font-outfit mb-5">
              Information Technology Engineering Graduate • Digital Marketing &amp; Designer
            </p>

            {/* Social and Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {/* Download CV */}
              <a
                href="/image/Chen Sreyneat CV.pdf"
                download="Chen Sreyneat CV.pdf"
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

        {/* Education Section */}
        <div className="pt-10 border-t border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center text-accent-blue shadow-inner">
              <GraduationCap size={22} className="stroke-[2.2]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">
              Education
            </h2>
          </div>

          <div className="relative border-l-2 border-slate-800 pl-6 ml-2 space-y-8">
            {education.map((edu, idx) => (
              <div key={idx} className="relative">
                {/* Blue Dot */}
                <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent-blue ring-4 ring-slate-950" />

                {/* School & Date Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h3 className="text-base sm:text-lg font-bold text-white font-outfit">
                    {edu.school}
                  </h3>
                  <span className="text-accent-blue font-bold text-xs sm:text-sm font-outfit shrink-0">
                    {edu.period}
                  </span>
                </div>

                {/* Degree */}
                <p className="text-accent-blue font-semibold text-sm font-outfit mb-1.5">
                  {edu.degree}
                </p>

                {/* Highlight */}
                <p className="text-xs sm:text-sm text-slate-300 font-inter flex items-start gap-1.5 font-medium">
                  <Award size={14} className="text-accent-blue mt-0.5 shrink-0" />
                  <span>{edu.highlight}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="pt-10 border-t border-white/10 mt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center text-accent-blue shadow-inner">
              <Briefcase size={22} className="stroke-[2.2]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">
              Work Experience
            </h2>
          </div>

          <ExperienceSection hideHeader={true} />
        </div>

      </main>
    </div>
  );
}
