"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "tr";

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    if (language === "en") {
      setLanguage("tr");
      if (typeof window !== "undefined") {
        window.localStorage.setItem("language", "tr");
      }
    } else {
      setLanguage("en");
      if (typeof window !== "undefined") {
        window.localStorage.setItem("language", "en");
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localLanguage = window.localStorage.getItem("language") as Language | null;
      if (localLanguage) {
        setLanguage(localLanguage);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageContextProvider");
  }

  return context;
} 