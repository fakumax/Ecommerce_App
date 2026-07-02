"use client";

import { useMemo, useState } from "react";
import { categories, products } from "@/lib/products";
import { fill } from "@/lib/i18n";
import { formatPrice } from "@/lib/format";
import { useLocale } from "./i18n/LocaleProvider";
import { ProductCard } from "./ProductCard";

type PriceRange = "all" | "lt150" | "150to250" | "gt250";
type Sort = "rel" | "asc" | "desc";

const LIMIT_LOW = 150000;
const LIMIT_HIGH = 250000;

export function CatalogClient({ initialCategory }: { initialCategory?: string }) {
  const { t } = useLocale();
  const [selectedCats, setSelectedCats] = useState<string[]>(
    initialCategory && categories.includes(initialCategory) ? [initialCategory] : []
  );
  const [range, setRange] = useState<PriceRange>("all");
  const [offersOnly, setOffersOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("rel");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCat = (c: string) =>
    setSelectedCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const clear = () => {
    setSelectedCats([]);
    setRange("all");
    setOffersOnly(false);
    setSort("rel");
  };

  const hasFilters = selectedCats.length > 0 || range !== "all" || offersOnly;

  const list = useMemo(() => {
    let result = products.filter((p) => {
      if (selectedCats.length > 0 && !selectedCats.includes(p.category)) return false;
      if (range === "lt150" && p.price >= LIMIT_LOW) return false;
      if (range === "150to250" && (p.price < LIMIT_LOW || p.price > LIMIT_HIGH)) return false;
      if (range === "gt250" && p.price <= LIMIT_HIGH) return false;
      if (offersOnly && !(p.compareAtPrice && p.compareAtPrice > p.price)) return false;
      return true;
    });
    if (sort === "asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "desc") result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [selectedCats, range, offersOnly, sort]);

  const priceOptions: { id: PriceRange; label: string }[] = [
    { id: "all", label: t.catalog.all },
    { id: "lt150", label: fill(t.catalog.under, { v: formatPrice(LIMIT_LOW) }) },
    { id: "150to250", label: fill(t.catalog.between, { a: formatPrice(LIMIT_LOW), b: formatPrice(LIMIT_HIGH) }) },
    { id: "gt250", label: fill(t.catalog.over, { v: formatPrice(LIMIT_HIGH) }) },
  ];

  const filtersPanel = (
    <div className="space-y-6">
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-soft">{t.catalog.category}</h3>
        <div className="space-y-2">
          {categories.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={selectedCats.includes(c)}
                onChange={() => toggleCat(c)}
                className="h-4 w-4 rounded border-line accent-current text-primary"
              />
              {t.categoryLabels[c] ?? c}
            </label>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-soft">{t.catalog.price}</h3>
        <div className="space-y-2">
          {priceOptions.map((o) => (
            <label key={o.id} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="radio"
                name="price"
                checked={range === o.id}
                onChange={() => setRange(o.id)}
                className="h-4 w-4 accent-current text-primary"
              />
              {o.label}
            </label>
          ))}
        </div>
      </section>

      <section>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
          <input
            type="checkbox"
            checked={offersOnly}
            onChange={(e) => setOffersOnly(e.target.checked)}
            className="h-4 w-4 rounded accent-current text-primary"
          />
          🏷️ {t.catalog.offersOnly}
        </label>
      </section>

      {hasFilters && (
        <button onClick={clear} className="text-sm font-semibold text-primary hover:underline">
          {t.catalog.clear}
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t.catalog.title}</h1>
          <p className="mt-1 text-soft">
            {list.length} {list.length === 1 ? t.catalog.one : t.catalog.many}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-primary lg:hidden"
            aria-expanded={mobileOpen}
          >
            {t.catalog.filters} {hasFilters ? "•" : ""}
          </button>
          <label className="flex items-center gap-2 text-sm">
            <span className="hidden text-soft sm:inline">{t.catalog.sort}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-full border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            >
              <option value="rel">{t.catalog.relevance}</option>
              <option value="asc">{t.catalog.priceAsc}</option>
              <option value="desc">{t.catalog.priceDesc}</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className={`${mobileOpen ? "block" : "hidden"} h-fit rounded-2xl border border-line bg-surface p-5 lg:block`}>
          {filtersPanel}
        </aside>

        <div>
          {list.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface py-20 text-center">
              <span className="text-4xl">🔍</span>
              <p className="text-soft">{t.catalog.noResults}</p>
              <button onClick={clear} className="text-sm font-semibold text-primary hover:underline">
                {t.catalog.clear}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-3">
              {list.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
