"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { fonts, presets } from "@/lib/theme";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function ThemePanel() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme, reset } = useTheme();
  const { t } = useLocale();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={t.theme.customize}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setOpen(false)} aria-hidden />
          <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col gap-6 overflow-y-auto bg-surface p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{t.theme.customize}</h2>
              <button onClick={() => setOpen(false)} aria-label={t.theme.close} className="rounded-full p-2 text-soft hover:bg-bg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>

            <section>
              <h3 className="mb-3 text-sm font-semibold text-soft">{t.theme.palettes}</h3>
              <div className="grid grid-cols-3 gap-2">
                {presets.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setTheme({ primary: p.primary, accent: p.accent })}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-xs transition-colors hover:border-primary ${
                      theme.primary === p.primary ? "border-primary" : "border-line"
                    }`}
                  >
                    <span className="flex gap-1">
                      <span className="h-5 w-5 rounded-full" style={{ background: p.primary }} />
                      <span className="h-5 w-5 rounded-full" style={{ background: p.accent }} />
                    </span>
                    {p.name}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-sm font-semibold text-soft">{t.theme.ownColors}</h3>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="color"
                    value={theme.primary}
                    onChange={(e) => setTheme({ primary: e.target.value })}
                    className="h-9 w-12 cursor-pointer rounded border border-line bg-transparent"
                  />
                  {t.theme.primary}
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="color"
                    value={theme.accent}
                    onChange={(e) => setTheme({ accent: e.target.value })}
                    className="h-9 w-12 cursor-pointer rounded border border-line bg-transparent"
                  />
                  {t.theme.accent}
                </label>
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-sm font-semibold text-soft">{t.theme.typography}</h3>
              <div className="grid grid-cols-2 gap-2">
                {fonts.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setTheme({ font: f.id })}
                    style={{ fontFamily: `var(--font-${f.id})` }}
                    className={`rounded-xl border px-3 py-2.5 text-sm transition-colors hover:border-primary ${
                      theme.font === f.id ? "border-primary bg-primary/5" : "border-line"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-sm font-semibold text-soft">{t.theme.mode}</h3>
              <div className="flex gap-2">
                {(["light", "dark"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setTheme({ mode: m })}
                    className={`flex-1 rounded-xl border px-3 py-2.5 text-sm capitalize transition-colors hover:border-primary ${
                      theme.mode === m ? "border-primary bg-primary/5" : "border-line"
                    }`}
                  >
                    {m === "light" ? t.theme.light : t.theme.dark}
                  </button>
                ))}
              </div>
            </section>

            <button onClick={reset} className="mt-auto rounded-xl border border-line py-2.5 text-sm text-soft transition-colors hover:border-primary hover:text-ink">
              {t.theme.reset}
            </button>
          </aside>
        </>
      )}
    </>
  );
}
