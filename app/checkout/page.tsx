"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { fill } from "@/lib/i18n";

type Step = "form" | "processing" | "done";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const { t } = useLocale();
  const [step, setStep] = useState<Step>("form");
  const [orderId, setOrderId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    // Checkout simulado: acá iría la integración real (Mercado Pago, Stripe, etc.)
    setTimeout(() => {
      setOrderId(`MT-${Date.now().toString(36).toUpperCase()}`);
      clear();
      setStep("done");
    }, 1200);
  };

  if (step === "done") {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">✅</span>
        <h1 className="text-3xl font-bold">{t.checkout.thanks}</h1>
        <p className="text-soft">{fill(t.checkout.orderMsg, { id: orderId })}</p>
        <Link href="/productos" className="mt-4 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90">
          {t.checkout.keepShopping}
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
        <span className="text-5xl">🛒</span>
        <h1 className="text-2xl font-bold">{t.checkout.emptyTitle}</h1>
        <Link href="/productos" className="mt-2 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90">
          {t.cart.viewProducts}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">{t.checkout.title}</h1>
      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="space-y-4 rounded-2xl border border-line bg-surface p-6">
            <legend className="px-2 font-semibold">{t.checkout.contact}</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t.checkout.name} name="nombre" required autoComplete="name" />
              <Field label={t.checkout.email} name="email" type="email" required autoComplete="email" />
            </div>
          </fieldset>

          <fieldset className="space-y-4 rounded-2xl border border-line bg-surface p-6">
            <legend className="px-2 font-semibold">{t.checkout.shipping}</legend>
            <Field label={t.checkout.address} name="direccion" required autoComplete="street-address" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t.checkout.city} name="ciudad" required autoComplete="address-level2" />
              <Field label={t.checkout.zip} name="cp" required autoComplete="postal-code" />
            </div>
          </fieldset>

          <fieldset className="space-y-3 rounded-2xl border border-line bg-surface p-6">
            <legend className="px-2 font-semibold">{t.checkout.payment}</legend>
            {t.checkout.methods.map((m, i) => (
              <label key={m} className="flex cursor-pointer items-center gap-3 rounded-xl border border-line p-3.5 text-sm transition-colors has-checked:border-primary has-checked:bg-primary/5">
                <input type="radio" name="pago" defaultChecked={i === 0} className="accent-current text-primary" />
                {m}
              </label>
            ))}
          </fieldset>

          <button
            type="submit"
            disabled={step === "processing"}
            className="w-full rounded-full bg-primary py-4 font-semibold text-white transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
          >
            {step === "processing" ? t.checkout.processing : fill(t.checkout.pay, { v: formatPrice(total) })}
          </button>
          <p className="text-center text-xs text-soft">{t.checkout.demoNote}</p>
        </form>

        <aside className="h-fit rounded-2xl border border-line bg-surface p-6">
          <h2 className="mb-4 font-semibold">{t.checkout.summary}</h2>
          <ul className="space-y-3 text-sm">
            {items.map((item) => {
              const p = getProduct(item.slug);
              if (!p) return null;
              return (
                <li key={item.slug} className="flex justify-between gap-2">
                  <span className="text-soft">
                    {p.name} <span className="text-xs">× {item.qty}</span>
                  </span>
                  <span className="font-medium">{formatPrice(p.price * item.qty)}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-soft">
              <span>{t.checkout.shippingLabel}</span>
              <span className="font-medium text-primary">{t.checkout.free}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>{t.checkout.total}</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-line bg-bg px-4 py-2.5 outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}
