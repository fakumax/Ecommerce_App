"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { defaultLocale, dictionaries, LOCALE_KEY, type Dict, type Locale } from "@/lib/i18n";

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
}

const Ctx = createContext<LocaleCtx | null>(null);

export function useLocale() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLocale fuera de LocaleProvider");
  return ctx;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCALE_KEY) as Locale | null;
      if (saved && dictionaries[saved]) setLocaleState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(LOCALE_KEY, l);
    } catch {}
  };

  return <Ctx.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>{children}</Ctx.Provider>;
}
