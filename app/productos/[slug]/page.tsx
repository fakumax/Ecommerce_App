import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { discountPct, formatPrice, installment } from "@/lib/format";
import { ProductVisual } from "@/components/ProductVisual";
import { ProductCard } from "@/components/ProductCard";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const off = discountPct(product.price, product.compareAtPrice);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav className="mb-6 text-sm text-soft" aria-label="Miga de pan">
        <Link href="/" className="hover:text-primary">Inicio</Link>
        {" / "}
        <Link href="/productos" className="hover:text-primary">Productos</Link>
        {" / "}
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl">
          <ProductVisual hue={product.hue} name={product.name} />
          {(product.badge || off) && (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-white">
              {product.badge ?? `${off}% OFF`}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-sm uppercase tracking-wide text-soft">{product.category}</span>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">{product.name}</h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-black">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-lg text-soft line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
            {off && <span className="rounded-md bg-accent/15 px-2 py-0.5 text-sm font-bold text-accent">{off}% OFF</span>}
          </div>
          <p className="mt-1 text-sm text-soft">
            3 cuotas sin interés de {installment(product.price)} · 6 cuotas de {installment(product.price, 6)}
          </p>

          <p className="mt-6 leading-relaxed text-soft">{product.description}</p>

          <ul className="mt-6 space-y-2">
            {product.features.map((f) => (
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
            <p className="mt-3 text-center text-xs text-soft">
              🚚 Envío gratis · 🔄 Devolución sin cargo dentro de los 30 días
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-bold">También te puede interesar</h2>
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
