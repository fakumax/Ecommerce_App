"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/format";

type Step = "form" | "processing" | "done";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
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
        <h1 className="text-3xl font-bold">¡Gracias por tu compra!</h1>
        <p className="text-soft">
          Tu orden <strong className="text-ink">{orderId}</strong> fue registrada (simulación).
          Te enviamos un email con el detalle.
        </p>
        <Link href="/productos" className="mt-4 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90">
          Seguir comprando
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
        <span className="text-5xl">🛒</span>
        <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
        <Link href="/productos" className="mt-2 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="space-y-4 rounded-2xl border border-line bg-surface p-6">
            <legend className="px-2 font-semibold">Datos de contacto</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nombre y apellido" name="nombre" required autoComplete="name" />
              <Field label="Email" name="email" type="email" required autoComplete="email" />
            </div>
          </fieldset>

          <fieldset className="space-y-4 rounded-2xl border border-line bg-surface p-6">
            <legend className="px-2 font-semibold">Envío</legend>
            <Field label="Dirección" name="direccion" required autoComplete="street-address" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Ciudad" name="ciudad" required autoComplete="address-level2" />
              <Field label="Código postal" name="cp" required autoComplete="postal-code" />
            </div>
          </fieldset>

          <fieldset className="space-y-3 rounded-2xl border border-line bg-surface p-6">
            <legend className="px-2 font-semibold">Pago (simulado)</legend>
            {["Tarjeta de crédito · 3 cuotas sin interés", "Tarjeta de débito", "Transferencia (10% OFF)"].map((m, i) => (
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
            {step === "processing" ? "Procesando…" : `Pagar ${formatPrice(total)}`}
          </button>
          <p className="text-center text-xs text-soft">
            Demo de portfolio: no se procesa ningún pago real.
          </p>
        </form>

        <aside className="h-fit rounded-2xl border border-line bg-surface p-6">
          <h2 className="mb-4 font-semibold">Resumen</h2>
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
              <span>Envío</span>
              <span className="font-medium text-primary">Gratis</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
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
