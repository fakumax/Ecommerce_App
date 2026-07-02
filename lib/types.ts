export interface Localized {
  es: string;
  en: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  description: Localized;
  features: { es: string[]; en: string[] };
  hue: number;
  featured?: boolean;
  badge?: Localized;
}

export interface CartItem {
  slug: string;
  qty: number;
}

export interface User {
  name: string;
  email?: string;
  provider: "email" | "google" | "facebook";
}
