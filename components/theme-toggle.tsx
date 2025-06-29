"use client";

import { useTheme } from "@/context/theme-context";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle fixed bottom-5 right-5 bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white/40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950 z-[9999] !important"
      onClick={toggleTheme}
      style={{ zIndex: 9999 }}
    >
      {theme === "light" ? (
        <BsSun className="text-gray-950 dark:text-gray-100" />
      ) : (
        <BsMoon className="text-gray-950 dark:text-gray-100" />
      )}
    </button>
  );
} 