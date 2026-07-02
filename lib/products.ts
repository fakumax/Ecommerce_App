import type { Product } from "./types";

// Productos genéricos: editá este archivo para adaptar la tienda a tu rubro.
export const products: Product[] = [
  {
    slug: "aurora-classic",
    name: "Aurora Classic",
    category: "Clásicos",
    price: 189999,
    compareAtPrice: 259999,
    description: {
      es: "El modelo insignia de la tienda. Diseño atemporal, materiales premium y la mejor relación calidad-precio de la línea.",
      en: "The store's flagship model. Timeless design, premium materials and the best value in the lineup.",
    },
    features: {
      es: ["Materiales premium", "Garantía de 5 años", "Hecho en Argentina", "Envío gratis"],
      en: ["Premium materials", "5-year warranty", "Made in Argentina", "Free shipping"],
    },
    hue: 174,
    featured: true,
    badge: { es: "Más vendido", en: "Best seller" },
  },
  {
    slug: "nimbus-pro",
    name: "Nimbus Pro",
    category: "Premium",
    price: 329999,
    compareAtPrice: 419999,
    description: {
      es: "La versión profesional para quienes no negocian calidad. Tecnología de última generación y terminaciones de lujo.",
      en: "The professional version for those who won't compromise on quality. Cutting-edge technology and luxury finishes.",
    },
    features: {
      es: ["Edición profesional", "Tecnología avanzada", "Garantía de 10 años", "Envío gratis"],
      en: ["Professional edition", "Advanced technology", "10-year warranty", "Free shipping"],
    },
    hue: 255,
    featured: true,
    badge: { es: "Premium", en: "Premium" },
  },
  {
    slug: "terra-eco",
    name: "Terra Eco",
    category: "Sustentables",
    price: 149999,
    description: {
      es: "Fabricado con materiales 100% reciclados y procesos de bajo impacto. Cuidá el planeta sin resignar diseño.",
      en: "Made with 100% recycled materials and low-impact processes. Care for the planet without giving up design.",
    },
    features: {
      es: ["Materiales reciclados", "Producción sustentable", "Certificación eco", "Packaging compostable"],
      en: ["Recycled materials", "Sustainable production", "Eco certification", "Compostable packaging"],
    },
    hue: 130,
    featured: true,
  },
  {
    slug: "luna-compact",
    name: "Luna Compact",
    category: "Clásicos",
    price: 99999,
    compareAtPrice: 129999,
    description: {
      es: "Todo lo esencial en formato compacto. Ideal para espacios reducidos o como primera compra de la línea.",
      en: "All the essentials in a compact format. Ideal for small spaces or as your first purchase in the line.",
    },
    features: {
      es: ["Formato compacto", "Liviano y práctico", "Garantía de 3 años"],
      en: ["Compact format", "Light and practical", "3-year warranty"],
    },
    hue: 38,
    featured: true,
  },
  {
    slug: "solar-max",
    name: "Solar Max",
    category: "Premium",
    price: 279999,
    compareAtPrice: 349999,
    description: {
      es: "Potencia y tamaño para los que quieren más. El modelo de mayor capacidad de toda la colección.",
      en: "Power and size for those who want more. The highest-capacity model in the entire collection.",
    },
    features: {
      es: ["Tamaño XL", "Máxima capacidad", "Garantía de 8 años", "Envío gratis"],
      en: ["XL size", "Maximum capacity", "8-year warranty", "Free shipping"],
    },
    hue: 20,
    badge: { es: "20% OFF", en: "20% OFF" },
  },
  {
    slug: "brisa-air",
    name: "Brisa Air",
    category: "Livianos",
    price: 119999,
    description: {
      es: "Ultraliviano y fresco, pensado para el uso diario. La opción más versátil de la tienda.",
      en: "Ultralight and fresh, designed for everyday use. The most versatile option in the store.",
    },
    features: {
      es: ["Ultraliviano", "Tejido respirable", "Fácil mantenimiento"],
      en: ["Ultralight", "Breathable fabric", "Easy maintenance"],
    },
    hue: 200,
  },
  {
    slug: "roca-firm",
    name: "Roca Firm",
    category: "Clásicos",
    price: 169999,
    compareAtPrice: 199999,
    description: {
      es: "Firmeza y durabilidad garantizadas. Construido para durar décadas con materiales de alta densidad.",
      en: "Guaranteed firmness and durability. Built to last decades with high-density materials.",
    },
    features: {
      es: ["Alta densidad", "Máxima durabilidad", "Garantía de 7 años"],
      en: ["High density", "Maximum durability", "7-year warranty"],
    },
    hue: 300,
  },
  {
    slug: "polar-fresh",
    name: "Polar Fresh",
    category: "Livianos",
    price: 139999,
    description: {
      es: "Tecnología de regulación térmica para mantener la temperatura ideal en cualquier estación del año.",
      en: "Thermal regulation technology to keep the ideal temperature in every season of the year.",
    },
    features: {
      es: ["Regulación térmica", "Tejido inteligente", "Hipoalergénico"],
      en: ["Thermal regulation", "Smart fabric", "Hypoallergenic"],
    },
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
