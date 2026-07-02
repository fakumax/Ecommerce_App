"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { ProductVisual } from "@/components/ProductVisual";

export function CartDrawer() {
  const { items, total, isOpen, close, setQty, remove } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={close} aria-hidden />
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-line p-5">
          <h2 className="text-lg font-bold">Tu carrito</h2>
          <button onClick={close} aria-label="Cerrar carrito" className="rounded-full p-2 text-soft hover:bg-bg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="text-4xl">🛒</span>
            <p className="text-soft">Tu carrito está vacío</p>
            <button onClick={close} className="mt-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
              Ver productos
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto p-5">
              {items.map((item) => {
                const p = getProduct(item.slug);
                if (!p) return null;
                return (
                  <li key={item.slug} className="flex gap-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                      <ProductVisual hue={p.hue} name={p.name} />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold">{p.name}</span>
                        <button onClick={() => remove(item.slug)} aria-label={`Quitar ${p.name}`} className="text-soft hover:text-ink">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></svg>
                        </button>
                      </div>
                      <span className="text-sm text-soft">{formatPrice(p.price)}</span>
                      <div className="mt-auto flex items-center gap-3">
                        <button onClick={() => setQty(item.slug, item.qty - 1)} disabled={item.qty <= 1} aria-label="Restar" className="flex h-7 w-7 items-center justify-center rounded-full border border-line disabled:opacity-40">−</button>
                        <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                        <button onClick={() => setQty(item.slug, item.qty + 1)} aria-label="Sumar" className="flex h-7 w-7 items-center justify-center rounded-full border border-line">+</button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-line p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-soft">Total</span>
                <span className="text-xl font-bold">{formatPrice(total)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={close}
                className="block rounded-full bg-primary py-3 text-center font-semibold text-white transition-opacity hover:opacity-90"
              >
                Finalizar compra
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
