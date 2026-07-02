"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/lib/types";
import { getProduct } from "@/lib/products";

const CART_KEY = "store-cart";

interface CartCtx {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart fuera de CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const add = (slug: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug);
      if (existing) {
        return prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { slug, qty }];
    });
    setIsOpen(true);
  };

  const setQty = (slug: string, qty: number) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty } : i)));
  };

  const remove = (slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug));
  const clear = () => setItems([]);

  const { count, total } = useMemo(() => {
    let count = 0;
    let total = 0;
    for (const i of items) {
      const p = getProduct(i.slug);
      if (!p) continue;
      count += i.qty;
      total += p.price * i.qty;
    }
    return { count, total };
  }, [items]);

  return (
    <Ctx.Provider
      value={{ items, count, total, isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false), add, setQty, remove, clear }}
    >
      {children}
    </Ctx.Provider>
  );
}
