"use client";

import { useCart } from "./CartProvider";

export function AddToCartButton({ slug, big = false }: { slug: string; big?: boolean }) {
  const { add } = useCart();
  return (
    <button
      onClick={() => add(slug)}
      className={`rounded-full bg-primary font-semibold text-white transition-all hover:opacity-90 active:scale-95 ${
        big ? "w-full py-3.5 text-base" : "px-4 py-2 text-sm"
      }`}
    >
      Agregar al carrito
    </button>
  );
}
