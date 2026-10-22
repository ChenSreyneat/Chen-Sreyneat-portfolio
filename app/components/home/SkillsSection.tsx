"use client";

import type React from "react";
import { Code2, Layers, Database, GitBranch, PenTool } from "lucide-react";
import { FaJava } from "react-icons/fa";
import { 
  SiJavascript, SiTypescript, SiCplusplus, SiPhp, 
  SiReact, SiNodedotjs, SiNextdotjs, SiTailwindcss, SiBootstrap, SiHtml5, SiAngular, SiDotnet,
  SiMysql, SiSupabase, SiMongodb, 
  SiGit, SiGithub, SiGitlab, 
  SiFigma, SiCanva 
} from "react-icons/si";
import { TbBrandCSharp, TbBrandAdobePhotoshop } from "react-icons/tb";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "C#", icon: TbBrandCSharp, color: "#239120" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { name: "Java", icon: FaJava, color: "#007396" },
    ]
  },
  {
    title: "Frameworks & Libraries",
    icon: Layers,
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
      { name: "HTML/CSS", icon: SiHtml5, color: "#E34F26" },
      { name: "Angular", icon: SiAngular, color: "#DD0031" },
      { name: ".Net", icon: SiDotnet, color: "#512BD4" },
    ]
  },
  {
    title: "Database & Backend",
    icon: Database,
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ]
  },
  {
    title: "Version Control",
    icon: GitBranch,
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "GitLab", icon: SiGitlab, color: "#FC6D26" },
    ]
  },
  {
    title: "Design Skills",
    icon: PenTool,
    skills: [
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "Canva", icon: SiCanva, color: "#00C4CC" },
      { name: "Photoshop", icon: TbBrandAdobePhotoshop, color: "#31A8FF" },
    ]
  }
];

function SkillBadge({ name, icon: Icon, color }: { name: string; icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>; color: string }) {
  const hoverTextColor = color === "#FFFFFF" ? "var(--text-secondary)" : color;

  return (
    <div 
      style={{ 
        "--brand-color": color,
        "--hover-text-color": hoverTextColor
      } as React.CSSProperties}
      className="skill-badge-hover flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/30 border border-glass-border cursor-default text-xs font-semibold text-text-secondary"
    >
      <Icon 
        size={16} 
        style={{ color: color }} 
        className="transition-transform duration-300 scale-100" 
      />
      <span className="transition-colors duration-300">{name}</span>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="technical-skills" className="py-24 relative overflow-hidden bg-transparent">
      
      {/* Section Header - Matches Projects/Education typography */}
      <div className="flex flex-col items-center text-center mb-16 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-accent-blue/50" />
          <span className="text-accent-blue font-bold uppercase tracking-[0.4em] text-[0.6rem]">Technical Skills</span>
          <div className="w-8 h-[1px] bg-accent-blue/50" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-text-primary max-w-2xl leading-tight">
          My Software and <span className="text-accent-blue">Hardware</span>
        </h2>
      </div>

      <div className="relative w-full z-10 max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div 
              key={idx} 
              className={`group relative flex flex-col justify-between bg-glass-bg border border-glass-border rounded-[2rem] p-6 md:p-8 transition-all duration-300 hover:border-accent-blue/30 hover:-translate-y-1 ${
                idx === 1 ? 'md:col-span-2 lg:col-span-2' : ''
              } ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex flex-col h-full">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-glass-border">
                  <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue border border-accent-blue/20">
                    <category.icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-blue transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>
                
                {/* Skills Badges Grid */}
                <div className="flex flex-wrap gap-3 mt-auto">
                  {category.skills.map((skill, sIdx) => (
                    <SkillBadge 
                      key={sIdx}
                      name={skill.name}
                      icon={skill.icon}
                      color={skill.color}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
