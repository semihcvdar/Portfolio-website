"use client";

import { useLanguage } from "@/context/language-context";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      className="language-toggle fixed top-5 right-5 bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white/40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950 font-semibold text-sm z-[9999] !important"
      onClick={toggleLanguage}
      style={{ zIndex: 9999 }}
    >
      {language === "en" ? "TR" : "EN"}
    </button>
  );
} 