import type { Metadata } from "next";
import { CatalogClient } from "@/components/CatalogClient";

export const metadata: Metadata = {
  title: "Productos",
  description: "Catálogo completo con envío gratis y cuotas sin interés.",
};

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  return <CatalogClient initialCategory={categoria} />;
}
