"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";

export default function NotFound() {
  const { t } = useLocale();
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-32 text-center">
      <span className="text-6xl">🔍</span>
      <h1 className="text-3xl font-bold">{t.notFound.title}</h1>
      <p className="text-soft">{t.notFound.desc}</p>
      <Link href="/" className="mt-2 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90">
        {t.notFound.back}
      </Link>
    </div>
  );
}
