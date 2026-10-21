"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  type: "flare" | "bokeh" | "dust";
  color: string;
}

export default function InBoxLightBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const colors = [
      { r: 56, g: 189, b: 248 },   // Cyan #38BDF8
      { r: 0, g: 240, b: 255 },    // Neon Cyan
      { r: 96, g: 165, b: 250 },   // Light Blue #60A5FA
      { r: 147, g: 197, b: 253 },  // Pale Ice Blue
      { r: 255, g: 255, b: 255 },  // Pure White
    ];

    const particleCount = 45;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorObj = colors[Math.floor(Math.random() * colors.length)];
      const randType = Math.random();
      let type: "flare" | "bokeh" | "dust" = "dust";
      let size = Math.random() * 1.5 + 0.8;
      let baseAlpha = Math.random() * 0.6 + 0.3;

      if (randType > 0.82) {
        type = "flare";
        size = Math.random() * 2.2 + 2.0;
        baseAlpha = Math.random() * 0.4 + 0.6;
      } else if (randType > 0.65) {
        type = "bokeh";
        size = Math.random() * 7 + 3;
        baseAlpha = Math.random() * 0.2 + 0.1;
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.25,
        size,
        baseAlpha,
        twinkleSpeed: Math.random() * 0.03 + 0.015,
        phase: Math.random() * Math.PI * 2,
        type,
        color: `${colorObj.r}, ${colorObj.g}, ${colorObj.b}`,
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
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
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const pulse = Math.sin(time * p.twinkleSpeed + p.phase);
        const currentAlpha = Math.max(0.05, Math.min(1, p.baseAlpha + pulse * 0.35));

        if (p.type === "flare") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          ctx.shadowColor = `rgb(${p.color})`;
          ctx.shadowBlur = p.size * 5;
          ctx.fill();

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
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${currentAlpha * 0.5})`;
          ctx.shadowColor = `rgb(${p.color})`;
          ctx.shadowBlur = p.size * 2;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
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
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-b-2xl">
      {/* 1. Background Grid inside modal box */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d70a214_1px,transparent_1px),linear-gradient(to_bottom,#1d70a214_1px,transparent_1px)] bg-[size:32px_32px] opacity-75" />

      {/* 2. Central Luminous Ambient Glow directly behind the certificate image */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] md:w-[900px] h-[400px] md:h-[550px] rounded-full opacity-65 blur-[85px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.48) 0%, rgba(37, 99, 235, 0.32) 38%, rgba(14, 30, 95, 0.12) 68%, transparent 82%)",
        }}
      />

      {/* 3. Left Luminous Flare Cluster */}
      <div 
        className="absolute top-1/2 left-[10%] -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[480px] h-[260px] md:h-[380px] rounded-full opacity-55 blur-[70px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.5) 0%, rgba(37, 99, 235, 0.25) 45%, transparent 75%)",
        }}
      />

      {/* 4. Right Luminous Flare Cluster */}
      <div 
        className="absolute top-1/2 right-[10%] translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[480px] h-[260px] md:h-[380px] rounded-full opacity-55 blur-[70px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.5) 0%, rgba(37, 99, 235, 0.25) 45%, transparent 75%)",
        }}
      />

      {/* 5. Particle canvas with twinkling stars and drifting stardust */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
