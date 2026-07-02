import Link from "next/link";
import { getFeatured, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const benefits = [
  { icon: "🚚", title: "Envío gratis", text: "A todo el país en compras online" },
  { icon: "💳", title: "Cuotas sin interés", text: "3 y 6 cuotas con todas las tarjetas" },
  { icon: "🛡️", title: "Garantía extendida", text: "Hasta 10 años según el producto" },
  { icon: "🔄", title: "Devolución fácil", text: "30 días para cambios y devoluciones" },
];

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:py-28">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            Nueva colección 2026
          </span>
          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            Tu tienda, <span className="text-primary">tus colores</span>, tu estilo
          </h1>
          <p className="max-w-xl text-lg text-soft">
            Productos de calidad con envío gratis y cuotas sin interés. Probá el botón de
            personalización para cambiar los colores y la tipografía en vivo.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/productos"
              className="rounded-full bg-primary px-8 py-3.5 font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            >
              Ver productos
            </Link>
            <a
              href="#destacados"
              className="rounded-full border border-line bg-surface px-8 py-3.5 font-semibold transition-colors hover:border-primary"
            >
              Destacados
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 lg:grid-cols-4">
          {benefits.map((b) => (
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
            <h2 className="text-2xl font-bold sm:text-3xl">Destacados</h2>
            <p className="mt-1 text-soft">Los favoritos de la comunidad</p>
          </div>
          <Link href="/productos" className="text-sm font-semibold text-primary hover:underline">
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {getFeatured().map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Categorías</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/productos?categoria=${encodeURIComponent(c)}`}
              className="rounded-2xl border border-line bg-surface p-6 text-center font-semibold transition-all hover:border-primary hover:shadow-md"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
