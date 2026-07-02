import type { Metadata } from "next";
import Link from "next/link";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Productos",
  description: "Catálogo completo de productos con envío gratis y cuotas sin interés.",
};

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const list = categoria ? products.filter((p) => p.category === categoria) : products;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Productos</h1>
      <p className="mt-1 text-soft">
        {list.length} {list.length === 1 ? "producto" : "productos"}
        {categoria ? ` en ${categoria}` : ""}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/productos"
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            !categoria ? "border-primary bg-primary text-white" : "border-line hover:border-primary"
          }`}
        >
          Todos
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/productos?categoria=${encodeURIComponent(c)}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              categoria === c ? "border-primary bg-primary text-white" : "border-line hover:border-primary"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
