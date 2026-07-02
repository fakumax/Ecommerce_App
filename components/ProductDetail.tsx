"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { products } from "@/lib/products";
import { discountPct, formatPrice, installment } from "@/lib/format";
import { fill } from "@/lib/i18n";
import { useLocale } from "./i18n/LocaleProvider";
import { ProductVisual } from "./ProductVisual";
import { ProductCard } from "./ProductCard";
import { AddToCartButton } from "./cart/AddToCartButton";

export function ProductDetail({ product }: { product: Product }) {
  const { t, locale } = useLocale();
  const off = discountPct(product.price, product.compareAtPrice);
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav className="mb-6 text-sm text-soft" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary">{t.nav.home}</Link>
        {" / "}
        <Link href="/productos" className="hover:text-primary">{t.nav.products}</Link>
        {" / "}
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl">
          <ProductVisual hue={product.hue} name={product.name} />
          {(product.badge || off) && (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-white">
              {product.badge ? product.badge[locale] : `${off}% OFF`}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-sm uppercase tracking-wide text-soft">
            {t.categoryLabels[product.category] ?? product.category}
          </span>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">{product.name}</h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-black">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-lg text-soft line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
            {off && <span className="rounded-md bg-accent/15 px-2 py-0.5 text-sm font-bold text-accent">{off}% OFF</span>}
          </div>
          <p className="mt-1 text-sm text-soft">
            {fill(t.detail.installments, { a: installment(product.price), b: installment(product.price, 6) })}
          </p>

          <p className="mt-6 leading-relaxed text-soft">{product.description[locale]}</p>

          <ul className="mt-6 space-y-2">
            {product.features[locale].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <AddToCartButton slug={product.slug} big />
            <p className="mt-3 text-center text-xs text-soft">{t.detail.shippingNote}</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-bold">{t.detail.related}</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
