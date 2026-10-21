"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, User, Briefcase, Mail, Menu, X, Download, Flower2, Layers, GraduationCap } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/#about", icon: User },
    { name: "Education", href: "/#education", icon: GraduationCap },
    { name: "Work Experience", href: "/#experience", icon: Briefcase },
    { name: "Projects", href: "/#projects", icon: Layers },
    { name: "Contact", href: "/#contact", icon: Mail },
  ];

  const desktopLinks = navLinks.filter(link =>
    ["About", "Education", "Work Experience", "Projects", "Contact"].includes(link.name)
  );

  return (
    <nav className="navbar w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20 nav-container">
        <div className="logo">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-accent-blue group-hover:rotate-12 transition-transform duration-500">
              <Flower2 size={28} />
            </div>
            <span className="text-lg font-bold tracking-tight text-logo-color hidden sm:block">Sreyneat<span className="text-accent-blue">.</span></span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <ul className="nav-links flex items-center gap-4 xl:gap-6">
            {desktopLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors duration-300 whitespace-nowrap">
                  <link.icon size={13} className="text-accent-blue/60 transition-colors" /> {link.name}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/image/CV_Chen_Sreyneat.pdf"
                download
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-linear-to-r from-[#2c53a6] to-[#60a5fa] hover:from-[#214185] hover:to-[#4fa1ff] text-white font-bold text-xs transition-all duration-300 active:scale-95 shadow-md shadow-blue-500/5 cursor-pointer"
              >
                <Download size={12} className="stroke-[2.5]" /> CV
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center">
          <button
            className="bg-transparent border-none text-text-primary cursor-pointer p-1 transition-transform active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 m-2 mt-4 border backdrop-blur-xl rounded-2xl lg:hidden z-50 shadow-2xl transition-colors duration-300"
          style={{
            backgroundColor: 'var(--dropdown-bg)',
            borderColor: 'var(--dropdown-border)'
          }}
        >
          <ul className="list-none p-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-sm font-medium hover:scale-[1.02] active:scale-95 transition-all"
                  style={{ color: 'var(--dropdown-text)' }}
                >
                  <link.icon
                    size={18}
                    style={{ color: 'var(--dropdown-icon)' }}
                  />
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-4 border-t" style={{ borderColor: 'var(--dropdown-border)' }}>
              <a
                href="/image/CV_Chen_Sreyneat.pdf"
                download
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-sm font-bold hover:scale-[1.02] active:scale-95 transition-all"
                style={{ color: 'var(--dropdown-icon)' }}
              >
                <Download size={18} /> Download CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
