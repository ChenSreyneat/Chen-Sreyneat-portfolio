"use client";
import { useState } from "react";
import { Mail, Phone, MessageSquare, User, Tag, MapPin } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    try {
      const response = await fetch("https://formsubmit.co/ajax/chensreyneat198@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "New Message from Portfolio",
          message: formData.message,
          _captcha: "false"
        })
      });

      const result = await response.json();
      if (response.ok && (result.success === "true" || result.success === true)) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        const msg = String(result?.message || "");
        if (msg.toLowerCase().includes("activation") || msg.toLowerCase().includes("activate")) {
          setErrorMessage("Activation Required: FormSubmit sent an activation email to chensreyneat198@gmail.com. Please check your Gmail (including Spam folder) and tap 'Activate Form'. In the meantime, tap 'Open in Mail App' below to send directly!");
        } else {
          setErrorMessage(msg || "Could not send message automatically. Please tap 'Open in Mail App' or 'Telegram' below.");
        }
        setStatus("error");
        setTimeout(() => setStatus("idle"), 8000);
      }
    } catch {
      setErrorMessage("Network connection issue. Tap 'Open in Mail App' or 'Telegram' below to send directly!");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 8000);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 max-w-6xl mx-auto px-0 sm:px-4 overflow-hidden scroll-mt-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center mb-6 sm:mb-10 md:mb-14 px-4"
      >
        <div className="flex items-center gap-3 mb-2 sm:mb-3">
          <div className="w-8 h-[1px] bg-accent-blue/50" />
          <span className="text-accent-blue font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[0.6rem] font-outfit">Get In Touch</span>
          <div className="w-8 h-[1px] bg-accent-blue/50" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white max-w-2xl leading-tight mb-2 font-outfit">
          Contact <span className="text-accent-blue">Me</span>
        </h2>
        <p className="text-accent-blue text-xs sm:text-sm md:text-base font-bold tracking-tight mb-2 font-outfit uppercase">Let&apos;s get in touch.</p>
        <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-semibold font-inter">
          I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 lg:gap-16 items-start px-4 sm:px-0">
        {/* Contact Info Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 sm:space-y-12 w-full"
        >
          {/* Profile Section */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 mx-auto lg:mx-0 group">
            {/* Theme Accents (Top Left) */}
            <motion.div
              animate={{ rotate: [-45, -40, -45] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 opacity-60 z-0"
            >
              <div className="absolute top-4 left-2 w-6 sm:w-8 h-0.5 bg-accent-light -rotate-45" />
              <div className="absolute top-6 left-4 w-4 sm:w-6 h-0.5 bg-accent-light -rotate-45" />
              <div className="absolute top-8 left-6 w-3 sm:w-4 h-0.5 bg-accent-light -rotate-45" />
            </motion.div>

            {/* Sub-blob Shape (Top Left) */}
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-2 left-0 w-32 sm:w-40 h-40 sm:h-48 bg-accent-mid opacity-90 z-0"
              style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
            >
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(135deg, #fff, #fff 1px, transparent 1px, transparent 12px)',
                  borderRadius: 'inherit'
                }} />
            </motion.div>

            {/* Theme Wavy Line (Behind person) */}
            <motion.svg
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 sm:-right-8 md:-right-12 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 opacity-40 z-0 pointer-events-none"
              viewBox="0 0 200 200"
            >
              <path
                d="M 180,40 C 210,80 180,160 140,180 C 100,200 40,160 60,80 C 70,40 140,20 180,40"
                fill="none"
                stroke="var(--accent-blue)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </motion.svg>

            {/* Main Blue Organic Shape (Centered/Right) */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 sm:top-10 right-0 w-48 sm:w-56 md:w-60 h-48 sm:h-56 md:h-60 bg-accent-blue z-0 shadow-2xl shadow-accent-blue/20"
              style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
            />

            {/* Theme Dots Accent (Bottom Left) */}
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 grid grid-cols-3 gap-1.5 sm:gap-2 opacity-60 z-0"
            >
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-accent-light rounded-full" />
              ))}
            </motion.div>

            {/* Profile Image Container */}
            <div className="relative w-full h-full z-10 overflow-hidden"
              style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}>
              <Image
                src="/image/2.png"
                alt="Profile"
                fill
                className="object-cover scale-110 group-hover:scale-120 transition-transform duration-700"
              />
            </div>

            {/* Glow effect on hover */}
            <div className="absolute -inset-10 bg-blue-500/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
          </div>

          {/* Contact Details */}
          <div className="space-y-3.5 sm:space-y-4 w-full max-w-[280px] sm:max-w-[310px] mx-auto lg:mx-0 flex flex-col items-start">
            <motion.a
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:chensreyneat198@gmail.com"
              className="flex items-center gap-3 sm:gap-4 group cursor-pointer w-full text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center text-accent-blue shadow-inner group-hover:border-accent-blue/80 group-hover:bg-accent-blue/10 group-hover:shadow-[0_0_14px_rgba(96,165,250,0.35)] transition-all shrink-0">
                <Mail size={16} />
              </div>
              <span className="text-slate-200 group-hover:text-white font-semibold text-xs sm:text-sm transition-colors font-inter truncate">chensreyneat198@gmail.com</span>
            </motion.a>
            <motion.a
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              href="tel:+855887514279"
              className="flex items-center gap-3 sm:gap-4 group cursor-pointer w-full text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center text-accent-blue shadow-inner group-hover:border-accent-blue/80 group-hover:bg-accent-blue/10 group-hover:shadow-[0_0_14px_rgba(96,165,250,0.35)] transition-all shrink-0">
                <Phone size={16} />
              </div>
              <span className="text-slate-200 group-hover:text-white font-semibold text-xs sm:text-sm transition-colors font-inter truncate">+855 88 75 14 279</span>
            </motion.a>
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 sm:gap-4 group cursor-default w-full text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center text-accent-blue shadow-inner group-hover:border-accent-blue/80 group-hover:bg-accent-blue/10 group-hover:shadow-[0_0_14px_rgba(96,165,250,0.35)] transition-all shrink-0">
                <MapPin size={16} />
              </div>
              <span className="text-slate-200 group-hover:text-white font-semibold text-xs sm:text-sm transition-colors font-inter truncate">Phnom Penh, Cambodia</span>
            </motion.div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-6 w-full flex flex-col items-center lg:items-start">
            <div className="grid grid-cols-2 gap-3 w-full max-w-[340px] sm:max-w-[420px]">
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="https://t.me/Neat198"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-[40px] rounded-xl bg-[#4185DB] hover:bg-[#3273c5] text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#4185DB]/30 cursor-pointer font-outfit text-xs sm:text-sm font-bold uppercase tracking-wider"
              >
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-[#3b82f6] translate-x-[-0.5px]">
                    <path d="M1.05 11.57c-.73-.23-.69-1.31.06-1.5l20.45-8c.67-.24 1.33.34 1.17 1.03l-4 17.5c-.14.61-.83.89-1.34.53l-5.69-4.13-3.66 3.52c-.36.35-.94.1-.94-.41v-3.79l8.63-8.3c.18-.17-.06-.46-.28-.31L3.9 12.35l-2.85-.78z" />
                  </svg>
                </div>
                <span>Telegram</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="https://www.linkedin.com/in/chen-sreyneat-749654313/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-[40px] rounded-xl bg-slate-950/20 border border-white/20 text-xs sm:text-sm font-bold text-slate-200 hover:border-accent-blue hover:text-white transition-all cursor-pointer font-outfit uppercase tracking-wider shadow-sm"
              >
                <FaLinkedin size={16} className="flex-shrink-0 text-accent-blue" /> <span>LinkedIn</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form Box */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-2xl bg-slate-950/20 border border-white/20 p-5 sm:p-6 md:p-8 hover:border-accent-blue transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-accent-blue/20"
        >
          <form
            className="space-y-5 sm:space-y-6"
            onSubmit={handleSubmit}
          >
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label 
                  htmlFor="contact-name"
                  className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-2 font-outfit cursor-pointer select-none"
                >
                  <User size={14} className="text-accent-blue" /> Full Name
                </label>
                <div className="relative">
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    autoCapitalize="words"
                    enterKeyHint="next"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full min-h-[48px] bg-slate-900/60 hover:bg-slate-900/80 focus:bg-slate-950/90 border border-white/20 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-sm text-white placeholder:text-slate-400 focus:outline-none transition-all font-inter font-medium shadow-inner"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label 
                  htmlFor="contact-email"
                  className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-2 font-outfit cursor-pointer select-none"
                >
                  <Mail size={14} className="text-accent-blue" /> Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  autoCapitalize="none"
                  enterKeyHint="next"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full min-h-[48px] bg-slate-900/60 hover:bg-slate-900/80 focus:bg-slate-950/90 border border-white/20 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-sm text-white placeholder:text-slate-400 focus:outline-none transition-all font-inter font-medium shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label 
                htmlFor="contact-subject"
                className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-2 font-outfit cursor-pointer select-none"
              >
                <Tag size={14} className="text-accent-blue" /> Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                autoComplete="off"
                enterKeyHint="next"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
                className="w-full min-h-[48px] bg-slate-900/60 hover:bg-slate-900/80 focus:bg-slate-950/90 border border-white/20 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-sm text-white placeholder:text-slate-400 focus:outline-none transition-all font-inter font-medium shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label 
                htmlFor="contact-message"
                className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-2 font-outfit cursor-pointer select-none"
              >
                <MessageSquare size={14} className="text-accent-blue" /> Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                autoComplete="off"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or question..."
                required
                rows={4}
                className="w-full bg-slate-900/60 hover:bg-slate-900/80 focus:bg-slate-950/90 border border-white/20 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30 rounded-xl px-4 py-3.5 sm:px-5 sm:py-3.5 text-base sm:text-sm text-white placeholder:text-slate-400 focus:outline-none transition-all min-h-[130px] sm:min-h-[150px] resize-none font-inter font-medium leading-relaxed shadow-inner"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === "sending"}
              className={`w-full py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider font-outfit flex items-center justify-center gap-3 transition-all shadow-md ${status === "success"
                  ? "bg-green-600 text-white shadow-green-500/20"
                  : status === "error"
                    ? "bg-red-600 text-white shadow-red-500/20"
                    : "bg-[#4185DB] hover:bg-[#3273c5] text-white shadow-[#4185DB]/20 hover:shadow-lg hover:shadow-[#4185DB]/30 cursor-pointer"
                }`}
            >
              {status === "sending" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : status === "success" ? (
                <>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                  Message Sent!
                </>
              ) : status === "error" ? (
                <>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">!</div>
                  Error Sending
                </>
              ) : (
                <>
                  <Mail size={18} /> Send Message
                </>
              )}
            </motion.button>

            {/* Error & Activation Guidance Banner with 1-Tap Fallbacks */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-950/50 border border-red-500/40 text-xs sm:text-sm text-red-200 space-y-3 shadow-lg"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-red-500/30 text-red-300 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                    !
                  </div>
                  <p className="leading-relaxed font-inter text-xs sm:text-[13px]">{errorMessage}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-red-500/20">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-red-300/80 font-outfit">
                    Direct Send:
                  </span>
                  <a
                    href={`mailto:chensreyneat198@gmail.com?subject=${encodeURIComponent(
                      formData.subject || "Message from Portfolio"
                    )}&body=${encodeURIComponent(
                      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
                    )}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
                  >
                    <Mail size={13} className="text-accent-blue" /> Open in Mail App
                  </a>
                  <a
                    href={`https://t.me/Neat198?text=${encodeURIComponent(
                      `Hi Sreyneat, my name is ${formData.name || "visitor"} (${formData.email || "no email"}):\n${formData.message}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4185DB]/25 hover:bg-[#4185DB]/40 text-[#60a5fa] hover:text-white font-medium text-xs transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                      <path d="M1.05 11.57c-.73-.23-.69-1.31.06-1.5l20.45-8c.67-.24 1.33.34 1.17 1.03l-4 17.5c-.14.61-.83.89-1.34.53l-5.69-4.13-3.66 3.52c-.36.35-.94.1-.94-.41v-3.79l8.63-8.3c.18-.17-.06-.46-.28-.31L3.9 12.35l-2.85-.78z" />
                    </svg>
                    Telegram
                  </a>
                </div>
              </motion.div>
            )}

            {/* Subtle direct email option */}
            <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-slate-400 font-inter pt-1">
              <span>Or email directly:</span>
              <a
                href="mailto:chensreyneat198@gmail.com"
                className="text-accent-blue hover:text-white underline underline-offset-4 font-semibold transition-colors"
              >
                chensreyneat198@gmail.com
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
