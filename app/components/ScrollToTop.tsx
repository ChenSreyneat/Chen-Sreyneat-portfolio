"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top scroll coordinates
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-[90] w-[50px] h-[50px] rounded-full bg-linear-to-br from-accent-purple to-accent-blue text-white flex items-center justify-center border-none cursor-pointer shadow-[0_4px_15px_rgba(139,92,246,0.4)] transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(139,92,246,0.6)] active:scale-95"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  );
}
