"use client";

import Link from "next/link";
import { useCart } from "./cart/CartProvider";

export function Header() {
  const { count, open } = useCart();

  return (
    <>
      <div className="bg-primary py-1.5 text-center text-xs font-medium text-white">
        Envío gratis a todo el país 🚚 · 3 y 6 cuotas sin interés
      </div>
      <header className="sticky top-0 z-30 border-b border-line bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
          <Link href="/" className="text-xl font-black tracking-tight">
            mi<span className="text-primary">tienda</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
            <Link href="/" className="transition-colors hover:text-primary">Inicio</Link>
            <Link href="/productos" className="transition-colors hover:text-primary">Productos</Link>
          </nav>
          <button onClick={open} aria-label={`Abrir carrito, ${count} productos`} className="relative rounded-full p-2 transition-colors hover:bg-bg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>
    </>
  );
}
