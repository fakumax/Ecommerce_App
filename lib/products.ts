import type { Product } from "./types";

// Productos genéricos: editá este archivo para adaptar la tienda a tu rubro.
export const products: Product[] = [
  {
    slug: "aurora-classic",
    name: "Aurora Classic",
    category: "Clásicos",
    price: 189999,
    compareAtPrice: 259999,
    description:
      "El modelo insignia de la tienda. Diseño atemporal, materiales premium y la mejor relación calidad-precio de la línea.",
    features: ["Materiales premium", "Garantía de 5 años", "Hecho en Argentina", "Envío gratis"],
    hue: 174,
    featured: true,
    badge: "Más vendido",
  },
  {
    slug: "nimbus-pro",
    name: "Nimbus Pro",
    category: "Premium",
    price: 329999,
    compareAtPrice: 419999,
    description:
      "La versión profesional para quienes no negocian calidad. Tecnología de última generación y terminaciones de lujo.",
    features: ["Edición profesional", "Tecnología avanzada", "Garantía de 10 años", "Envío gratis"],
    hue: 255,
    featured: true,
    badge: "Premium",
  },
  {
    slug: "terra-eco",
    name: "Terra Eco",
    category: "Sustentables",
    price: 149999,
    description:
      "Fabricado con materiales 100% reciclados y procesos de bajo impacto. Cuidá el planeta sin resignar diseño.",
    features: ["Materiales reciclados", "Producción sustentable", "Certificación eco", "Packaging compostable"],
    hue: 130,
    featured: true,
  },
  {
    slug: "luna-compact",
    name: "Luna Compact",
    category: "Clásicos",
    price: 99999,
    compareAtPrice: 129999,
    description:
      "Todo lo esencial en formato compacto. Ideal para espacios reducidos o como primera compra de la línea.",
    features: ["Formato compacto", "Liviano y práctico", "Garantía de 3 años"],
    hue: 38,
    featured: true,
  },
  {
    slug: "solar-max",
    name: "Solar Max",
    category: "Premium",
    price: 279999,
    compareAtPrice: 349999,
    description:
      "Potencia y tamaño para los que quieren más. El modelo de mayor capacidad de toda la colección.",
    features: ["Tamaño XL", "Máxima capacidad", "Garantía de 8 años", "Envío gratis"],
    hue: 20,
    badge: "20% OFF",
  },
  {
    slug: "brisa-air",
    name: "Brisa Air",
    category: "Livianos",
    price: 119999,
    description:
      "Ultraliviano y fresco, pensado para el uso diario. La opción más versátil de la tienda.",
    features: ["Ultraliviano", "Tejido respirable", "Fácil mantenimiento"],
    hue: 200,
  },
  {
    slug: "roca-firm",
    name: "Roca Firm",
    category: "Clásicos",
    price: 169999,
    compareAtPrice: 199999,
    description:
      "Firmeza y durabilidad garantizadas. Construido para durar décadas con materiales de alta densidad.",
    features: ["Alta densidad", "Máxima durabilidad", "Garantía de 7 años"],
    hue: 300,
  },
  {
    slug: "polar-fresh",
    name: "Polar Fresh",
    category: "Livianos",
    price: 139999,
    description:
      "Tecnología de regulación térmica para mantener la temperatura ideal en cualquier estación del año.",
    features: ["Regulación térmica", "Tejido inteligente", "Hipoalergénico"],
    hue: 220,
  },
];

export const categories = [...new Set(products.map((p) => p.category))];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeatured(): Product[] {
  return products.filter((p) => p.featured);
}
