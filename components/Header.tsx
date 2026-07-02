"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart/CartProvider";
import { useLocale } from "./i18n/LocaleProvider";
import { useAuth } from "./auth/AuthProvider";
import type { Locale } from "@/lib/i18n";

export function Header() {
  const { count, open } = useCart();
  const { t, locale, setLocale } = useLocale();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-primary py-1.5 text-center text-xs font-medium text-white">
        {t.promo}
      </div>
      <header className="sticky top-0 z-30 border-b border-line bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3.5">
          <Link href="/" className="text-xl font-black tracking-tight">
            mi<span className="text-primary">tienda</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
            <Link href="/" className="transition-colors hover:text-primary">{t.nav.home}</Link>
            <Link href="/productos" className="transition-colors hover:text-primary">{t.nav.products}</Link>
          </nav>

          <div className="flex items-center gap-1.5">
            <div className="mr-1 flex overflow-hidden rounded-full border border-line text-xs font-semibold">
              {(["es", "en"] as Locale[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  aria-pressed={locale === l}
                  className={`px-2.5 py-1 uppercase transition-colors ${
                    locale === l ? "bg-primary text-white" : "text-soft hover:text-ink"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label={t.nav.account}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-11 z-40 w-44 rounded-xl border border-line bg-surface p-2 shadow-lg">
                    <p className="truncate px-3 py-1.5 text-sm font-semibold">{user.name}</p>
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="w-full rounded-lg px-3 py-1.5 text-left text-sm text-soft transition-colors hover:bg-bg hover:text-ink"
                    >
                      {t.nav.logout}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" aria-label={t.nav.login} className="rounded-full p-2 transition-colors hover:bg-bg">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            )}

            <button onClick={open} aria-label={`${t.nav.openCart} (${count})`} className="relative rounded-full p-2 transition-colors hover:bg-bg">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
