"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { applyTheme, defaultTheme, THEME_KEY, type ThemeState } from "@/lib/theme";

interface ThemeCtx {
  theme: ThemeState;
  setTheme: (patch: Partial<ThemeState>) => void;
  reset: () => void;
}

const Ctx = createContext<ThemeCtx | null>(null);

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme fuera de ThemeProvider");
  return ctx;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeState>(defaultTheme);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) setThemeState({ ...defaultTheme, ...JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = (patch: Partial<ThemeState>) => {
    setThemeState((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(THEME_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const reset = () => {
    try {
      localStorage.removeItem(THEME_KEY);
    } catch {}
    setThemeState(defaultTheme);
  };

  return <Ctx.Provider value={{ theme, setTheme, reset }}>{children}</Ctx.Provider>;
}
