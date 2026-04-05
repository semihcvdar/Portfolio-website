"use client";

import { useMemo } from "react";
import { useLanguage } from "@/context/language-context";
import { usePortfolio } from "@/context/portfolio-context";
import { translations } from "@/lib/translations";

export function useSiteTranslations() {
  const { language } = useLanguage();
  const { data } = usePortfolio();

  return useMemo(() => {
    const base = translations[language];
    const over = data.copy?.[language];
    if (!over) return base;
    return { ...base, ...over };
  }, [language, data.copy]);
}
