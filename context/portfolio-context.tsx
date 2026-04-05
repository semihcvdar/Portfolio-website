"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { PortfolioData } from "@/lib/portfolio-types";
import { parsePortfolioData } from "@/lib/portfolio-parse";
import bundledRaw from "@/data/portfolio.json";

const parsedBundled = parsePortfolioData(bundledRaw);
if (!parsedBundled) {
  throw new Error("data/portfolio.json geçersiz");
}
const bundled: PortfolioData = parsedBundled;

type PortfolioContextValue = {
  data: PortfolioData;
  loading: boolean;
  refresh: () => Promise<void>;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(bundled);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/portfolio", { cache: "no-store" });
    if (!res.ok) return;
    const json: unknown = await res.json();
    const parsed = parsePortfolioData(json);
    if (parsed) setData(parsed);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      await refresh();
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  return (
    <PortfolioContext.Provider value={{ data, loading, refresh }}>{children}</PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error("usePortfolio yalnızca PortfolioProvider içinde kullanılabilir");
  }
  return ctx;
}
