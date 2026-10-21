"use client";

import { motion } from "framer-motion";

export default function ModalLightBackground() {
  const particles = [
    { top: "12%", left: "15%", size: 3, delay: 0, duration: 3.2 },
    { top: "22%", left: "85%", size: 2.5, delay: 0.6, duration: 2.8 },
    { top: "32%", left: "8%", size: 2, delay: 1.2, duration: 3.5 },
    { top: "42%", left: "92%", size: 3.5, delay: 0.3, duration: 2.5 },
    { top: "62%", left: "12%", size: 2.5, delay: 1.8, duration: 3.0 },
    { top: "75%", left: "88%", size: 3, delay: 0.9, duration: 3.8 },
    { top: "85%", left: "20%", size: 2, delay: 1.5, duration: 2.6 },
    { top: "18%", left: "48%", size: 2.5, delay: 2.1, duration: 3.4 },
    { top: "82%", left: "58%", size: 3, delay: 0.7, duration: 2.9 },
    { top: "8%", left: "72%", size: 4, delay: 1.0, duration: 4.0, isFlare: true },
    { top: "92%", left: "28%", size: 3.5, delay: 1.7, duration: 3.6, isFlare: true },
    { top: "52%", left: "96%", size: 2, delay: 0.4, duration: 3.1 },
    { top: "58%", left: "5%", size: 2, delay: 2.3, duration: 2.7 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {/* 1. Central Ambient Luminous Light Flare directly behind modal */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1050px] h-[450px] md:h-[700px] rounded-full opacity-70 blur-[95px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.55) 0%, rgba(37, 99, 235, 0.35) 40%, rgba(14, 30, 95, 0.15) 68%, transparent 82%)",
        }}
      />

      {/* 2. Top-Right Cyan Glow Cluster */}
      <div 
        className="absolute -top-10 right-[5%] w-[380px] md:w-[550px] h-[300px] md:h-[450px] rounded-full opacity-60 blur-[80px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(0, 240, 255, 0.45) 0%, rgba(56, 189, 248, 0.25) 45%, transparent 75%)",
        }}
      />

      {/* 3. Bottom-Left Light Blue Glow Cluster */}
      <div 
        className="absolute -bottom-10 left-[5%] w-[380px] md:w-[550px] h-[300px] md:h-[450px] rounded-full opacity-60 blur-[80px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(96, 165, 250, 0.5) 0%, rgba(37, 99, 235, 0.3) 45%, transparent 75%)",
        }}
      />

      {/* 4. Animated Twinkling Stardust Particles & Starbursts */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, idx) => (
          <motion.div
            key={idx}
            className="absolute pointer-events-none"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              opacity: [0.25, 0.95, 0.25],
              scale: [0.8, 1.35, 0.8],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          >
            <div 
              className="w-full h-full rounded-full bg-white"
              style={{
                boxShadow: "0 0 10px rgba(56, 189, 248, 0.9), 0 0 18px rgba(96, 165, 250, 0.6)"
              }}
            />
            {p.isFlare && (
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-[1px] bg-cyan-300/70 pointer-events-none"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
