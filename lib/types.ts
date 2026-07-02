export interface Product {
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  features: string[];
  hue: number;
  featured?: boolean;
  badge?: string;
}

export interface CartItem {
  slug: string;
  qty: number;
}
