"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  FileText, 
  Search, 
  X, 
  ArrowRight, 
  ExternalLink, 
  Check, 
  Copy, 
  Download, 
  Mail, 
  Home, 
  User, 
  GraduationCap, 
  Briefcase, 
  Layers, 
  Award,
  Send
} from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook, FaTelegram } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const router = useRouter();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const closeCommandPalette = useCallback(() => {
    setIsCommandOpen(false);
    setSearchQuery("");
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K & Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => {
          if (prev) {
            setSearchQuery("");
            return false;
          }
          return true;
        });
      } else if (e.key === "Escape") {
        closeCommandPalette();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeCommandPalette]);

  // Lock body scroll when Command Palette is open
  useEffect(() => {
    if (isCommandOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isCommandOpen]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("chensreyneat198@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleNavigate = (href: string) => {
    closeCommandPalette();
    if (href.startsWith("http") || href.endsWith(".pdf")) {
      window.open(href, "_blank");
    } else {
      router.push(href);
    }
  };

  const navigationItems = [
    { name: "Home", href: "/", icon: Home, category: "Navigation" },
    { name: "About Me", href: "/#about", icon: User, category: "Navigation" },
    { name: "Education", href: "/#education", icon: GraduationCap, category: "Navigation" },
    { name: "Work Experience", href: "/#experience", icon: Briefcase, category: "Navigation" },
    { name: "Projects", href: "/#projects", icon: Layers, category: "Navigation" },
    { name: "Certificates", href: "/#certificates", icon: Award, category: "Navigation" },
    { name: "Contact Me", href: "/#contact", icon: Mail, category: "Navigation" },
  ];

  const actionItems = [
    {
      name: "Download CV (PDF)",
      description: "Get Chen Sreyneat's official resume",
      icon: Download,
      action: () => {
        closeCommandPalette();
        const link = document.createElement("a");
        link.href = "/image/Chen Sreyneat CV.pdf";
        link.download = "Chen Sreyneat CV.pdf";
        link.click();
      },
      category: "Actions",
    },
    {
      name: "Copy Email Address",
      description: "chensreyneat198@gmail.com",
      icon: copiedEmail ? Check : Copy,
      action: handleCopyEmail,
      category: "Actions",
    },
    {
      name: "Send Direct Email",
      description: "Open in Gmail or default mail app",
      icon: Send,
      action: () => {
        closeCommandPalette();
        window.open("https://mail.google.com/mail/?view=cm&fs=1&to=chensreyneat198@gmail.com", "_blank");
      },
      category: "Actions",
    },
    {
      name: "Telegram Message",
      description: "@Neat198",
      icon: FaTelegram,
      action: () => {
        closeCommandPalette();
        window.open("https://t.me/Neat198", "_blank");
      },
      category: "Social & Contact",
    },
    {
      name: "GitHub Profile",
      description: "View source code and repositories",
      icon: FaGithub,
      action: () => {
        closeCommandPalette();
        window.open("https://github.com/", "_blank");
      },
      category: "Social & Contact",
    },
    {
      name: "LinkedIn Profile",
      description: "Connect professionally on LinkedIn",
      icon: FaLinkedin,
      action: () => {
        closeCommandPalette();
        window.open("https://www.linkedin.com/in/chen-sreyneat-749654313/", "_blank");
      },
      category: "Social & Contact",
    },
    {
      name: "Facebook Profile",
      description: "Follow on Facebook",
      icon: FaFacebook,
      action: () => {
        closeCommandPalette();
        window.open("https://facebook.com/", "_blank");
      },
      category: "Social & Contact",
    },
  ];

  const filteredNav = navigationItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredActions = actionItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <footer className="w-full border-t border-white/[0.08] bg-[#020617]/90 backdrop-blur-xl py-3 sm:py-3.5 relative z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-inter select-none">
          
          {/* Left Metadata / Profile Info */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-1.5 gap-y-1 text-slate-400 text-xs sm:text-[13px] leading-relaxed">
            <span>&copy; {new Date().getFullYear()} /</span>
            <span className="font-bold text-white tracking-tight">Chen Sreyneat</span>
            <span>/</span>
            <span className="text-slate-300">Digital Marketing &amp; Designer</span>
          </div>

          {/* Right Action / Commands & Social Icons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Command Palette Button */}
            <button
              type="button"
              onClick={() => setIsCommandOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-accent-blue/40 text-slate-300 hover:text-white transition-all text-xs font-medium cursor-pointer shadow-xs active:scale-95 group"
              title="Open Command Palette (⌘K or Ctrl+K)"
              aria-label="Open Commands"
            >
              <span className="inline-flex items-center justify-center font-mono text-[10px] text-slate-400 group-hover:text-white px-1 py-0.5 rounded bg-white/[0.06] border border-white/10">
                ⌘K
              </span>
              <span className="font-outfit text-slate-200 group-hover:text-white font-medium text-[12px]">
                Commands
              </span>
            </button>

            {/* Vertical Divider */}
            <div className="w-[1px] h-3.5 bg-white/20 mx-0.5" />

            {/* Social & Document Icons */}
            <div className="flex items-center gap-1">
              {/* Document / CV Link */}
              <a
                href="/image/Chen Sreyneat CV.pdf"
                download="Chen Sreyneat CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="Download CV (Chen Sreyneat)"
                className="p-1.5 text-sky-400 hover:text-sky-300 hover:scale-110 active:scale-95 transition-all"
                aria-label="Download CV"
              >
                <FileText size={16} className="stroke-[2.2]" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                className="p-1.5 text-slate-300 hover:text-white hover:scale-110 active:scale-95 transition-all"
                aria-label="GitHub Profile"
              >
                <FaGithub size={16} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/chen-sreyneat-749654313/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                className="p-1.5 text-[#0a66c2] hover:text-[#388bfd] hover:scale-110 active:scale-95 transition-all"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={16} />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook Profile"
                className="p-1.5 text-[#1877f2] hover:text-[#4294ff] hover:scale-110 active:scale-95 transition-all"
                aria-label="Facebook Profile"
              >
                <FaFacebook size={16} />
              </a>
            </div>

          </div>

        </div>
      </footer>

      {/* Modern Interactive Command Palette Modal */}
      <AnimatePresence>
        {isCommandOpen && (
          <div className="fixed inset-0 z-[2000] flex items-start justify-center pt-20 sm:pt-28 px-4 overscroll-contain touch-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCommandPalette}
              className="fixed inset-0 bg-black/75 backdrop-blur-md touch-none"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-xl bg-[#030712]/95 border border-white/15 rounded-2xl shadow-[0_0_50px_rgba(56,189,248,0.2)] overflow-hidden flex flex-col z-10 backdrop-blur-2xl overscroll-contain touch-auto"
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
                <Search size={18} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent text-white placeholder-slate-400 text-sm font-outfit outline-none"
                />
                <button
                  type="button"
                  onClick={closeCommandPalette}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close command palette"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Commands List */}
              <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4 font-inter text-xs">
                {/* Navigation Items */}
                {filteredNav.length > 0 && (
                  <div>
                    <div className="px-3 py-1.5 text-[11px] font-bold text-accent-blue uppercase tracking-wider font-outfit">
                      Navigation
                    </div>
                    <div className="space-y-0.5">
                      {filteredNav.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleNavigate(item.href)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.07] transition-all group text-left cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 group-hover:text-accent-blue group-hover:border-accent-blue/30 transition-colors">
                                <Icon size={14} />
                              </div>
                              <span className="font-medium text-sm font-outfit text-white group-hover:text-accent-blue transition-colors">
                                {item.name}
                              </span>
                            </div>
                            <ArrowRight size={13} className="text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Actions & Contact */}
                {filteredActions.length > 0 && (
                  <div>
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-outfit">
                      Actions &amp; Social
                    </div>
                    <div className="space-y-0.5">
                      {filteredActions.map((action, idx) => {
                        const Icon = action.icon;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={action.action}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.07] transition-all group text-left cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 group-hover:text-accent-blue group-hover:border-accent-blue/30 transition-colors">
                                <Icon size={14} />
                              </div>
                              <div>
                                <p className="font-medium text-sm font-outfit text-white group-hover:text-accent-blue transition-colors">
                                  {action.name}
                                </p>
                                {action.description && (
                                  <p className="text-[11px] text-slate-400 font-inter">
                                    {action.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            <ExternalLink size={13} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {filteredNav.length === 0 && filteredActions.length === 0 && (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    No results found for &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>

              {/* Footer status bar in command palette */}
              <div className="px-4 py-2 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-inter">
                <span>Chen Sreyneat Portfolio</span>
                <div className="flex items-center gap-3 font-mono">
                  <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">ESC</kbd> to close</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
