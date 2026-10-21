"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  type: "flare" | "bokeh" | "dust";
  color: string;
}

export default function CosmicLightBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Number of particles based on screen width
    const particleCount = Math.floor(Math.min(Math.max(width / 12, 70), 140));

    // Colors matching reference image: glowing cyan, sky blue, electric royal blue, and pure white
    const colors = [
      { r: 56, g: 189, b: 248 },   // Cyan #38BDF8
      { r: 0, g: 240, b: 255 },    // Neon Cyan
      { r: 96, g: 165, b: 250 },   // Light Blue #60A5FA
      { r: 147, g: 197, b: 253 },  // Pale Ice Blue
      { r: 255, g: 255, b: 255 },  // Pure White
    ];

    const particles: Particle[] = [];

    // Helper to spawn particle biased towards the horizontal mid-belt (matching reference image)
    const createParticle = (): Particle => {
      const colorObj = colors[Math.floor(Math.random() * colors.length)];
      
      // Biased vertical distribution: concentrated in the mid-band (30% to 70% height)
      const yBias = (Math.random() + Math.random()) / 2; // Triangular distribution around 0.5
      const y = height * 0.15 + yBias * height * 0.7;
      const x = Math.random() * width;

      const randType = Math.random();
      let type: "flare" | "bokeh" | "dust" = "dust";
      let size = Math.random() * 1.5 + 0.8;
      let baseAlpha = Math.random() * 0.6 + 0.3;

      if (randType > 0.82) {
        // Sparkling flare star
        type = "flare";
        size = Math.random() * 2.5 + 2.0;
        baseAlpha = Math.random() * 0.4 + 0.6;
      } else if (randType > 0.65) {
        // Soft floating bokeh orb / hexagon
        type = "bokeh";
        size = Math.random() * 8 + 4;
        baseAlpha = Math.random() * 0.2 + 0.1;
      }

      return {
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.35, // gentle horizontal drift
        vy: (Math.random() - 0.5) * 0.25, // gentle vertical drift
        size,
        baseAlpha,
        twinkleSpeed: Math.random() * 0.03 + 0.015,
        phase: Math.random() * Math.PI * 2,
        type,
        color: `${colorObj.r}, ${colorObj.g}, ${colorObj.b}`,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic position drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around horizontally and vertically
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < height * 0.1) p.y = height * 0.9;
        if (p.y > height * 0.9) p.y = height * 0.1;

        // Dynamic twinkle / pulse opacity
        const pulse = Math.sin(time * p.twinkleSpeed + p.phase);
        const currentAlpha = Math.max(0.05, Math.min(1, p.baseAlpha + pulse * 0.35));

        if (p.type === "flare") {
          // 1. Starburst flare: center bright core + soft cross rays
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          ctx.shadowColor = `rgb(${p.color})`;
          ctx.shadowBlur = p.size * 5;
          ctx.fill();

          // 4-point star flare rays
          const rayLen = p.size * 3.5;
          ctx.strokeStyle = `rgba(${p.color}, ${currentAlpha * 0.6})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x - rayLen, p.y);
          ctx.lineTo(p.x + rayLen, p.y);
          ctx.moveTo(p.x, p.y - rayLen);
          ctx.lineTo(p.x, p.y + rayLen);
          ctx.stroke();

          ctx.shadowBlur = 0;
        } else if (p.type === "bokeh") {
          // 2. Soft translucent bokeh orb
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${currentAlpha * 0.5})`;
          ctx.shadowColor = `rgb(${p.color})`;
          ctx.shadowBlur = p.size * 2;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          // 3. Stardust particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
          ctx.shadowColor = `rgb(${p.color})`;
          ctx.shadowBlur = p.size * 3;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
    >
      {/* 1. Central Ambient Luminous Light (Light color at 60% intensity) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1250px] h-[500px] md:h-[750px] rounded-full opacity-60 blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.6) 0%, rgba(37, 99, 235, 0.42) 38%, rgba(14, 30, 95, 0.15) 68%, transparent 80%)",
        }}
      />

      {/* 2. Left Horizontal Light Cluster Flare (Light color at 60% intensity) */}
      <div 
        className="absolute top-1/2 left-[18%] -translate-x-1/2 -translate-y-1/2 w-[450px] md:w-[700px] h-[350px] md:h-[500px] rounded-full opacity-60 blur-[85px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.6) 0%, rgba(37, 99, 235, 0.35) 45%, transparent 75%)",
        }}
      />

      {/* 3. Right Horizontal Light Cluster Flare (Light color at 60% intensity) */}
      <div 
        className="absolute top-1/2 right-[18%] translate-x-1/2 -translate-y-1/2 w-[450px] md:w-[700px] h-[350px] md:h-[500px] rounded-full opacity-60 blur-[85px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.6) 0%, rgba(37, 99, 235, 0.35) 45%, transparent 75%)",
        }}
      />

      {/* 4. Canvas with Animated Glowing Particles & Stardust */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
