"use client";

import Link from "next/link";
import { getFeatured, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useLocale } from "@/components/i18n/LocaleProvider";

export default function Home() {
  const { t } = useLocale();

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:py-28">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            {t.hero.badge}
          </span>
          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            {t.hero.titleA}<span className="text-primary">{t.hero.titleB}</span>{t.hero.titleC}
          </h1>
          <p className="max-w-xl text-lg text-soft">{t.hero.desc}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/productos"
              className="rounded-full bg-primary px-8 py-3.5 font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            >
              {t.hero.ctaProducts}
            </Link>
            <a
              href="#destacados"
              className="rounded-full border border-line bg-surface px-8 py-3.5 font-semibold transition-colors hover:border-primary"
            >
              {t.hero.ctaFeatured}
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 lg:grid-cols-4">
          {t.benefits.map((b) => (
            <div key={b.title} className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden>{b.icon}</span>
              <div>
                <p className="text-sm font-semibold">{b.title}</p>
                <p className="text-xs text-soft">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="destacados" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{t.home.featured}</h2>
            <p className="mt-1 text-soft">{t.home.featuredSub}</p>
          </div>
          <Link href="/productos" className="text-sm font-semibold text-primary hover:underline">
            {t.home.viewAll}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {getFeatured().map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{t.home.categories}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/productos?categoria=${encodeURIComponent(c)}`}
              className="rounded-2xl border border-line bg-surface p-6 text-center font-semibold transition-all hover:border-primary hover:shadow-md"
            >
              {t.categoryLabels[c] ?? c}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
