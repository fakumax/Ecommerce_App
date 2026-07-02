"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLocale } from "@/components/i18n/LocaleProvider";

export default function LoginPage() {
  const { t } = useLocale();
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<"email" | "google" | "facebook" | null>(null);

  const doLogin = (provider: "email" | "google" | "facebook", name: string, mail?: string) => {
    setLoading(provider);
    // Login simulado: acá iría la integración real (NextAuth, Auth0, etc.)
    setTimeout(() => {
      login({ name, email: mail, provider });
      router.push("/");
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = email.split("@")[0] || "User";
    doLogin("email", name.charAt(0).toUpperCase() + name.slice(1), email);
  };

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <div className="rounded-3xl border border-line bg-surface p-8">
        <h1 className="text-2xl font-bold">{t.login.title}</h1>
        <p className="mt-1 text-sm text-soft">{t.login.subtitle}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">{t.login.email}</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-xl border border-line bg-bg px-4 py-2.5 outline-none transition-colors focus:border-primary"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 flex items-center justify-between font-medium">
              {t.login.password}
              <a href="#" className="text-xs font-normal text-primary hover:underline">{t.login.forgot}</a>
            </span>
            <input
              type="password"
              required
              minLength={4}
              autoComplete="current-password"
              className="w-full rounded-xl border border-line bg-bg px-4 py-2.5 outline-none transition-colors focus:border-primary"
            />
          </label>
          <button
            type="submit"
            disabled={loading !== null}
            className="w-full rounded-full bg-primary py-3 font-semibold text-white transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
          >
            {loading === "email" ? "…" : t.login.submit}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-soft">
          <span className="h-px flex-1 bg-line" />
          {t.login.or}
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="space-y-3">
          <button
            onClick={() => doLogin("google", "Google")}
            disabled={loading !== null}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-line py-3 text-sm font-semibold transition-colors hover:border-primary disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
              <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.81z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3c-1.07.72-2.44 1.14-4.06 1.14-3.13 0-5.78-2.11-6.72-4.95H1.29v3.1A12 12 0 0 0 12 24z" />
              <path fill="#FBBC05" d="M5.28 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.38-2.28v-3.1H1.29a12 12 0 0 0 0 10.76l3.99-3.1z" />
              <path fill="#EA4335" d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.43-3.43A11.96 11.96 0 0 0 12 0 12 12 0 0 0 1.29 6.62l3.99 3.1C6.22 6.88 8.87 4.77 12 4.77z" />
            </svg>
            {t.login.google}
          </button>
          <button
            onClick={() => doLogin("facebook", "Facebook")}
            disabled={loading !== null}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-line py-3 text-sm font-semibold transition-colors hover:border-primary disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
              <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.52c-1.49 0-1.95.93-1.95 1.88V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0 0 24 12z" />
            </svg>
            {t.login.facebook}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-soft">
          {t.login.noAccount}{" "}
          <Link href="#" className="font-semibold text-primary hover:underline">{t.login.signup}</Link>
        </p>
      </div>
      <p className="mt-4 text-center text-xs text-soft">{t.login.demoNote}</p>
    </div>
  );
}
