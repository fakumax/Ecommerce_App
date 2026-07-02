"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { discountPct, formatPrice, installment } from "@/lib/format";
import { fill } from "@/lib/i18n";
import { useLocale } from "./i18n/LocaleProvider";
import { ProductVisual } from "./ProductVisual";
import { AddToCartButton } from "./cart/AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  const { t, locale } = useLocale();
  const off = discountPct(product.price, product.compareAtPrice);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-shadow hover:shadow-lg">
      <Link href={`/productos/${product.slug}`} className="relative block aspect-square overflow-hidden">
        <div className="h-full w-full transition-transform duration-300 group-hover:scale-105">
          <ProductVisual hue={product.hue} name={product.name} />
        </div>
        {(product.badge || off) && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
            {product.badge ? product.badge[locale] : `${off}% OFF`}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs uppercase tracking-wide text-soft">
          {t.categoryLabels[product.category] ?? product.category}
        </span>
        <Link href={`/productos/${product.slug}`} className="font-semibold leading-tight hover:text-primary">
          {product.name}
        </Link>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-bold">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-soft line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>
        <p className="text-xs text-soft">{fill(t.card.installments, { v: installment(product.price) })}</p>
        <div className="mt-3">
          <AddToCartButton slug={product.slug} />
        </div>
      </div>
    </article>
  );
}
