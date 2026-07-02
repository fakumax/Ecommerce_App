"use client";

import Link from "next/link";
import { useLocale } from "./i18n/LocaleProvider";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-black tracking-tight">
            mi<span className="text-primary">tienda</span>
          </p>
          <p className="mt-2 text-sm text-soft">{t.footer.desc}</p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold">{t.footer.navTitle}</p>
          <ul className="space-y-2 text-soft">
            <li><Link href="/" className="hover:text-primary">{t.nav.home}</Link></li>
            <li><Link href="/productos" className="hover:text-primary">{t.nav.products}</Link></li>
            <li><Link href="/checkout" className="hover:text-primary">{t.footer.checkout}</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold">{t.footer.contactTitle}</p>
          <ul className="space-y-2 text-soft">
            <li>hola@mitienda.com</li>
            <li>Misiones, Argentina</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-soft">
        © {new Date().getFullYear()}{" "}
        <a href="http://fakumax.dev/" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary">
          Facundo Vergara
        </a>
      </div>
    </footer>
  );
}
