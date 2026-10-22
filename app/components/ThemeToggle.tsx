"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => {
      setMounted(true);
      const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
      let activeTheme: "dark" | "light" = "dark";
      if (savedTheme) {
        activeTheme = savedTheme;
      }
      setTheme(activeTheme);
      document.documentElement.setAttribute("data-theme", activeTheme);
      document.documentElement.classList.toggle("dark", activeTheme === "dark");
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    return (
      <div className="w-[85px] h-[32px] rounded-full bg-white/5 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-outline px-4 py-1.5 text-xs rounded-full flex items-center gap-2 active:scale-95 transition-transform"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
