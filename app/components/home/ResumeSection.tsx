"use client";

import { Download, FileText, Mail, MapPin, GraduationCap, Briefcase } from "lucide-react";

export default function ResumeSection() {
  return (
    <section id="resume" className="py-24 relative overflow-hidden bg-transparent">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-accent-blue/50" />
          <span className="text-accent-blue font-bold uppercase tracking-[0.4em] text-[0.6rem]">Credentials</span>
          <div className="w-8 h-[1px] bg-accent-blue/50" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-4">
          Resume & <span className="text-gradient-accent">CV</span>
        </h2>
        <p className="text-text-secondary text-base md:text-lg max-w-2xl">
          Get a comprehensive overview of my professional background, education, and technical expertise.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-glass-bg border border-glass-border rounded-[2rem] p-8 md:p-12 backdrop-blur-xl relative overflow-hidden group hover:border-accent-blue/30 transition-all duration-500 shadow-2xl">
          {/* Top border animation glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left: simulated CV mockup */}
            <div className="border border-glass-border rounded-2xl p-6 bg-slate-950/40 relative overflow-hidden shadow-xs order-2 md:order-1">
              {/* Paper CV design preview */}
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-glass-border pb-4">
                  <div>
                    <h4 className="text-base font-bold text-text-primary mb-0.5">Chen Sreyneat</h4>
                    <p className="text-[0.6rem] text-accent-blue font-semibold uppercase tracking-wider">ITE & Software Developer</p>
                  </div>
                  <div className="text-right text-[0.55rem] text-text-secondary space-y-0.5">
                    <p className="flex items-center justify-end gap-1"><MapPin size={8} /> Phnom Penh</p>
                    <p className="flex items-center justify-end gap-1"><Mail size={8} /> chensreyneat198@gmail.com</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h5 className="text-[0.65rem] font-bold text-accent-blue uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <GraduationCap size={10} /> Education
                    </h5>
                    <div className="pl-3 border-l border-glass-border space-y-1">
                      <p className="text-[0.6rem] font-bold text-text-primary">Royal University of Phnom Penh</p>
                      <p className="text-[0.55rem] text-text-secondary">Information Technology Engineering • 2022 - Present</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[0.65rem] font-bold text-accent-blue uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Briefcase size={10} /> Experience
                    </h5>
                    <div className="pl-3 border-l border-glass-border space-y-1">
                      <p className="text-[0.6rem] font-bold text-text-primary">Graphic Designer</p>
                      <p className="text-[0.55rem] text-text-secondary">SROLANH Smart Store • 2022 - 2023</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[0.65rem] font-bold text-accent-blue uppercase tracking-wider mb-1">
                      Key Highlights
                    </h5>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {["Next.js", "React", "TypeScript", "UI/UX Design", "Figma"].map((t) => (
                        <span key={t} className="text-[0.5rem] bg-glass-bg border border-glass-border px-1.5 py-0.5 rounded text-text-secondary">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlay glow/gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Right: details & CTA */}
            <div className="space-y-6 text-left order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-bold w-fit">
                <FileText size={14} /> Ready to Print
              </div>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                Curriculum Vitae
              </h3>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                My resume provides a detailed review of my engineering projects, design expertise, soft skills, and academic accomplishments at the Royal University of Phnom Penh.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="/image/CV_Chen_Sreyneat.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-[#2c53a6] to-[#60a5fa] hover:from-[#214185] hover:to-[#4fa1ff] text-white font-bold text-sm transition-all duration-300 active:scale-95 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 cursor-pointer"
                >
                  <Download size={16} className="stroke-[2.5]" /> Download CV
                </a>
                <a
                  href="/image/CV_Chen_Sreyneat.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-glass-bg border border-glass-border hover:bg-glass-bg/20 text-text-secondary hover:text-white font-bold text-sm transition-all duration-300 cursor-pointer"
                >
                  View Fullscreen
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
